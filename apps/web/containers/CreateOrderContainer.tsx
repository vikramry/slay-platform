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

const productSchema = z.object({
  productItem: z.string({ required_error: "Product is required" }),
  quantity: z.coerce.number(),
  pricePerUnit: z.coerce.number(),
  variants: z.array(z.string()).optional(),
  totalAmount: z.coerce.number()
});

const formSchema = z.object({
  customer : z.string({
    required_error: "Customer is required",
  }),
  shippingAddress: z.string().optional(),
  billingAddress: z.string().optional(),
  isBillingSameAsShipping: z.boolean(),
  products: z.array(productSchema),
  totalAmount: z.coerce.number()
});

const CreateOrderContainer = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isBillingSameAsShipping: false
    },
  });
  const [getCustomersAddresses, {data, loading, error}] = useLazyQuery(serverFetch);

  useEffect(()=>{
    getCustomersAddresses(

    )
  }, [])
  
  return (
    <div className="justify-center items-center w-full">
      <Label className="text-lg">Custom Customer Order</Label>
      <div>
        
      </div>
    </div>
  );
};

export default CreateOrderContainer;


