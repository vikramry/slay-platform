"use client"

import { serverFetch } from "@/app/action"
import { useLazyQuery } from "@/app/hook"
import { CreateTabQuary, GetTabQuary, UpdateTabQuary } from "@/app/queries"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Checkbox, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input, toast } from "@repo/ui"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"



const formSchema = z.object({
    order: z.coerce.number(),
    label: z.string({
        required_error: "Label is required",
    }),

})

const CreatTab = ({edit=false}:{edit?:boolean}) => {
  const [createTab,{ data, loading, error }] = useLazyQuery(serverFetch);
  const [getTab, getTabResponse] = useLazyQuery(serverFetch);
  const [updateTab, updateTabResponse] = useLazyQuery(serverFetch);

  const params = useSearchParams();
  console.log(params.get("edit"), "fjyfjhvjgy");
  console.log(params.get("id"), "fjyfjhvjgy");

  const getTabFun=()=>{
    getTab(
        GetTabQuary,{
        "where": {
          "id": {
            "is": null
          }
        }
      },{
            cache: "no-store",
          }
    )
  }
useEffect(()=>{
if(edit){
    getTabFun()
}

},[])
useEffect(() => {
  if(getTabResponse.data){
    form.reset({
        label:getTabResponse.data.getTab.label,
        order:getTabResponse.data.getTab.order,
      })
  }
  else if(getTabResponse.error){
    toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: getTabResponse.error?.message,
      });
  }

}, [getTabResponse])
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
if(edit == false){
        createTab(
            CreateTabQuary,
            {
                "input": {
                //   "createdBy": null,
                  "icon": "icon",
                  "label": values?.label,
                //   "model": null,
                  "order": values?.order,
                //   "updatedBy": null
                }
              },
            {
                cache: "no-store"
            }
        );
    }
    else if(edit == true){
        updateTab(
            UpdateTabQuary,
            {
                "input": {
                  "createdBy": null,
                  "icon": null,
                  "label": values?.label,
                  "model": null,
                  "order": values?.order,
                  "updatedBy": null,
                  "id":null
                }
              },
            {
                cache: "no-store"
            }
        );
    }
    }

    useEffect(()=>{
        if(data){
            toast({
                title: "Success",
                description: "Successful created",
              })
        
        }else if(error){
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: error?.message,
              });
        }
        },[data, loading, error])

        useEffect(() => {
            if(updateTabResponse.data){
              toast({
                title: "Success",
                description: "Successful updated",
              })
            }
            else if(updateTabResponse?.error){
              toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: updateTabResponse?.error?.message,
              });
            }
            }, [updateTabResponse])
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