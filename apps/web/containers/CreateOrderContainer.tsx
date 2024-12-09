"use client";
import { Label } from "@repo/ui";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  useToast,
  Toaster,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@repo/ui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLazyQuery } from "@/app/hook";
import { serverFetch } from "@/app/action";
import { LuX } from "react-icons/lu";
const productData=[
  {
    name:"product1",
    qty:1,
    price:199,
    TotalAmount:199,
    type:"ck-bbl"
  },
  {
    name:"product2",
    qty:1,
    price:199,
    TotalAmount:199,
    type:"ck-bbl"
  },{
    name:"product3",
    qty:1,
    price:199,
    TotalAmount:199,
    type:"ck-bbl"
  }
]
const CreateOrderContainer = () => {
  const [listProducts,{data,loading,error}]=useLazyQuery(serverFetch)
  const formSchema = z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    label: z.string({
      required_error: "Label is required",
    }),
    key: z.string().optional(),
    managed: z.boolean(),
    prefix: z.string().optional(),
  });
// useEffect(()=>{
//   listProducts()
// },[])
  /*
        create customer
        create Invoice
        create Invoice Lines
      */
  return (
    <div className="justify-center items-center w-full grid grid-cols-12">
      {/* <Label className="text-lg">Custom Customer Order</Label> */}
      <div className="col-span-8">

      <div className="bg-white p-5 rounded-lg shadow-md col-span-8 flex flex-col gap-2">
        <h4>Products</h4>
        <Select onValueChange={(value) => {}}>
          <SelectTrigger className="">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select Product</SelectLabel>
              <SelectItem value={"kewnsfkdj"}>{"product"}</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex flex-col gap-2 ">
          <div className="grid grid-cols-12 pb-2 border-b border-gray">
            <h5 className="col-span-8">Product</h5>
            <h5 className="col-span-1 text-center">Quantity</h5>
            <h5 className="col-span-2 text-center">Total</h5>
          </div>
          {productData?.map((item:any)=>{
            return(
          <div className="grid grid-cols-12 pb-2 border-b border-gray items-center">
            <div className="col-span-8">
            <h5>{item?.name}</h5>
            </div>
            <Input type="text" placeholder="Enter quantity" className="col-span-1 text-center" value={item?.qty}/>
            <h5 className="col-span-2 text-center">{`₹ ${item?.TotalAmount}.00`}</h5>
            <LuX size={20}/>
          </div>
            )
          })}
        </div>
      </div>
      <div className="bg-white p-5 rounded-lg shadow-md col-span-8 flex flex-col gap-2 mt-5">
      <h4>Payment</h4>
      <div className="border-1 border-gray-700 p-2">
        <div className="grid grid-cols-12">
          <h5 className="col-span-3">Subtotal</h5>
          <h5 className="col-span-3">item</h5>
          <h5 className="col-span-6 text-end">₹ 199.00</h5>

        </div>
      </div>
      </div>
      </div>
    </div>
  );
};

export default CreateOrderContainer;
