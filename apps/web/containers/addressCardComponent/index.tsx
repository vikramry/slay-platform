"use client"
import { serverFetch } from "@/app/action";
import { useLazyQuery } from "@/app/hook";
import { GET_ORDER } from "@/app/queries";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

interface AddressCardProps {
  address: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    country: string;
    id: string;
    name: string;
    mobile: string;
    state: string;
    street?: string;
    zipCode: string;
    landmark?: string;
  };
}
 const AddressCardContainer =()=>{
  const {recordId}=useParams()
  const [getOrder,getOrderResponse]=useLazyQuery(serverFetch)
useEffect(() => {
  getOrder(GET_ORDER,{
    where: {
      id: {
        is: recordId,
      },
    },
  },{
    cache: "no-store"
  })
}, [recordId])
useEffect(() => {
  if(getOrderResponse?.data){
console.log(getOrderResponse?.data,"getOrderResponse")
}
else if(getOrderResponse?.error){
  console.log(getOrderResponse?.error,"getOrderResponse")

}
}, [getOrderResponse?.data,getOrderResponse?.error,getOrderResponse?.loading])
  return(
    <>
    {getOrderResponse?.data && 
    <div className="flex flex-col justify-between gap-3">
      <AddressCard address={getOrderResponse?.data?.getOrder?.invoice?.shippingAddress} type="Shipping Address"/>
      <AddressCard address={getOrderResponse?.data?.getOrder?.invoice?.billingAddress} type="Billing Address"/>

    </div>}
    </>
  )
}
export default AddressCardContainer
const AddressCard = ({ address,type }:{address:any,type:string}) => {
  console.log(address,"address")
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-[black] w-[100%]">
      <h2 className="text-xl font-bold text-gray-800 mb-2 flex lfex-row justify-center w-[100%]">{type}</h2>
      <h2 className="text-lg font-bold text-gray-800 mb-2">{address?.name}</h2>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Mobile:</span> {address.mobile}
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Address:</span>{" "}
        {address?.addressLine1}, {address?.addressLine2 && `${address?.addressLine2}, `}
        {address?.street && `${address?.street}, `}
        {address?.city}, {address?.state} - {address?.zipCode}
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Landmark:</span>{" "}
        {address?.landmark || "N/A"}
      </p>
      <p className="text-gray-600">
        <span className="font-semibold">Country:</span> {address?.country}
      </p>
    </div>
  );
};

