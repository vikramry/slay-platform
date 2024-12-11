"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui";
import { useEffect, useState } from "react";

export function BarChartMultiple({
  title,
  data,
}: {
  title?: string;
  data: { couponCode: string; usageCount: number; totalDiscount: number }[];
}) {
  const PAGE_SIZE = 4; // Number of data points per page
  const [currentPage, setCurrentPage] = useState(0);

  // Compute the paginated data
  const paginatedData = data.slice(
    currentPage * PAGE_SIZE,
    (currentPage + 1) * PAGE_SIZE
  );

  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };
useEffect(() => {

}, [data])
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <BarChart
          data={paginatedData}
          width={450}
          height={300}
          barCategoryGap={20}
          barGap={5}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="couponCode"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          {/* Dual Y-Axis */}
          {/* <YAxis yAxisId="left" label={{ value: "Total Discount", angle: -90, position: "insideLeft" }} />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{ value: "Usage Count", angle: 90, position: "insideRight" }}
          /> */}
          <Tooltip />
          {/* Bars */}
          <Bar
            yAxisId="left"
            dataKey="totalDiscount"
            fill="hsl(var(--chart-1))"
            radius={4}
            barSize={30}
          />
          <Bar
            yAxisId="right"
            dataKey="usageCount"
            fill="hsl(var(--chart-2))"
            radius={4}
            barSize={20}
          />
        </BarChart>
      </CardContent>
      <div className="flex justify-between px-6">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
    </Card>
  );
}


// "use client";

// import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@repo/ui";

// export function BarChartMultiple({
//   title,
//   data,
// }: {
//   title?: string;
//   data: { couponCode: string; usageCount: number; totalDiscount: number }[];
// }) {
//   const chartConfig = {
//     totalDiscount: { label: "Total Discount", color: "hsl(var(--chart-1))" },
//     usageCount: { label: "Usage Count", color: "hsl(var(--chart-2))" },
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>{title}</CardTitle>
//       </CardHeader>
//       <CardContent>
//         {/* Wrap BarChart in ChartContainer */}
//         <ChartContainer config={chartConfig}>
//           <BarChart
//             data={data}
//             width={450}
//             height={300}
//             barCategoryGap={20}
//             barGap={5}
//           >
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="couponCode"
//               tickLine={false}
//               tickMargin={10}
//               axisLine={false}
//             />
//             {/* Tooltips */}
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent indicator="dashed" />}
//             />
//             {/* Bars */}
//             <Bar
//               dataKey="totalDiscount"
//               fill="hsl(var(--chart-1))"
//               radius={4}
//               barSize={30}
//             />
//             <Bar
//               dataKey="usageCount"
//               fill="hsl(var(--chart-2))"
//               radius={4}
//               barSize={20}
//             />
//           </BarChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   );
// }
