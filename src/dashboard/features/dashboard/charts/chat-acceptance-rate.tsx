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

import { ChatAcceptanceRateData, computeChatAcceptanceAverage } from "./common";

import { ChartHeader } from "./chart-header";

export const ChatAcceptanceRate = () => {
  const { filteredData } = useDashboard();
  const data = computeChatAcceptanceAverage(filteredData);

  return (
    <Card className="col-span-4">
      <ChartHeader
        title="聊天接受率"
        description="GitHub Copilot 聊天总插入和复制事件与 GitHub Copilot 聊天总数的比率"
      />

      <CardContent>
        <ChartContainer config={chartConfig} className="h-80 w-full">
          <AreaChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <YAxis
              dataKey={chartConfig.acceptanceChatRate.key}
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
              dataKey={chartConfig.acceptanceChatRate.key}
              type="linear"
              fill="hsl(var(--chart-2))"
              stroke="hsl(var(--chart-2))"
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
  ["acceptanceChatRate"]: {
    label: "聊天接受率 (%) ",
    key: "acceptanceChatRate",
  },

  ["timeFrameDisplay"]: {
    label: "时间范围显示",
    key: "timeFrameDisplay",
  },
};

type DataKey = keyof ChatAcceptanceRateData;
