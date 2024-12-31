"use client"
import React, { useState } from 'react'
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
      status: "Active",
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
      name: "All Orders",
      value: "all"
    },
    {
      name: "Completed",
      value: "Completed"
    }, {
      name: "In Progress",
      value: "In Progress"
    },
    {
      name: "Cancelled",
      value: "Cancelled"
    }
  ]
  
  const [activeTab, setActiveTab] = useState("all");

  const filteredOrders = ordersData.filter((order) => {
    if (activeTab === "all") return true;
    return order.status === activeTab;
  });

  return (
    <div className='w-full'>
      <div className="flex flex-row justify-between items-center p-6">
        <h1 className="text-[20px] font-semibold leading-[27.32px]">Order History</h1>
        <Tabs defaultValue="all" className="w-[400px]" onValueChange={(value) => setActiveTab(value)}>
          <TabsList className="grid w-full grid-cols-4 bg-gray-100 rounded-md p-3 h-[100%]">
            {tabs.map((tab: any, index: number) => (
              <TabsTrigger
                key={index}
                // defaultValue="all"
                value={tab?.value}
                className="data-[state=active]:bg-black data-[state=active]:text-white text-gray-800 transition-colors rounded-md font-[600]  text-[10px]"
              >
                {tab?.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <Button variant="outline" className="text-[14px] text-[#777777] font-semibold leading-[19.12px] border border-gray-300 rounded-[6px] h-[35px] w-[78px] flex items-center justify-center">
                  See All
        </Button>
      </div>
      <TableDemo data={filteredOrders} />
    </div>
  )
}

export default OrderHistoryDashboard