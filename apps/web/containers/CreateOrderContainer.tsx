"use client";
import { Label } from '@repo/ui'
import React from 'react'
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
  SelectItem
} from "@repo/ui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLazyQuery } from "@/app/hook";
import { serverFetch } from "@/app/action";

const CreateOrderContainer = () => {
    const formSchema = z.object({
        name: z.string({
          required_error: "Name is required"
        }),
        label: z.string({
          required_error: "Label is required"
        }),
        key: z.string().optional(),
        managed: z.boolean(),
        prefix: z.string().optional(),
      });

      /*
        create customer
        create Invoice
        create Invoice Lines
      */
  return (
    <div className='justify-center items-center w-full'>
        <Label className="text-lg">Custom Customer Order</Label>
        <div>

        </div>
    </div>
  )
}

export default CreateOrderContainer