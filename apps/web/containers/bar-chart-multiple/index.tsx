"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui";

export function BarChartMultiple({
  title,
  data,
}: {
  title?: string;
  data: { couponCode: string; usageCount: number; totalDiscount: number }[];
}) {

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <BarChart
          data={data}
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
