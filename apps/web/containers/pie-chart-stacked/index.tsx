"use client";

import * as React from "react";
import { Pie, PieChart, ResponsiveContainer } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/ui";

// Function to generate a random color
const generateRandomColor = (): string => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
const chartConfig = {
  productName: {
    label: "Product Name",
  },
  variantName: {
    label: "Variant Name",
  },
  totalQuantity: {
    label: "Total Quantity",
    color: "hsl(var(--chart-1))",
  },
  totalRevenue: {
    label: "Total Revenue",
    color: "hsl(var(--chart-2))",
  },
};

// Define a color mapping dynamically
const useDynamicColorMapping = (data: { variantName: string }[]) => {
  const colorMapping = React.useMemo(() => {
    const uniqueVariants = Array.from(new Set(data.map(item => item.variantName)));
    return uniqueVariants.reduce((acc, variant, index) => {
      // Adjust lightness to create varying black shades
      const lightness = 50 + (index * 10) % 50; // Ensures lightness varies between 50 and 100
      acc[variant] = acc[variant] || `hsl(0, 0%, ${lightness}%)`; // Only black shades (no saturation)
      return acc;
    }, {} as Record<string, string>);
  }, [data]);

  return colorMapping;
};


export function PieChartStacked({
  title,
  data = [],
}: {
  title?: string;
  data?: {
    productName: string;
    variantName: string;
    totalQuantity: number;
    totalRevenue: number;
  }[];
}) {
  // Generate dynamic colors
  const colorMapping = useDynamicColorMapping(data);

  // Assign colors dynamically based on variantName
  const formattedData = Array.isArray(data)
  ? data.map(item => ({
      ...item,
      fill: colorMapping[item.variantName] || "#CCCCCC", // Default color
    }))
  : [];
  if (!chartConfig || typeof chartConfig !== "object") {
    console.error("Invalid chartConfig provided");
    return null;
  }
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
        config={chartConfig || {}}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              {/* Tooltip Configuration */}
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelKey={"productName"}
                    indicator="line"
                    labelFormatter={(_, payload) => {
                      if (payload && payload[0]?.payload?.productName) {
                        return payload[0].payload.productName;
                      }
                      return "N/A";
                    }}
                  />
                }
              />
              {/* Pie for Total Quantity */}
              <Pie
                data={formattedData}
                dataKey="totalQuantity"
                nameKey="variantName"
                outerRadius={60}
                // label={(entry) => entry.variantName}
              />
              {/* Pie for Total Revenue */}
              <Pie
                data={formattedData}
                dataKey="totalRevenue"
                nameKey="variantName"
                innerRadius={70}
                outerRadius={90}
                label={false} // Disable labels for the second pie if desired
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
