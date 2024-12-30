import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Badge,
} from "@repo/ui";
export function TableDemo({ data }: { data: any[] }) {
    if (!data || data.length === 0) {
        return <p>No data available</p>;
    }

    // Dynamically extract headers from the keys of the first object
    const headers = Object.keys(data[0]);

    return (
        <div className="w-full p-4">
            
            <Table>
                <TableHeader className="border-b border-gray-300">
                    <TableRow>
                        {headers.map((header, index) => (
                            <TableHead key={index}>
                                {header.replace(/([A-Z])/g, " $1").trim()} {/* Format camelCase to words */}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={index}>
                            {headers.map((header, idx) => (
                                <TableCell key={idx}>
                                    {header === "status" ? (
                                        <Badge
                                            className={`${
                                                row[header] === "Completed" || row[header] === "Active"
                                                    ? "bg-green-100 text-green-800"
                                                    : row[header] === "In Progress" || row[header] === "Draft"
                                                    ? "bg-[#FFD279] text-black"
                                                    : "bg-gray-100 text-gray-800"
                                            } rounded-full px-2 py-1`}
                                        >
                                            {row[header]}
                                        </Badge>
                                    ) : (
                                        row[header]
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}