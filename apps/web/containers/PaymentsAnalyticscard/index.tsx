"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/ui";

export function BarChartCard({
  title,
  data,
  xaxis,
  yaxis,
  PAGESIZE,
}: {
  title?: string;
  data?: { dailyRevenue: number; orderCount: number; date: string }[];
  xaxis?:string;
  yaxis?:string;
  PAGESIZE?:number
}) {


  const PAGE_SIZE = PAGESIZE || 4; // Number of data points per page
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
    <Card className="">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{ Payments: { label: "Payments" } }}>
          <BarChart width={500} height={300} data={paginatedData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={xaxis}//date
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              interval={0}
              tickFormatter={(value: string) => {
                if (xaxis === "date") {
                  // Format the date for better readability
                  const options: Intl.DateTimeFormatOptions = {
                    month: "short",
                    day: "numeric",
                  };
                  return new Date(value).toLocaleDateString("en-US", options);
                } else {
                  // If not date, return the value as it is
                  return value;
                }
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey={yaxis}//orderCount
              strokeWidth={2}
              radius={[8, 8, 0, 0]}
              fill="hsl(var(--chart-bar))"
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray="4"
                    strokeDashoffset={4}
                  />
                );
              }}
            />
          </BarChart>
        </ChartContainer>
        <div className="flex justify-between mt-4">
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
      </CardContent>
    </Card>
  );
}
