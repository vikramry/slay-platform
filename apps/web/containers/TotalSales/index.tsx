"use client";

import React from "react";
import { TableDemo } from "../dashboardTablecomponent";
import { Button } from "@repo/ui";

function TotalSales() {
  const ordersData = [
    { name: "Direct", location: "Hyderabad", orders: "10 Orders" },
    { name: "Gaurav Kumar", location: "Bangalore", orders: "2 Orders" },
    { name: "Vikram Y", location: "Chennai", orders: "5 Orders" },
    { name: "Srinivas A", location: "Hyderabad", orders: "4 Orders" },
    { name: "Avinash Vithi", location: "Bangalore", orders: "3 Orders" },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="px-7 flex justify-between items-center">
        <h1 className="text-[20px] font-semibold leading-[27.32px]">
          Total Sales
        </h1>
        <Button
          variant="outline"
          className="text-[14px] text-[#777777] font-semibold leading-[19.12px] border border-gray-300 rounded-[6px] h-[35px] w-[78px] flex items-center justify-center"
        >
          See All
        </Button>
      </div>

      <TableDemo data={ordersData} />
    </div>
  );
}

export default TotalSales;
