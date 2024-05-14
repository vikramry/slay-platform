"use client";

import { serverFetch } from "@/app/action";
import { useLazyQuery } from "@/app/hook";
import { CreateModelFieldQuary, GET_MODEL, GET_MODEL_FIELD, LIST_ALL_MODELS_ID_LABEL, LIST_ALL_MODEL_FIELDS_ID_NAME_LABEL, UPDATE_MODEL_FIELD } from "@/app/queries";
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
    Toaster,
    useToast,
} from "@repo/ui";
import { useParams } from "next/navigation";
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
    rounds: z.coerce.number().optional(),
    many: z.boolean()
});

const ModelFieldFormContainer = ({ edit = false }: { edit?: boolean }) => {
    const [createModelField, { data, loading, error }] = useLazyQuery(serverFetch);
    const [updateModelField, updateModelFieldResponse] = useLazyQuery(serverFetch);
    const [getCurrentModel, getCurrentModelResponse] = useLazyQuery(serverFetch);
    const [getModelField, getModelFieldResponse] = useLazyQuery(serverFetch);
    const [getModels, getModelsResponse] = useLazyQuery(serverFetch);
    const [getModelFieldsLocal, getModelFieldsLocalResponse] = useLazyQuery(serverFetch);
    const [getModelFieldsForeign, getModelFieldsForeignResponse] = useLazyQuery(serverFetch);
    const { id, fieldId } = useParams();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            required: false,
            unique: false,
            managed: false,
            enumType: "",
            enumValues: [],
            many: false
        },
    });

    useEffect(() => {
        if (edit)
            getModelField(GET_MODEL_FIELD,
                {
                    "where": {
                        "id": {
                            "is": fieldId
                        }
                    }
                },
                {
                    cache: "no-store"
                }
            )
        getCurrentModel(GET_MODEL, {
            where: {
                id: {
                    is: id
                }
            }
        })

    }, [])


    useEffect(() => {
        if (getModelFieldResponse.data) {
            const data = getModelFieldResponse.data.getModelField;
            
            form.reset({
                default: data?.default,
                enumType: data?.enumType,
                enumValues: data?.enumValues,
                fieldName: data?.fieldName,
                foreignField: data?.foreignField,
                label: data?.label,
                localField: data?.localField,
                managed: data?.managed || false,
                ref: data?.ref,
                required: data?.required || false,
                rounds: data?.rounds,
                type: data?.type,
                unique: data?.unique || false,
                many: data?.many || false
            })

        }

        if (getModelFieldResponse.error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: getModelFieldResponse.error?.message,
            });
        }
    }, [getModelFieldResponse.data, getModelFieldResponse.error, getModelFieldResponse.loading])

    useEffect(() => {
        form.setValue("default", "");
        form.setValue("enumType", "");
        form.setValue("enumValues", []);
        form.setValue("foreignField", "");
        form.setValue("localField", "");
        form.setValue("ref", "");

        if (["relationship", "virtual"].includes(form.watch("type"))) {
            getModels(
                LIST_ALL_MODELS_ID_LABEL,
                {
                    "limit": 50,
                },
                {
                    cache: "no-store"
                }
            )
        }
    }, [form.watch("type")]);

    useEffect(() => {
        if (form.watch("type") == "virtual" && form.watch("ref") != null) {
            getModelFieldsLocal(
                LIST_ALL_MODEL_FIELDS_ID_NAME_LABEL,
                {
                    "limit": 50,
                    "where": {
                        "model": {
                            "is": id
                        }
                    }
                },
                {
                    cache: "no-store"
                }
            )

            getModelFieldsForeign(
                LIST_ALL_MODEL_FIELDS_ID_NAME_LABEL,
                {
                    "limit": 50,
                    "where": {
                        "modelName": {
                            "is": form.watch("ref")
                        }
                    }
                },
                {
                    cache: "no-store"
                }
            )

        }
    }, [form.watch("ref")]);

    useEffect(() => {
        if (getModelFieldsLocalResponse.data) {
            form.setValue("localField", getModelFieldResponse?.data?.getModelField?.localField);
        }
        if (getModelFieldsLocalResponse.error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: getModelFieldsLocalResponse.error?.message,
            });
        }
    }, [getModelFieldsLocalResponse.data, getModelFieldsLocalResponse.error, getModelFieldsLocalResponse.loading]);


    useEffect(() => {

        if (getModelFieldsForeignResponse.data) {
            form.setValue("foreignField", getModelFieldResponse.data?.getModelField?.foreignField);
        }
        if (getModelFieldsForeignResponse.error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: getModelFieldsForeignResponse.error?.message,
            });
        }
    }, [getModelFieldsForeignResponse.data, getModelFieldsForeignResponse.error, getModelFieldsForeignResponse.loading]);

    useEffect(() => {
        if (getModelsResponse.data) {
            form.setValue("ref", getModelFieldResponse.data?.getModelField?.ref);
        }
        if (getModelsResponse.error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: getModelsResponse.error?.message,
            });
        }
    }, [getModelsResponse.data, getModelsResponse.error, getModelsResponse.loading]);

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        if (edit)
            updateModelField(UPDATE_MODEL_FIELD,
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
                        "ref": values?.ref,
                        "required": values?.required,
                        "rounds": values?.rounds,
                        "type": values?.type,
                        "unique": values?.unique,
                        "updatedBy": null,
                        "id": fieldId,
                        "many": values?.many,
                    }
                },
                {
                    cache: "no-store"
                }
            )
        else
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
                        "model": id,
                        "modelName": getCurrentModelResponse.data?.getModel?.name,
                        "ref": values?.ref,
                        "required": values?.required,
                        "rounds": values?.rounds,
                        "type": values?.type,
                        "unique": values?.unique,
                        "updatedBy": null,
                        "many": values?.many,
                    }
                },
                {
                    cache: "no-store"
                }
            );
    }
    useEffect(() => {
        if (data) {
            toast({
                title: "Model Field Created"
            });
        } else if (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: error?.message,
            });
        }
    }, [data, error, loading])
    useEffect(() => {
        if (updateModelFieldResponse.data) {
            toast({
                title: "Model Field Updated"
            });
        } else if (updateModelFieldResponse.error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: updateModelFieldResponse.error?.message,
            });
        }
    }, [updateModelFieldResponse.data, updateModelFieldResponse.error, updateModelFieldResponse.loading])
    return (
        <Form {...form}>
            <Toaster />
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
                                        value={field.value}
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
                    {["number", "string", "float", "decimal128", "enum"].includes(
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

                    <FormField
                        control={form.control}
                        name="rounds"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Rounds</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter Rounds value"
                                        {...field}
                                        type={"number"}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {form.watch("type", "string") === "boolean" && (
                        <FormField
                            control={form.control}
                            name="default"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center space-x-3 space-y-0 ">
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


                    <FormField
                        control={form.control}
                        name="many"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0 ">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>Many</FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />

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
                                            value={field.value}
                                        >
                                            <SelectTrigger className="">
                                                <SelectValue placeholder="Select a Model" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Models</SelectLabel>
                                                    {
                                                        getModelsResponse.data?.listModels?.docs.map((item: any) => <SelectItem key={item.id} value={item.name}>{item.label}</SelectItem>)
                                                    }
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
                                                value={field.value}
                                            >
                                                <SelectTrigger className="">
                                                    <SelectValue placeholder="Select a Local Field" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Fields</SelectLabel>
                                                        <SelectItem value={"_id"}>id</SelectItem>
                                                        {
                                                            getModelFieldsLocalResponse.data?.listModelFields?.docs.map(
                                                                (item: { id: string, fieldName: string, label: string }) =>
                                                                    <SelectItem key={item.id} value={item.fieldName}>{item.label}</SelectItem>
                                                            )
                                                        }
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
                                                value={field.value}
                                            >
                                                <SelectTrigger className="">
                                                    <SelectValue placeholder="Select a Foreign Field" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Fields</SelectLabel>
                                                        <SelectItem value={"_id"}>id</SelectItem>
                                                        {
                                                            getModelFieldsForeignResponse.data?.listModelFields?.docs.map(
                                                                (item: { id: string, fieldName: string, label: string }) =>
                                                                    <SelectItem key={item.id} value={item.fieldName}>{item.label}</SelectItem>
                                                            )
                                                        }
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
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0 ">
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
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0 ">
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
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0 ">
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
export default ModelFieldFormContainer;
