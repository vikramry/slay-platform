"use client"
import { serverFetch } from '@/app/action';
import { useLazyQuery } from '@/app/hook';
import { getlistmodelfields } from '@/app/queries';
import { useParams } from 'next/navigation';
import React, { useEffect, useMemo } from 'react'
import DynamicForm from './DynamicForm';
import { ModelFieldType } from '@/types';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const generateSchema = (metadata: ModelFieldType[]) => {
    const schemaObj: Record<string, any> = {};

    metadata?.forEach((field) => {
        switch (field.type) {
            case "string":
                schemaObj[field.fieldName] = z.string().optional();
                break;
            case "number":
                schemaObj[field.fieldName] = z.coerce.number().optional();
                break;

            case "boolean":
                schemaObj[field.fieldName] = z.boolean();
                break;
            default:
                break;
        }
    });

    return z.object(schemaObj);
};

const CreateDynamicRecord = () => {
    const modelName = useParams()?.modelName;
    const [getAllModelFields, { data, loading, error }] =
        useLazyQuery(serverFetch);
    const Create_Query = useMemo(() => {
        return `mutation Create${modelName}($input: ${modelName}Input!) {
            create${modelName}(input: $input) {
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
            console.log(data, "data")

        } else if (error) {
            console.log(error, "error")
        }
    }, [data, loading, error])
    const [createRecord, createRecordResponse] = useLazyQuery(serverFetch);
    useEffect(() => {
        if (createRecordResponse?.data) {
            console.log(createRecordResponse?.data);
        }
        if (createRecordResponse?.error) {
            console.log(createRecordResponse?.error);
        }
    }, [createRecordResponse?.data, createRecordResponse?.loading, createRecordResponse?.error])

    const onSubmit: SubmitHandler<FormSchema> = (values) => {
        console.log(values);
        createRecord(
            Create_Query,
            { input: values },
            {
                cache: "no-store"
            }
        )
    };

    return (
        <div>
            <DynamicForm handleSubmit={onSubmit} modelFields={data?.listModelFields?.docs || []} form={form} />
        </div>
    )
}

export default CreateDynamicRecord