"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useDashboard } from "../dashboard-state";
import { ChartHeader } from "./chart-header";
import {
  computeActiveUserAverage,
  computeAdoptionRate,
  computeCumulativeAcceptanceAverage,
} from "./common";
import StatsCard from "./stats-card";

export const Stats = () => {
  const { filteredSeatsData, filteredData, isLoading } = useDashboard();
  const acceptanceAverage = computeCumulativeAcceptanceAverage(filteredData);
  const averageActiveUsers = computeActiveUserAverage(filteredData);
  const adoptionRate = computeAdoptionRate(filteredSeatsData);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 col-span-4">
      <StatsCard
        title="接受率平均值"
        tip="接受率平均值是代码行和聊天建议的接受率平均值，包括聊天插入和复制事件。"
        description="综合接受率平均值"
        value={isLoading ? "..." : acceptanceAverage.toFixed(0) + "%"}
      ></StatsCard>
      <StatsCard
        title="活跃用户"
        tip="在给定期间内，具有日常活动的 Copilot 用户的平均数量，属于任何 Copilot 功能。包括被动活动（如接收代码建议）和参与活动（如接受代码建议或聊天提示）。不包括身份验证事件。"
        description="日常活跃用户平均值"
        value={isLoading ? "..." : averageActiveUsers.toFixed(0) + ""}
      ></StatsCard>
      <StatsCard
        title="采用率"
        tip="采用率是活跃坐席与总坐席的百分比。"
        description="按活跃坐席计算的采用率"
        value={isLoading ? "..." : adoptionRate.toFixed(0) + "%"}
      ></StatsCard>
      <Overview />
    </div>
  );
};

export const Overview = () => {
  const Item = ({ label, value }: { label: string; value: number }) => (
    <div className="flex-1 flex flex-row gap-2">
      <div className="text-xs flex-1 text-muted-foreground">{label}</div>
      <div className="text-xs ">{value}</div>
    </div>
  );

  const { filteredSeatsData, isLoading } = useDashboard();
  let total_seats = 0;
  let total_active_seats = 0;

  if (
    filteredSeatsData &&
    typeof filteredSeatsData.total_seats === "number" &&
    typeof filteredSeatsData.total_active_seats === "number"
  ) {
    total_seats = filteredSeatsData.total_seats;
    total_active_seats = filteredSeatsData.total_active_seats;
  }

  return (
    <Card className="col-span-1">
      <ChartHeader
        title="坐席信息"
        description="GitHub Copilot 坐席概览"
        tip={
          "活跃坐席是最后活动在过去 30 天内的坐席。非活跃坐席是最后活动为空或超过 30 天的坐席。"
        }
      />
      <CardContent className=" flex flex-col gap-2">
        {isLoading ? (
          <>
            <div className="flex-1 flex flex-row gap-2">
              <div className="text-xs flex-1 text-muted-foreground">
                总坐席
              </div>
              <div className="text-xs">...</div>
            </div>
            <div className="flex-1 flex flex-row gap-2">
              <div className="text-xs flex-1 text-muted-foreground">
                活跃坐席
              </div>
              <div className="text-xs">...</div>
            </div>
            <div className="flex-1 flex flex-row gap-2">
              <div className="text-xs flex-1 text-muted-foreground">
                非活跃坐席
              </div>
              <div className="text-xs">...</div>
            </div>
          </>
        ) : (
          <>
            <Item label="总坐席" value={total_seats} />
            <Item label="活跃坐席" value={total_active_seats} />
            <Item
              label="非活跃坐席"
              value={total_seats - total_active_seats}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};
