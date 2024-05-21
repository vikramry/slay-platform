"use client"

import { serverFetch } from "@/app/action"
import { useLazyQuery } from "@/app/hook"
import { CreateModelOptionsQuary, GET_MODEL, UpdateModelOptionQuary, getModelOptionQuary } from "@/app/queries"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Checkbox, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue,  Toaster, toast, useToast } from "@repo/ui"
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"



const formSchema = z.object({
    keyName: z.string({
        required_error: "KeyName is required",
    }),
    managed: z.boolean(),
    type: z.string({
        required_error: "Type is required",
    }),
    value: z.any({
        required_error: "Value is required",
    })


})

const CreatModelOptions = ({ edit = false }: { edit?: boolean }) => {
    const [createModelOption, { data, loading, error }] = useLazyQuery(serverFetch);
    const [updateModelOption, updateModelOptionResponse] = useLazyQuery(serverFetch);
    const [getCurrentModel, getCurrentModelResponse] = useLazyQuery(serverFetch);
    const { toast } = useToast();

    const [getModelOption, getModelOptionResponse] = useLazyQuery(serverFetch);
    const router = useRouter();
    const { id, modelOptionId } = useParams();
    const getFieldOptionFun = () => {
        getModelOption(
            getModelOptionQuary, {
            "where": {
                "id": {
                    "is": modelOptionId
                }
            }
        }, {
            cache: "no-store",
        }
        )
    }
    useEffect(() => {
        if (edit) {
            getFieldOptionFun()
        } else {
            form.reset({
                managed: false
            })
        }

        getCurrentModel(GET_MODEL, {
            where: {
                id: {
                    is: id
                }
            }
        },
            {
                cache: "no-store",
            }
        )

    }, [])
    useEffect(() => {
        if (getModelOptionResponse.data) {
            form.reset({
                keyName: getModelOptionResponse.data.getModelOption.keyName,
                type: getModelOptionResponse.data.getModelOption.type,
                value: getModelOptionResponse.data.getModelOption.type === "boolean" ? getModelOptionResponse.data.getModelOption.value == "true" : getModelOptionResponse.data.getModelOption.value,
                managed: getModelOptionResponse.data.getModelOption.managed,
            })
        }
        else if (getModelOptionResponse?.error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: getModelOptionResponse.error?.message,
            });
        }

    }, [getModelOptionResponse.data, getModelOptionResponse.error, getModelOptionResponse.loading])
    useEffect(() => {
        if (updateModelOptionResponse.data) {
            toast({
                title: "Successfully updated",
                description: "Successful updated",
            })
           router.back();
        }
        else if (updateModelOptionResponse?.error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: updateModelOptionResponse?.error?.message,
            });
        }
    }, [updateModelOptionResponse])


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {},
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        if (edit == false) {
            createModelOption(
                CreateModelOptionsQuary,
                {
                    "input": {
                        "createdBy": null,
                        "keyName": values?.keyName,
                        "managed": values?.managed,
                        "model": id,
                        "modelName": getCurrentModelResponse.data?.getModel?.name,
                        "type": values?.type,
                        "updatedBy": null,
                        "value": values?.value
                    }
                },
                {
                    cache: "no-store"
                }
            );
        }
        else if (edit == true) {
            updateModelOption(
                UpdateModelOptionQuary,
                {
                    "input": {
                        "createdBy": null,
                        "keyName": values?.keyName,
                        "managed": values?.managed,
                        "type": values?.type,
                        "updatedBy": null,
                        "value": values?.value,
                        "id": modelOptionId
                    }
                },
                {
                    cache: "no-store"
                }
            )
        }
    }
    useEffect(() => {
        if (data) {
        toast({
            titile:"Model Option Created Successfully.",
        }),
        setTimeout(()=>{
            router.back();
        },1000)    

        } else if (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: error?.message,
            })
        }

    }, [data, error, loading])
    // ...

    return (
        <Form {...form}>
              <Toaster/>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
            
                    <FormField
                        control={form.control}
                        name="keyName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>KeyName</FormLabel>
                                <FormControl>
                                    <Input placeholder="KeyName" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="managed"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0 ">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        Managed
                                    </FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Type</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a type of the field" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="string">Text</SelectItem>
                                        <SelectItem value="number">Number</SelectItem>
                                        <SelectItem value="boolean">Boolean</SelectItem>

                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {form.watch("type") !== "boolean" ? (
                        <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Value</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter value" {...field} type={form.watch("type") == "string" ? "text" : "number"} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )
                        :
                        <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center space-x-3 space-y-0 ">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Value</FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                    }
                </div>
                <div className="flex justify-center items-center">
                    <Button
                        type="submit"
                        variant="default"
                        disabled={loading}
                        className="flex justify-center items-center w-fit"
                    >
                       {loading?"loading...":"Submit"}
                    </Button>
                </div>      </form>
        </Form>
    )
}
export default CreatModelOptions