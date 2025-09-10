"use client";
import { Card, CardContent } from "@/components/ui/card";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useDashboard } from "../dashboard-state";
import { ChartHeader } from "./chart-header";
import {
  SuggestionAcceptanceData,
  totalSuggestionsAndAcceptances,
} from "./common";

export const TotalSuggestionsAndAcceptances = () => {
  const { filteredData } = useDashboard();
  const data = totalSuggestionsAndAcceptances(filteredData);
  return (
    <Card className="col-span-4">
      <ChartHeader
        title="代码建议总数和接受数"
        description="向用户显示的 Copilot 代码完成建议总数与用户接受的 Copilot 代码完成建议总数的对比。"
      />
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-80">
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
              dataKey={chartConfig.totalSuggestionsCount.key}
              type="linear"
              fill="hsl(var(--chart-2))"
              stroke="hsl(var(--chart-2))"
            />
            <Area
              dataKey={chartConfig.totalAcceptancesCount.key}
              type="linear"
              fill="hsl(var(--chart-1))"
              stroke="hsl(var(--chart-1))"
              fillOpacity={0.6}
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
  ["totalAcceptancesCount"]: {
    label: "接受总数",
    key: "totalAcceptancesCount",
  },
  ["totalSuggestionsCount"]: {
    label: "建议总数",
    key: "totalSuggestionsCount",
  },
  ["timeFrameDisplay"]: {
    label: "时间范围显示",
    key: "timeFrameDisplay",
  },
};

type DataKey = keyof SuggestionAcceptanceData;
