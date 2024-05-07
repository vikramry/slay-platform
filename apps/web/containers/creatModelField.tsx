"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Checkbox, Form, FormControl, FormDescription,DateTimePicker, FormField, FormItem, FormLabel, FormMessage, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui"
import { useForm } from "react-hook-form"
import { z } from "zod"



const formSchema = z.object({
    fieldName: z.string({
        required_error: "Field Name is required",
      }),
    label: z.string({
        required_error: "Label is required",
      }),
    required: z.boolean(),
    unique: z.boolean(),
    type: z.string({
        required_error: "Type is required",
      }),
    managed: z.boolean(),
    enumType: z.string().optional(),
    enumValues:z.array(z.string()).optional(),
    default:z.any().optional(),
    date:z.any().optional()

})

const CreatModelField = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            required: false,
            unique: false,
             managed: false,
            enumType: "",
            enumValues: []
                },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        const dateString = values.date ? new Date(values.date).toISOString() : null;
        const updatedValues = { ...values, date: dateString };
        console.log(updatedValues);
    }
    // ...

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="fieldName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Field Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Field Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="label"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>label</FormLabel>
                            <FormControl>
                                <Input placeholder="Model label" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a type of the field" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="text">Text</SelectItem>
                                    <SelectItem value="number">Number</SelectItem>
                                    <SelectItem value="checkBox">Boolean</SelectItem>
                                    <SelectItem value="enum">Enum</SelectItem>
                                    <SelectItem value="date">Date</SelectItem>


                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {(form.watch("type") !== "enum" && form.watch("type") !== "date") && (
                    <FormField
                        control={form.control}
                        name="default"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Default Value</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter default value" {...field} type={form.watch("type")} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                {form.watch("type") === "date" && (
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date</FormLabel>
                                <FormControl>
                                <DateTimePicker granularity="second" {...field}/>   
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                {/* {form.watch("type") === "enum" && (
                    <FormField
                        control={form.control}
                        name="default"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Default Value</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter default value" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )} */}
                {form.watch("type") === "enum" && (
                    <FormField
                        control={form.control}
                        name="enumType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Enum Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a enum type " />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="text">Text</SelectItem>
                                        <SelectItem value="number">Number</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}


                {form.watch("type") === "enum" && (
                    <FormField
                        control={form.control}
                        name="enumValues"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Enum Values</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter enum values separated by comma" {...field} onChange={(event) => {
                                            const enumValues = event.target.value.split(",").map((value: string) => value.trim());
                                            field.onChange(enumValues);
                                        }} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                <FormField
                    control={form.control}
                    name="required"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 ">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    Required
                                </FormLabel>
                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="unique"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 ">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    Unique
                                </FormLabel>
                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="managed"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 ">
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

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
export default CreatModelField