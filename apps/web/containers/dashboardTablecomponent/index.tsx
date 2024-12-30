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

export function GetData({ product }) {
  return (
    <>
      <div className="flex gap-3">
        <div>
          <img src={product.image} className="w-10 h-10"></img>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[12px] font-semibold leading-[16.39px]">
            {product.name}
          </p>
          <div className="flex gap-2">
            {product.variants.map((variant, index) => {
              return (
                <p
                  key={index}
                  className="text-[12px] font-semibold leading-[16.39px] text-gray-500"
                >
                  {variant}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

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
                {header
                  .replace(/([A-Z])/g, " $1") // Format camelCase to words
                  .trim()
                  .replace(/^./, (char) => char.toUpperCase())}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              className="text-[12px] font-semibold leading-[16.39px]"
            >
              {headers.map((header, idx) => (
                <TableCell key={idx}>
                  {typeof row[header] === "object" && row[header] !== null ? (
                    <GetData product={row[header]}></GetData>
                  ) : header === "image" ? (
                    <img
                      src={row[header]}
                      alt={row.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : header === "status" ? (
                    <Badge
                      className={`${
                        row[header] === "Active" || row[header] === "Completed"
                          ? "bg-green-100 text-green-800 "
                          : row[header] === "Draft" ||
                              row[header] === "In Progress"
                            ? "bg-[#FFD279] text-black"
                            : "bg-gray-100 text-gray-800"
                      } rounded-full px-2 py-1 hover:bg-transparent`}
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
