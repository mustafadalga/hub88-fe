import { ChangeEvent } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

interface Props {
    id?: string,
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}


export default function InputSearch({ id = "search", value, onChange, placeholder = "Search" }: Props) {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <label htmlFor={id}
               className="flex items-center gap-3 h-12 p-4 rounded-xl border border-solid border-neutral-400 hover:[&:not(:focus-within)]:border-indigo-400 focus-within:border-indigo-600 transition-all duration-300 group">
            <MagnifyingGlassIcon
                aria-hidden="true"
                className="size-4 text-neutral-600 group-focus-within:text-indigo-600 group-hover:text-indigo-600"/>

            <input
                type="text"
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                autoComplete="off"
                aria-label="Search"
                role="searchbox"
                className="peer text-sm text-neutral-600 font-normal font-sans !leading-4 tracking-[0.14px] outline-0 w-full bg-transparent"/>
        </label>
    )
}