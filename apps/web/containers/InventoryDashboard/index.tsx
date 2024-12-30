import React from 'react'
import { TableDemo } from '../dashboardTablecomponent'
import { Button } from '@repo/ui';

function InventoryDashboard() {
     const inventoryData = [
        { productName: "SLAY Signature Blend", productID: "SLAY-000189", productsInStock: "1210 in Stock" },
        { productName: "SLAY X-Blend Arabica", productID: "SLAY-000190", productsInStock: "850 in Stock" },
        { productName: "SLAY Madras Mud Blend", productID: "SLAY-000191", productsInStock: "99 in Stock" },
        { productName: "SLAY (Combo Pack)", productID: "SLAY-000192", productsInStock: "1350 in Stock" },
        { productName: "SLAY Blueberry Lemon", productID: "SLAY-000165", productsInStock: "655 in Stock" },
        { productName: "Hazelnut Coffee Protein", productID: "SLAY-000185", productsInStock: "2150 in Stock" },
      ];
      
  return (
    <div>
        <div className='flex justify-between'>
        <div><h1 className='text-[20px] font-semibold leading-[27.32px]'>Order History</h1></div>
        <Button variant="outline" className="text-[14px] text-[#777777] font-semibold leading-[19.12px] border border-gray-300 rounded-[6px] h-[35px] w-[78px] flex items-center justify-center">
          See All
        </Button>
        </div>
        <TableDemo data={inventoryData}/>
        </div>
  )
}

export default InventoryDashboard