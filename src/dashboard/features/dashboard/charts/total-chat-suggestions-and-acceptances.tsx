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
  ChatAcceptanceData,
  totalChatsAndAcceptances,
} from "./common";

export const TotalChatsAndAcceptances = () => {
  const { filteredData } = useDashboard();
  const data = totalChatsAndAcceptances(filteredData);
  return (
    <Card className="col-span-4">
      <ChartHeader
        title="聊天建议总数和接受数"
        description="Copilot 聊天建议的总数，包括插入和复制事件与 Copilot 聊天总数的对比。"
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
              dataKey={chartConfig.totalChats.key}
              type="linear"
              fill="hsl(var(--chart-2))"
              stroke="hsl(var(--chart-2))"
            />
            <Area
              dataKey={chartConfig.totalChatInsertionEvents.key}
              type="linear"
              fill="hsl(var(--chart-1))"
              stroke="hsl(var(--chart-1))"
              fillOpacity={0.2}
            />
            <Area
              dataKey={chartConfig.totalChatCopyEvents.key}
              type="linear"
              fill="hsl(var(--chart-3))"
              stroke="hsl(var(--chart-3))"
              fillOpacity={0.2}
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
  ["totalChats"]: {
    label: "聊天总数",
    key: "totalChats",
  },
  ["totalChatInsertionEvents"]: {
    label: "聊天插入事件总数",
    key: "totalChatInsertionEvents",
  },
  ["totalChatCopyEvents"]: {
    label: "聊天复制事件总数",
    key: "totalChatCopyEvents",
  },
  ["timeFrameDisplay"]: {
    label: "时间范围显示",
    key: "timeFrameDisplay",
  },
};

type DataKey = keyof ChatAcceptanceData;
