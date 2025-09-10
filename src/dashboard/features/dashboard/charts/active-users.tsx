"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useDashboard } from "../dashboard-state";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartHeader } from "./chart-header";
import { ActiveUserData, getActiveUsers } from "./common";

export const ActiveUsers = () => {
  const { filteredData } = useDashboard();
  const data = getActiveUsers(filteredData);

  return (
    <Card className="col-span-4">
      <ChartHeader
        title="活跃用户"
        description="每天使用聊天和内联建议的活跃用户总数。"
      />
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-80">
          <BarChart accessibilityLayer data={data}>
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
            <Bar
              dataKey={chartConfig.totalUsers.key}
              fill="hsl(var(--chart-2))"
              radius={4}
            />{" "}
            <Bar
              dataKey={chartConfig.totalChatUsers.key}
              fill="hsl(var(--chart-1))"
              radius={4}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
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
  ["totalUsers"]: {
    label: "总用户数",
    key: "totalUsers",
  },
  ["totalChatUsers"]: {
    label: "聊天用户总数",
    key: "totalChatUsers",
  },
  ["timeFrameDisplay"]: {
    label: "时间范围显示",
    key: "timeFrameDisplay",
  },
};

type DataKey = keyof ActiveUserData;
