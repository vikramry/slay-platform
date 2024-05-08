"use client"

import { serverFetch } from "@/app/action"
import { useLazyQuery } from "@/app/hook"
import { CreateTabQuary } from "@/app/queries"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Checkbox, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input } from "@repo/ui"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"



const formSchema = z.object({
    order: z.number({
        required_error: "Order is required",
    }),
    label: z.string({
        required_error: "Label is required",
    }),

})

const CreatTab = () => {
  const [createTab,{ data, loading, error }] = useLazyQuery(serverFetch);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)

        createTab(
            CreateTabQuary,
            {
                "input": {
                  "createdBy": null,
                  "icon": null,
                  "label": values?.label,
                  "model": null,
                  "order": values?.order,
                  "updatedBy": null
                }
              },
            {
                cache: "no-store"
            }
        );
    }

    useEffect(()=>{
        if(data){
        
        }else if(error){
          
        }
        },[data, loading, error])
    // ...

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-5">

                    <FormField
                        control={form.control}
                        name="label"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Label</FormLabel>
                                <FormControl>
                                    <Input placeholder="Label" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="order"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Order</FormLabel>
                                <FormControl>
                                    <Input placeholder="Order" {...field} type="number" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex justify-center items-center">
                    <Button
                        type="submit"
                        variant="default"
                        className="flex justify-center items-center w-fit"
                    >
                        Submit
                    </Button>
                </div>      </form>
        </Form>
    )
}
export default CreatTab