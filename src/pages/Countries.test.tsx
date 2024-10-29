import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { GET_COUNTRIES } from "@/graphql/queries.ts";
import Countries, { Country } from "./Countries.tsx";

const countries: Country[] = [
    { code: "US", name: "United States" },
    { code: "EE", name: "Estonia" },
];

function createMock({
                        data = countries,
                        error,
                        delay = 0
                    }: {
    data?: Country[],
    error?: Error | undefined,
    delay?: number
}): MockedResponse[] {
    return [
        {
            request: { query: GET_COUNTRIES },
            result: error ? undefined : { data: { countries: data } },
            error,
            delay
        }
    ]
}

function renderCountries(mocks: MockedResponse[] = createMock({})) {
    render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <Countries/>
        </MockedProvider>
    );
}

describe("Countries.tsx", () => {
    it("renders loading state initially", async () => {
        const emptyDataMock = createMock({
            delay: 1000,
            error: new Error("Failed to fetch data")
        });
        renderCountries(emptyDataMock);
        expect(screen.getByTestId("loader")).toBeInTheDocument();
    });

    it("renders error message when query fails", async () => {
        const errorMock = createMock({
            error: new Error("Failed to fetch data")
        });
        renderCountries(errorMock);
        expect(await screen.findByText(/Oops! Something went wrong/i)).toBeInTheDocument();
    });

    it("displays 'No data available' message when no data is returned", async () => {
        const emptyDataMock = createMock({
            data: []
        });
        renderCountries(emptyDataMock);
        expect(await screen.findByText(/No data available/i)).toBeInTheDocument();
    });

    it("renders data correctly when query succeeds", async () => {
        renderCountries();
        expect(await screen.findByText(/United States/i)).toBeInTheDocument();
        expect(await screen.findByText(/Estonia/i)).toBeInTheDocument();

    });

    it("filters countries based on search input", async () => {
        renderCountries();
        await screen.findByText(/United States/i);

        const searchInput = screen.getByPlaceholderText(/Search Country/i);
        fireEvent.change(searchInput, { target: { value: "EE" } });

        expect(screen.getByText(/Estonia/i)).toBeInTheDocument();
        expect(screen.queryByText(/United States/i)).not.toBeInTheDocument();
    });

})