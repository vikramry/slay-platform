"use client";
import { serverFetch } from "@/app/action";
import { useLazyQuery } from "@/app/hook";
import { getlistmodelfields } from "@/app/queries";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import DynamicForm from "./DynamicForm";
import { ModelFieldType } from "@/types";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@repo/ui";

const generateSchema = (metadata: ModelFieldType[]) => {
    const schemaObj: Record<string, any> = {};

    metadata?.forEach((field) => {
        const { fieldName, type, required, enumType,label } = field;

        switch (type) {
            case "string":
                schemaObj[fieldName] = required
                    ? z.string({ required_error: `${label} is required` })
                    : z.string().optional();
                break;

            case "number":
                schemaObj[fieldName] = required
                    ? z.coerce.number({ required_error: `${label} is required` })
                    : z.coerce.number().optional();
                break;

            case "boolean":
                schemaObj[fieldName] = required
                    ? z.boolean({ required_error: `${label} is required` })
                    : z.boolean().optional();
                break;

            case "enum":
                if (enumType === "number") {
                    schemaObj[fieldName] = required
                        ? z.coerce.number({ required_error: `${label} is required` })
                        : z.coerce.number().optional();
                } else if (enumType === "string") {
                    schemaObj[fieldName] = required
                        ? z.string({ required_error: `${label} is required` })
                        : z.string().optional();
                }
                break;
            case "relationship":
                schemaObj[fieldName] = z.string();
                break;

            default:
                break;
        }
    });

    return z.object(schemaObj);
};

const CreateDynamicRecord = () => {
    const router = useRouter();
    const modelName = useParams()?.modelName;
    const [getAllModelFields, { data, loading, error }] =
        useLazyQuery(serverFetch);
    const Create_Query = useMemo(() => {
        return `mutation Create${modelName}($input: ${modelName}Input!) {
            create${modelName}(input: $input) {
              id
            }
          }`;
    }, []);

    const formSchema = generateSchema(data?.listModelFields?.docs);
    type FormSchema = z.infer<typeof formSchema>;

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: data?.listModelFields?.docs.reduce(
            (acc: any, field: ModelFieldType) => {
                acc[field.fieldName] =
                    field.type === "boolean" ? false : field.type == "number" ? 0 : "";
                return acc;
            },
            {} as Record<string, any>
        ),
    });
    useEffect(() => {
        getAllModelFields(
            getlistmodelfields,
            {
                where: {
                    modelName: {
                        is: modelName,
                    },
                },
            },
            {
                cache: "no-store",
            }
        );
    }, []);
    useEffect(() => {
        if (data) {
            console.log(data, "data");
        } else if (error) {
            console.log(error, "error");
        }
    }, [data, loading, error]);
    const [createRecord, createRecordResponse] = useLazyQuery(serverFetch);
    useEffect(() => {
        if (createRecordResponse?.data) {
            console.log(createRecordResponse?.data);
            toast({
                title: "Success",
                description: "Successful created",
            });
            setTimeout(() => {
                router.back();
            }, 2000);
        }
        if (createRecordResponse?.error) {
            console.log(createRecordResponse?.error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: createRecordResponse.error?.message,
            });
        }
    }, [
        createRecordResponse?.data,
        createRecordResponse?.loading,
        createRecordResponse?.error,
    ]);

    const onSubmit: SubmitHandler<FormSchema> = (values) => {
        console.log(values);
        createRecord(
            Create_Query,
            { input: values },
            {
                cache: "no-store",
            }
        );
    };

    return (
        <div>
            <DynamicForm
                handleSubmit={onSubmit}
                modelFields={data?.listModelFields?.docs || []}
                form={form}
                loading={createRecordResponse?.loading}
            />
        </div>
    );
};

export default CreateDynamicRecord;
