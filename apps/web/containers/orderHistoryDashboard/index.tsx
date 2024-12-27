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
  return (
    <div>
        <div><h1>title</h1><div><Button variant="outline">Show all</Button></div></div>
        <TableDemo data={ordersData}/>
        </div>
  )
}

export default OrderHistoryDashboard