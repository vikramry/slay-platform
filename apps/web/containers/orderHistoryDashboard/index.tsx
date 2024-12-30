import React from 'react'
import { TableDemo } from '../dashboardTablecomponent'
import { Button } from '@repo/ui';

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
  return (
    <div>
        <div className='flex justify-between'>
        <div><h1 className='text-[20px] font-semibold leading-[27.32px]'>Order History</h1></div>
        <div><Button variant="outline" className="text-[14px] text-[#777777] font-semibold leading-[19.12px] border border-gray-300 rounded-[6px] h-[35px] w-[78px] flex items-center justify-center">
                  See All
        </Button></div>
        </div>
        <TableDemo data={ordersData}/>
        </div>
  )
}

export default OrderHistoryDashboard