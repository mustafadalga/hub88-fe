export interface Column<T> {
    header: string;
    accessor: keyof T;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    noMatchText?: string
}

export default function DataTable<T>({ columns, data, noMatchText = "No matching results found" }: DataTableProps<T>) {
    return (
        <table className="grid w-full rounded-md sm:rounded-lg overflow-hidden text-left"
               aria-label="Data table">
            <thead className="grid grid-cols-[100px_1fr] text-[10px] lg:text-sm text-white uppercase bg-indigo-500">
           <tr>
               {columns.map(column => (
                   <th key={String(column.accessor)}
                       scope="col"
                       className="px-6 py-4">
                       {column.header}
                   </th>
               ))}
           </tr>
            </thead>
            <tbody>

            {data.length > 0 ? (
                data.map((row, rowIndex) => (
                    <tr key={rowIndex}
                        className="grid grid-cols-[100px_1fr] bg-white border-b hover:bg-gray-50 text-[10px] lg:text-sm">
                        {columns.map(column => (
                            <td key={String(column.accessor)}
                                className="px-6 py-3">
                                {String(row[column.accessor])}
                            </td>
                        ))}
                    </tr>
                ))
            ) : (
                <tr className="grid bg-white border-b">
                    <td colSpan={columns.length} className="px-6 py-10 text-center text-sm lg:text-base">
                        {noMatchText}
                    </td>
                </tr>
            )}

            </tbody>
        </table>
    )
}