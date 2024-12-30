"use client"
import React, { useState } from 'react'
import { TableDemo } from '../dashboardTablecomponent'
import { Button, Tabs, TabsList, TabsTrigger } from '@repo/ui';

function InventoryDashboard() {
     const inventoryData = [
        { productName: "SLAY Signature Blend", productID: "SLAY-000189", productsInStock: "1210 in Stock" },
        { productName: "SLAY X-Blend Arabica", productID: "SLAY-000190", productsInStock: "850 in Stock" },
        { productName: "SLAY Madras Mud Blend", productID: "SLAY-000191", productsInStock: "99 in Stock" },
        { productName: "SLAY (Combo Pack)", productID: "SLAY-000192", productsInStock: "1350 in Stock" },
        { productName: "SLAY Blueberry Lemon", productID: "SLAY-000165", productsInStock: "655 in Stock" },
        { productName: "Hazelnut Coffee Protein", productID: "SLAY-000185", productsInStock: "2150 in Stock" },
      ];


      const tabs = [
        {
          name: "Top 3",
          value: "top3",
        },
        {
          name: "Last 3",
          value: "last3",
        },
        {
          name: "Out of Stock",
          value: "outofstock",
        },
      ];


      const [activeTab, setActiveTab] = useState("top3");


      const getFilteredData = () => {
        if (activeTab === "top3") {
          return inventoryData.slice(0, 3); 
        } else if (activeTab === "last3") {
          return inventoryData.slice(-3); 
        } else if (activeTab === "outofstock") {
          return inventoryData.filter((item) => parseInt(item.productsInStock) === 0); 
        }
        return inventoryData;
      };
    
      const filteredOrders = getFilteredData();
      
      return (
        <div>
          <div className="flex flex-row justify-between items-center p-6">
            <h1 className="text-[20px] font-semibold leading-[27.32px]">Inventory</h1>
            <Tabs defaultValue="top3" className="w-[400px]" onValueChange={(value) => setActiveTab(value)}>
              <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-md p-3 h-[100%]">
                {tabs.map((tab, index) => (
                  <TabsTrigger
                    key={index}
                    value={tab.value}
                    className="data-[state=active]:bg-black data-[state=active]:text-white text-gray-800 transition-colors rounded-md font-[600] text-[10px]"
                  >
                    {tab.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <Button
              variant="outline"
              className="text-[14px] text-[#777777] font-semibold leading-[19.12px] border border-gray-300 rounded-[6px] h-[35px] w-[78px] flex items-center justify-center"
            >
              See All
            </Button>
          </div>
          <TableDemo data={filteredOrders} />
        </div>
      );
    }
    

export default InventoryDashboard