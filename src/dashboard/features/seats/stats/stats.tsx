"use client";
import { useDashboard } from "@/features/seats/seats-state";
import StatsCard from "./stats-card";

export const Stats = () => {
  const { seatsData } = useDashboard();
  const total_inactive_seats = seatsData.total_seats - seatsData.total_active_seats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 col-span-4">
      <StatsCard
        title="总坐席数"
        description="已分配的总坐席数"
        value={seatsData.total_seats > 0 ? seatsData.total_seats.toString() : "0"}
      ></StatsCard>
      <StatsCard
        title="活跃坐席数"
        description="活跃坐席总数"
        value={seatsData.total_active_seats > 0 ? seatsData.total_active_seats.toString() : "0"}
      ></StatsCard>
      <StatsCard
        title="非活跃坐席数"
        description="非活跃坐席总数"
        value={total_inactive_seats > 0 ? total_inactive_seats.toString() : "0"}
      ></StatsCard>
      <StatsCard
        title="采用率"
        description="按活跃坐席总数计算的采用率"
        value={seatsData.total_seats > 0 ? ((seatsData.total_active_seats / seatsData.total_seats) * 100).toFixed(0) + "%" : "0%"}
      ></StatsCard>
    </div>
  );
};


