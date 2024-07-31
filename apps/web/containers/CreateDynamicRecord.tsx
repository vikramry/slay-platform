"use client"
import { serverFetch } from '@/app/action';
import { useLazyQuery } from '@/app/hook';
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react'

const CreateDynamicRecord = () => {
    const modelName = useParams()?.modelName;
    const Create_Query = useMemo(() => {
        return `mutation Create${modelName}($input: ${modelName}Input!) {
            create${modelName}(input: $input) {
              id
            }
          }`
    }, [])

    const [createRecord, { data, loading, error }] = useLazyQuery(serverFetch);

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

        </div>
    )
}

export default CreateDynamicRecord