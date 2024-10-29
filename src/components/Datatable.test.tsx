import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DataTable, { Column } from "./DataTable.tsx"

interface TestData {
    code: string;
    name: string;
}

const columns: Column<TestData>[] = [
    { header: "Code", accessor: "code" },
    { header: "Name", accessor: "name" },
];

const data: TestData[] = [
    { code: "US", name: "United States" },
    { code: "EE", name: "Estonia" },
];


describe("DataTable.tsx", () => {

    it("renders column headers correctly", () => {
        render(<DataTable columns={columns} data={data}/>);
        columns.forEach((column) => {
            expect(screen.getByText(column.header)).toBeInTheDocument();
        });
    });

    it("renders data rows correctly", () => {
        render(<DataTable columns={columns} data={data}/>);

        data.forEach((row) => {
            expect(screen.getByText(row.code)).toBeInTheDocument();
            expect(screen.getByText(row.name)).toBeInTheDocument();
        });
    });

    it("displays 'No matching results found' when data is empty", () => {
        render(<DataTable columns={columns} data={[]}/>);
        expect(screen.getByText("No matching results found")).toBeInTheDocument();
    });

    it("displays custom no match text when provided", () => {
        const customMessage = "No data available";
        render(<DataTable columns={columns} data={[]} noMatchText={customMessage}/>);
        expect(screen.getByText(customMessage)).toBeInTheDocument();
    });

})
