"use client"
import { serverFetch } from '@/app/action';
import { useLazyQuery } from '@/app/hook';
import { getlistmodelfields } from '@/app/queries';
import { useParams } from 'next/navigation';
import React, { useEffect, useMemo } from 'react'
import DynamicForm from './DynamicForm';

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

    }, [createRecordResponse?.data, createRecordResponse?.loading, createRecordResponse?.error])
    const handleSubmit = (values: any) => {
        createRecord(
            Create_Query,
            values,
            {
                cache: "no-store"
            }
        )
    }

    return (
        <div>
            <DynamicForm handleSubmit={handleSubmit} modelFields={data?.listModelFields?.docs || []} />
        </div>
    )
}

export default CreateDynamicRecord