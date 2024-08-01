"use client"
import { serverFetch } from '@/app/action';
import { useLazyQuery } from '@/app/hook';
import { getlistmodelfields } from '@/app/queries';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useMemo } from 'react'
import DynamicForm from './DynamicForm';
import { ModelFieldType } from '@/types';
import { record, z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@repo/ui';

const generateSchema = (metadata: ModelFieldType[]) => {
    const schemaObj: Record<string, any> = {};

    metadata?.forEach((field) => {
        const { fieldName, type, required, enumType } = field;

        switch (type) {
            case "string":
                schemaObj[fieldName] = required
                    ? z.string({ required_error: `${fieldName} is required` })
                    : z.string().optional();
                break;

            case "number":
                schemaObj[fieldName] = required
                    ? z.coerce.number({ required_error: `${fieldName} is required` })
                    : z.coerce.number().optional();
                break;

            case "boolean":
                schemaObj[fieldName] = required
                    ? z.boolean({ required_error: `${fieldName} is required` })
                    : z.boolean().optional();
                break;

            case "enum":
                if (enumType === "number") {
                    schemaObj[fieldName] = required
                        ? z.coerce.number({ required_error: `${fieldName} is required` })
                        : z.coerce.number().optional();
                } else if (enumType === "string") {
                    schemaObj[fieldName] = required
                        ? z.string({ required_error: `${fieldName} is required` })
                        : z.string().optional();
                }
                break;

            case "relationship":
                schemaObj[fieldName] = z.string().optional();
                break;

            default:
                break;
        }
    });

    return z.object(schemaObj);
};

const UpdateDynamicRecord = () => {
    const router = useRouter()

    const modelName = useParams()?.modelName;
    const recordId = useParams()?.recordId;
    const [getAllModelFields, { data, loading, error }] = useLazyQuery(serverFetch);
    const [dynamicGetQuary, DynamicGetQuaryResponse] = useLazyQuery(serverFetch)
    const Update_Query = useMemo(() => {
        return `mutation Update${modelName}($input: update${modelName}Input!) {
            update${modelName}(input: $input) {
              id
            }
          }`
    }, [])


    const formSchema = generateSchema(data?.listModelFields?.docs);
    type FormSchema = z.infer<typeof formSchema>;


    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: data?.listModelFields?.docs.reduce((acc: any, field: ModelFieldType) => {
            acc[field.fieldName] = field.type === "boolean" ? false : field.type == "number" ? 0 : "";
            return acc;
        }, {} as Record<string, any>),
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
            let str = `query Get${modelName}($where: where${modelName}Input!) {
                get${modelName}(where: $where) {
                        id`;
            data?.listModelFields?.docs?.forEach((item: ModelFieldType) => {
                if (item.type === "virtual" || item.type === "relationship") {
                    str += `
                        ${item.fieldName} {
                            id
                        }`;
                    return;
                }
                str += `
                        ${item.fieldName}`;
            });
            str += `
                        }
                }`;
            console.log(str)
            dynamicGetQuary(
                str,
                {
                    "where": {
                        "id": {
                            "is": recordId
                        }
                    }
                }, {
                cache: "no-store",
            }
            )

        }
        if (error) {
            console.log(error, "error")
        }
    }, [data, loading, error])
    const [updateRecord, updateRecordResponse] = useLazyQuery(serverFetch);
    useEffect(() => {
        if (updateRecordResponse?.data) {
            console.log(updateRecordResponse?.data);
            toast({
                title: "Success",
                description: "Successful updated",
            })
            setTimeout(() => {
                router.back()
            }, 2000)
        }
        if (updateRecordResponse?.error) {
            console.log(updateRecordResponse?.error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: updateRecordResponse.error?.message,
            });
        }
    }, [updateRecordResponse?.data, updateRecordResponse?.loading, updateRecordResponse?.error])

    const onSubmit: SubmitHandler<FormSchema> = (values) => {
        values.id = recordId;
        console.log(values);
        updateRecord(
            Update_Query,
            { input: values },
            {
                cache: "no-store"
            }
        )
    };

    useEffect(() => {
        if (DynamicGetQuaryResponse?.data) {
            console.log(DynamicGetQuaryResponse?.data, "dynamic data")
            data.listModelFields?.docs.forEach((item: ModelFieldType) => form.setValue(item.fieldName, DynamicGetQuaryResponse?.data?.[`get${modelName}`]?.[item.fieldName]))
        }
        else if (DynamicGetQuaryResponse?.error) {
            console.log(DynamicGetQuaryResponse?.error)
        }
    }, [DynamicGetQuaryResponse?.data, DynamicGetQuaryResponse?.loading, DynamicGetQuaryResponse?.error])

    return (
        <div>
            <DynamicForm handleSubmit={onSubmit} modelFields={data?.listModelFields?.docs || []} form={form} loading={updateRecordResponse?.loading}
            />
        </div>
    )
}

export default UpdateDynamicRecord