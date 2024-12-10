import React from 'react'
import { BarChartCard } from '../PaymentsAnalyticscard'
import { LineChartLinear } from '../lineChart'
import { PieChartDonut } from '../pie-chart-donut'
import { AreaChartCard } from '../OrderAnalyticsCard'

function DashboardAnalyticsContainer() {
  return (
    <div className='grid grid-cols-4 gap-4'>
        <BarChartCard title='Orders'/>
        <LineChartLinear/>
        <PieChartDonut/>
        <AreaChartCard/>
    </div>
  )
}

export default DashboardAnalyticsContainer