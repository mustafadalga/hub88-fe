import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import InputSearch from "./InputSearch"


describe("InputSearch.tsx", () => {

    it("renders with default placeholder and value", () => {
        render(<InputSearch value="" onChange={() => {
        }}/>);

        const inputElement = screen.getByRole("searchbox");
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveAttribute("placeholder", "Search");
    });

    it("renders with custom placeholder", () => {
        const placeHolder = "Custom Placeholder"
        render(<InputSearch value="" onChange={() => {
        }} placeholder={placeHolder}/>);

        const inputElement = screen.getByPlaceholderText(placeHolder);
        expect(inputElement).toBeInTheDocument();
    });

    it("calls onChange with the correct value when typing", () => {
        const handleChange = vi.fn();
        render(<InputSearch value="" onChange={handleChange}/>);

        const inputElement = screen.getByRole("searchbox");
        fireEvent.change(inputElement, { target: { value: "test" } });

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith("test");
    });

    it("applies provided id to the input element", () => {
        const id = "custom-id";
        render(<InputSearch id={id} value="" onChange={() => {
        }}/>);

        const inputElement = screen.getByRole("searchbox");
        expect(inputElement).toHaveAttribute("id", id);
    });

    it("has appropriate aria attributes for accessibility", () => {
        render(<InputSearch value="" onChange={() => {
        }}/>);

        const inputElement = screen.getByRole("searchbox");
        expect(inputElement).toHaveAttribute("aria-label", "Search");

        const iconElement = screen.getByTestId("icon-search")
        expect(iconElement).toHaveAttribute("aria-hidden", "true");
    });
})
