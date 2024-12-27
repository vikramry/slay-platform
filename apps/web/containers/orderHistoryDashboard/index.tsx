"use client"
import React from 'react'
import { TableDemo } from '../dashboardTablecomponent'
import { Button } from '@repo/ui';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui"
function OrderHistoryDashboard() {
  const ordersData = [
    {
      orderID: "123456789",
      customer: "Gaurav Kumar",
      date: "July 27, 2024",
      status: "In Progress",
      unitPrice: "₹499",
      platform: "Dotpe",
    },
    {
      orderID: "123456789",
      customer: "Vijay Viju",
      date: "Mar 15, 2024",
      status: "Completed",
      unitPrice: "₹399",
    },
    {
      orderID: "123456789",
      customer: "Roshan Gujarathi",
      date: "Apr 18, 2024",
      status: "Completed",
      unitPrice: "₹449",
    },
    {
      orderID: "123456789",
      customer: "Vikram Y",
      date: "Aug 21, 2024",
      status: "In Progress",
      unitPrice: "₹1,199",
    },
    {
      orderID: "123456789",
      customer: "Srinivas A",
      date: "July 27, 2024",
      status: "Cancelled",
      unitPrice: "₹170",
    },
  ];
  const tabs = [
    {
      name: "All orders",
      value: "all"
    },
    {
      name: "Completed",
      value: "COMPLETED"
    }, {
      name: "In Progress",
      value: "IN_PROGRESS"
    }
  ]
  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-[600]  text-[20px]">Order History</h1>
        <Tabs defaultValue="All Products" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-md p-3 h-[100%]">
            {tabs.map((tab: any, index: number) => (
              <TabsTrigger
                key={index}
                defaultValue="all"
                value={tab?.value}
                className="data-[state=active]:bg-black data-[state=active]:text-white text-gray-800 transition-colors rounded-md font-[600]  text-[10px]"
              >
                {tab?.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <TableDemo data={ordersData} />
    </div>
  )
}

export default OrderHistoryDashboard