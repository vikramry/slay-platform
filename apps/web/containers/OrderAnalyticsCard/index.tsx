"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/ui";

// Weekly chart data
const weeklyChartData = [
  { day: "Mon", Orders: 35 },
  { day: "Tue", Orders: 50 },
  { day: "Wed", Orders: 45 },
  { day: "Thu", Orders: 60 },
  { day: "Fri", Orders: 40 },
  { day: "Sat", Orders: 30 },
  { day: "Sun", Orders: 55 },
];

const chartConfig = {
  Orders: {
    label: "Orders",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function AreaChartCard({title,data}:{title?:string,data?:any}) {
  return (
    <Card className=" "> 
      <CardHeader className="pb-1">
        <CardTitle >{title}</CardTitle>
        {/* <CardDescription className="text-xs">
          Total Orders in the past week
        </CardDescription> */}
      </CardHeader>
      <CardContent className="pt-0">
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 8,
              right: 8,
            }}
            height={100}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              interval={0}
              tickFormatter={(date: string) => {
                // Format the date for better readability
                const options: Intl.DateTimeFormatOptions = {
                  // weekday: "short", // Short weekday (e.g., Mon, Tue)
                  month: "short",   // Short month (e.g., Jan, Feb)
                  day: "numeric",   // Numeric day
                };
                return new Date(date).toLocaleDateString("en-US", options);
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="dailyRevenue"
              type="natural"
              fill="var(--color-Orders)"
              fillOpacity={0.4}
              stroke="var(--color-Orders)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="">
        <div className="flex w-full items-start gap-1 text-xs">
          <div className="grid gap-1">
            <div className="flex items-center gap-1 font-medium leading-none">
              Up by 3% this week <TrendingUp className="h-3 w-3" />
            </div>
            <div className="text-muted-foreground">This week</div>
          </div>
        </div>
      </CardFooter> */}
    </Card>
  );
}
