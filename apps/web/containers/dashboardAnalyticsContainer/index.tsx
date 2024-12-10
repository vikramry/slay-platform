"use client";
import { serverFetch } from "@/app/action";
import { useLazyQuery } from "@/app/hook";
import { DASHBOARD_ANALYTICS } from "@/app/queries";
import React, { useEffect, useState } from "react";
import { BarChartCard } from "../PaymentsAnalyticscard";
import { LineChartLinear } from "../lineChart";
import { PieChartDonut } from "../pie-chart-donut";
import { AreaChartCard } from "../OrderAnalyticsCard";
import { PieChartStacked } from "../pie-chart-stacked";
import { BarChartMultiple } from "../bar-chart-multiple";
import { TooltipDefault } from "../tooltip-default";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@repo/ui";

function DashboardAnalyticsContainer() {
    const [selectedtype,setselectedType]=useState("DAY")
  const [getDashboardData, getDashboardDataResponse] =
    useLazyQuery(serverFetch);
//   useEffect(() => {
//     getDashboardData(
//       DASHBOARD_ANALYTICS,
//       {},
//       {
//         cache: "no-store",
//       }
//     );
//   }, []);
  useEffect(()=>{
    getDashboardData(
        DASHBOARD_ANALYTICS,
        {
            "orderRevenueBy": selectedtype
          },
        {
          cache: "no-store",
        }
      );
  },[selectedtype])
  useEffect(() => {
    if (getDashboardDataResponse?.data) {
      console.log(getDashboardDataResponse?.data, "getDashboardDataResponse");
    } else if (getDashboardDataResponse?.error) {
      console.log(getDashboardDataResponse?.error, "getDashboardDataResponse");
    }
  }, [
    getDashboardDataResponse?.data,
    getDashboardDataResponse?.error,
    getDashboardDataResponse?.loading,
  ]);
  return (
    <div className="flex flex-col gap-3 mt-2">
      <div className="flex flex-row justify-end ">
        <div className="w-[200px]  ">
          <Select value={selectedtype}
            onValueChange={(value) => {
                setselectedType(value);
            }}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Select collection" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select collection</SelectLabel>
                <SelectItem value="DAY">Day</SelectItem>
                <SelectItem value="MONTH">Month</SelectItem>
                <SelectItem value="YEAR">Year</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {getDashboardDataResponse?.data ? (
        <div className="grid grid-cols-3 gap-4">
          <BarChartCard
            title="Orders"
            data={
              getDashboardDataResponse?.data?.dashboardAnalytics
                ?.orderRevenueInsights
            }
          />
          {/* <LineChartLinear /> */}
          <PieChartDonut
            title="Shipments"
            data={
              getDashboardDataResponse?.data?.dashboardAnalytics
                ?.orderShipmentStatusInsights
            }
          />
          <AreaChartCard
            title="Payments"
            data={
              getDashboardDataResponse?.data?.dashboardAnalytics
                ?.orderRevenueInsights
            }
          />
          <BarChartMultiple
            title="Coupons"
            data={
              getDashboardDataResponse?.data?.dashboardAnalytics
                ?.couponsInsights
            }
          />
          {/* <PieChartStacked title='Coupons' data={getDashboardDataResponse?.data?.dashboardAnalytics?.couponsInsights}/>
        <TooltipDefault title='Coupons' data={getDashboardDataResponse?.data?.dashboardAnalytics?.couponsInsights}/> */}
        </div>
      ) : (
        <h4>loading..</h4>
      )}
    </div>
  );
}

export default DashboardAnalyticsContainer;
