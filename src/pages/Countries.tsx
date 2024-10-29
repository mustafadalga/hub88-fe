import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "@/graphql/queries.ts";
import InputSearch from "@/components/InputSearch.tsx";
import DataTable, { Column } from "@/components/DataTable.tsx";
import Loader from "@/components/Loader.tsx";

export interface Country {
    code: string;
    name: string;
}

export default function Countries() {
    const { data, loading, error } = useQuery<{ countries: Country[] }>(GET_COUNTRIES);
    const [ search, setSearch ] = useState<string>('');

    const columns: Column<Country>[] = [
        { header: "Code", accessor: "code" },
        { header: "Name", accessor: "name" }
    ];

    const filteredCountries = useMemo<Country[]>(() => {
        if (!data || !data.countries.length) return [];

        return data.countries.filter((country) =>
            country.code.toLowerCase().includes(search.toLowerCase())
        )

    }, [ data, search ])

    if (loading) return <Loader/>;

    return (
        <article className="grid content-baseline mx-auto w-full max-w-screen-sm">

            {error && (
                <p className="text-red-500"
                   role="alert"
                   aria-live="assertive">
                    Oops! Something went wrong while loading the data. Please try refreshing the page, or check back
                    later.
                </p>
            )}

            {!error && (!data || data.countries.length === 0) && (
                <p className="text-gray-500"
                   role="alert"
                   aria-live="polite">No data available.</p>
            )}


            {!error && data && (
                <section className="grid w-full gap-8">
                    <InputSearch value={search}
                                 onChange={setSearch}
                                 id="search"
                                 placeholder="Search Country"/>
                    <DataTable columns={columns} data={filteredCountries}/>
                </section>
            )}

        </article>
    )
}