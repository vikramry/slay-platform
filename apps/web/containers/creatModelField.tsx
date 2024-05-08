"use client";

import { serverFetch } from "@/app/action";
import { useLazyQuery } from "@/app/hook";
import { CreateModelFieldQuary } from "@/app/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button,
    Checkbox,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    DateTimePicker,
    SelectLabel,
    SelectGroup,
} from "@repo/ui";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    fieldName: z.string({
        required_error: "Field Name is required",
    }),
    label: z.string({
        required_error: "Label is required",
    }),
    required: z.boolean(),
    unique: z.boolean(),
    type: z.enum([
        "number",
        "string",
        "boolean",
        "date",
        "enum",
        "relationship",
        "float",
        "decimal128",
        "virtual",
    ]),
    managed: z.boolean(),
    enumType: z.string().optional(),
    enumValues: z.array(z.string()).optional(),
    default: z.any().optional(),
    ref: z.string().optional(),
    localField: z.string().optional(),
    foreignField: z.string().optional(),
});

const CreatModelField = () => {
  const [createModelField,{ data, loading, error }] = useLazyQuery(serverFetch);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            required: false,
            unique: false,
            managed: false,
            enumType: "",
            enumValues: [],
        },
    });

    useEffect(() => {
        form.setValue("default", "");
        form.setValue("enumType", "");
        form.setValue("enumValues", []);
        form.setValue("foreignField", "");
        form.setValue("localField", "");
        form.setValue("ref", "");
    }, [form.watch("type")]);

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        createModelField(
            CreateModelFieldQuary,
            {
                "input": {
                  "createdBy": null,
                  "default": values?.default,
                  "enumType": values?.enumType,
                  "enumValues": values?.enumValues,
                  "fieldName": values?.fieldName,
                  "foreignField": values?.foreignField,
                  "label": values?.label,
                  "localField": values?.localField,
                  "managed": values?.managed,
                  "model": null,
                  "modelName": null,
                  "ref": values?.ref,
                  "required": values?.required,
                  "rounds": null,
                  "type": values?.type,
                  "unique": values?.unique,
                  "updatedBy": null
                }
              },
            {
                cache: "no-store"
            }
        );
    }
    useEffect(() => {
    if(data){

    }else if(error){
        
    }
    }, [data,error,loading])
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
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
                                <FormLabel>Label</FormLabel>
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
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger className="">
                                            <SelectValue placeholder="Select a type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Types</SelectLabel>
                                                <SelectItem value="string">String</SelectItem>
                                                <SelectItem value="number">Number</SelectItem>
                                                <SelectItem value="boolean">Boolean</SelectItem>
                                                <SelectItem value="enum">Enum</SelectItem>
                                                <SelectItem value="date">Date</SelectItem>
                                                <SelectItem value="relationship">Relationship</SelectItem>
                                                <SelectItem value="virtual">Virtual</SelectItem>
                                                <SelectItem value="float">Float</SelectItem>
                                                <SelectItem value="decimal128">Decimal128</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {["number", "string", "float", "decimal128"].includes(
                        form.watch("type")
                    ) && (
                            <FormField
                                control={form.control}
                                name="default"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Default Value</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter default value"
                                                {...field}
                                                type={form.watch("type") === "string" ? "text" : "number"}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                    {form.watch("type", "string") === "boolean" && (
                        <FormField
                            control={form.control}
                            name="default"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 ">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Default Value</FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                    )}

                    {["relationship", "virtual"].includes(form.watch("type", "string")) && (
                        <FormField
                            control={form.control}
                            name="ref"
                            render={({ field }) => (
                                <FormItem className="">
                                    <FormLabel>Reference Model</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger className="">
                                                <SelectValue placeholder="Select a Model" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Models</SelectLabel>
                                                    <SelectItem value="1234213242">Model1</SelectItem>
                                                    <SelectItem value="123421324122">Model2</SelectItem>
                                                    <SelectItem value="12342132123">Model3</SelectItem>
                                                    <SelectItem value="1234216783">Model4</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    )}

                    {["virtual"].includes(form.watch("type", "string")) && (
                        <>
                            <FormField
                                control={form.control}
                                name="localField"
                                render={({ field }) => (
                                    <FormItem className="">
                                        <FormLabel>Local Field</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger className="">
                                                    <SelectValue placeholder="Select a Local Field" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Fields</SelectLabel>
                                                        <SelectItem value="_id">Id</SelectItem>
                                                        <SelectItem value="name">Name</SelectItem>
                                                        <SelectItem value="email">Email</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="foreignField"
                                render={({ field }) => (
                                    <FormItem className="">
                                        <FormLabel>Foreign Field</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger className="">
                                                    <SelectValue placeholder="Select a Foreign Field" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Fields</SelectLabel>
                                                        <SelectItem value="_id">Id</SelectItem>
                                                        <SelectItem value="name">Name</SelectItem>
                                                        <SelectItem value="email">Email</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </>
                    )}

                    {form.watch("type") === "date" && (
                        <FormField
                            control={form.control}
                            name="default"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Default Value</FormLabel>
                                    <FormControl>
                                        <DateTimePicker
                                            granularity="second"
                                            hourCycle={12}
                                            jsDate={field.value}
                                            onJsDateChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}

                    {form.watch("type") === "enum" && (
                        <>
                            <FormField
                                control={form.control}
                                name="enumType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Enum Type</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a enum type " />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="string">String</SelectItem>
                                                <SelectItem value="number">Number</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="enumValues"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Enum Values</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter enum values separated by comma"
                                                {...field}
                                                type="text"
                                                onChange={(event) => {
                                                    const enumValues = event.target.value
                                                        .split(",")
                                                        .map((value: string) => {
                                                            if (form.watch("enumType") === "number") {
                                                                return isNaN(Number(value.trim()))
                                                                    ? null
                                                                    : value.trim();
                                                            } else {
                                                                return value.trim();
                                                            }
                                                        })
                                                        .filter((value: any) => {
                                                            if (form.watch("enumType") === "number") {
                                                                return value !== null;
                                                            }
                                                            return true;
                                                        });
                                                    console.log(enumValues);

                                                    field.onChange(enumValues);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
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
                                    <FormLabel>Required</FormLabel>
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
                                    <FormLabel>Unique</FormLabel>
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
                                    <FormLabel>Managed</FormLabel>
                                </div>
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
                </div>
            </form>
        </Form>
    );
};
export default CreatModelField;
