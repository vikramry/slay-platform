"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/ui"
const chartData = [
  { Weekly: "Mon", Payments: 187, fill: "var(--color-Mon)" },
  { Weekly: "Tue", Payments: 200, fill: "var(--color-Tue)" },
  { Weekly: "Wed", Payments: 275, fill: "var(--color-Wed)" },
  { Weekly: "Thu", Payments: 173, fill: "var(--color-Thu)" },
  { Weekly: "Fri", Payments: 90, fill: "var(--color-Fri)" },
  { Weekly: "Sat", Payments: 230, fill: "var(--color-Sat)" },
  { Weekly: "Sun", Payments: 170, fill: "var(--color-Sun)" },
]

const chartConfig = {
  Payments: {
    label: "Payments",
  },
  Mon: {
    label: "Mon",
    color: "hsl(var(--chart-1))",
  },
  Tue: {
    label: "Tue",
    color: "hsl(var(--chart-2))",
  },
  Wed: {
    label: "Wed",
    color: "hsl(var(--chart-3))",
  },
  Thu: {
    label: "Thu",
    color: "hsl(var(--chart-4))",
  },
  Fri: {
    label: "Fri",
    color: "hsl(var(--chart-5))",
  },
  Sat: {
    label: "Sat",
    color: "hsl(var(--chart-6))",
  }, Sun: {
    label: "Sun",
    color: "hsl(var(--chart-7))",
  },
} satisfies ChartConfig

export function PaymentAnalyticsCard() {
  return (
    <Card className="w-[22rem] h-[22rem]">
      <CardHeader>
        <CardTitle>Payment Analytics</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="Weekly"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="Payments"
              strokeWidth={2}
              radius={8}
              activeIndex={2}
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                )
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total Payments for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
