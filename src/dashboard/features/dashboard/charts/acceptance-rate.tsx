"use client";
import { Card, CardContent } from "@/components/ui/card";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useDashboard } from "../dashboard-state";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { AcceptanceRateData, computeAcceptanceAverage } from "./common";

import { ChartHeader } from "./chart-header";

export const AcceptanceRate = () => {
  const { filteredData } = useDashboard();
  const data = computeAcceptanceAverage(filteredData);

  return (
    <Card className="col-span-4">
      <ChartHeader
        title="接受率"
        description="GitHub Copilot 建议的被接受代码和代码行与总建议代码和代码行的比率"
      />

      <CardContent>
        <ChartContainer config={chartConfig} className="h-80 w-full">
          <AreaChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              allowDataOverflow
            />
            <XAxis
              dataKey={chartConfig.timeFrameDisplay.key}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
            <Area
              dataKey={chartConfig.acceptanceRate.key}
              type="linear"
              fill="hsl(var(--chart-2))"
              stroke="hsl(var(--chart-2))"
            />
            <Area
              dataKey={chartConfig.acceptanceLinesRate.key}
              type="linear"
              fill="hsl(var(--chart-1))"
              fillOpacity={0.6}
              stroke="hsl(var(--chart-1))"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

const chartConfig: Record<
  DataKey,
  {
    label: string;
    key: DataKey;
  }
> = {
  ["acceptanceRate"]: {
    label: "接受率 (%) ",
    key: "acceptanceRate",
  },

  ["acceptanceLinesRate"]: {
    label: "代码行接受率 (%) ",
    key: "acceptanceLinesRate",
  },

  ["timeFrameDisplay"]: {
    label: "时间范围显示",
    key: "timeFrameDisplay",
  },
};

type DataKey = keyof AcceptanceRateData;
