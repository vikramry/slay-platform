'use client'
import { serverFetch } from '@/app/action';
import { useLazyQuery } from '@/app/hook';
import { DASHBOARD_ANALYTICS } from '@/app/queries';
import React, { useEffect } from 'react'

function DashboardAnalyticsContainer() {

  const [getDashboardData, getDashboardDataResponse] = useLazyQuery(serverFetch);
  useEffect(() => {
    getDashboardData(
      DASHBOARD_ANALYTICS,
      {
      
      },
      {
        cache: "no-store",
      }
    );
  }, []);
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
    <div>DashboardAnalyticsContainer</div>
  )
}

export default DashboardAnalyticsContainer