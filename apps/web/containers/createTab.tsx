"use client"

import { serverFetch } from "@/app/action"
import { useLazyQuery } from "@/app/hook"
import { CreateTabQuary, GetTabQuary, LIST_ALL_MODELS_ID_LABEL, UpdateTabQuary } from "@/app/queries"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Checkbox, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, Toaster, toast } from "@repo/ui"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"



const formSchema = z.object({
    order: z.coerce.number(),
    label: z.string({
        required_error: "Label is required",
    }),
    model: z.string({
        required_error: "Model is required",
    })

})

const CreatTab = ({ edit = false }: { edit?: boolean }) => {
    const [createTab, { data, loading, error }] = useLazyQuery(serverFetch);
    const [getTab, getTabResponse] = useLazyQuery(serverFetch);
    const [updateTab, updateTabResponse] = useLazyQuery(serverFetch);
    const [getModels, getModelsResponse] = useLazyQuery(serverFetch);
    const router = useRouter()
    const { tabId } = useParams();

    const getTabFun = () => {
        getTab(
            GetTabQuary, {
            "where": {
                "id": {
                    "is": tabId
                }
            }
        }, {
            cache: "no-store",
        }
        )
    }
    useEffect(() => {
        getModels(
            LIST_ALL_MODELS_ID_LABEL,
            {
                "limit": 50,
            },
            {
                cache: "no-store"
            }
        )
        if (edit) {
            getTabFun()
        }

    }, [])
    useEffect(() => {
        if (getModelsResponse.error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: getModelsResponse.error?.message,
            });
        }
    }, [getModelsResponse.data, getModelsResponse.error, getModelsResponse.loading]);
    useEffect(() => {
        if (getTabResponse.data) {
            console.log(getTabResponse.data.getTab.model?.id)
            form.reset({
                label: getTabResponse.data.getTab.label,
                order: getTabResponse.data.getTab.order,
                model: getTabResponse.data.getTab.model?.id
            })
        }
        else if (getTabResponse.error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: getTabResponse.error?.message,
            });
        }

    }, [getTabResponse?.data, getTabResponse?.loading, getTabResponse?.error])
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        if (edit == false) {
            createTab(
                CreateTabQuary,
                {
                    "input": {
                        //   "createdBy": null,
                        "icon": "icon",
                        "label": values?.label,
                        "model": values?.model,
                        "order": values?.order,
                        //   "updatedBy": null
                    }
                },
                {
                    cache: "no-store"
                }
            );
        }
        else if (edit == true) {
            updateTab(
                UpdateTabQuary,
                {
                    "input": {
                        //   "createdBy": null,
                        //   "icon": null,
                        "label": values?.label,
                        "model": values?.model,
                        "order": values?.order,
                        //   "updatedBy": null,
                        "id": tabId
                    }
                },
                {
                    cache: "no-store"
                }
            );
        }
    }

    useEffect(() => {
        if (data) {
            toast({
                title: "Success",
                description: "Successful created",
            })
            router.push("/dashboard/tabs")

        } else if (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: error?.message,
            });
        }
    }, [data, loading, error])

    useEffect(() => {
        if (updateTabResponse.data) {
            toast({
                title: "Success upadated",
                description: "Successful updated",
            })
            setTimeout(function () {
                router.push("/dashboard/tabs")
            }, 2000)

        }
        else if (updateTabResponse?.error) {
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
            <Toaster />
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

                    <FormField
                        control={form.control}
                        name="model"
                        render={({ field }) => (
                            <FormItem className="">
                                <FormLabel>Reference Model</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <SelectTrigger className="">
                                            <SelectValue placeholder="Select a Model" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Models</SelectLabel>
                                                {
                                                    getModelsResponse.data?.listModels?.docs.map((item: any) => <SelectItem key={item.id} value={item.id}>{item.label}</SelectItem>)
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex justify-center items-center">
                    <Button
                        type="submit"
                        variant="default"
                        disabled={loading}
                        className="flex justify-center items-center w-fit"
                    >
                        {loading ? "loading..." : "Submit"}
                    </Button>
                </div>      </form>
        </Form>
    )
}
export default CreatTab