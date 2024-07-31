"use client"
import { serverFetch } from '@/app/action';
import { useLazyQuery } from '@/app/hook';
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react'

const UpdateDynamicRecord = () => {
    const modelName = useParams()?.modelName;
    const Update_Query = useMemo(() => {
        return `mutation Update${modelName}($input: update${modelName}Input!) {
            update${modelName}(input: $input) {
              id
            }
          }`
    }, [])

    const [updateRecord, { data, loading, error }] = useLazyQuery(serverFetch);

    const handleSubmit = (values: any) => {
        values.id = useParams().recordId;
        updateRecord(
            Update_Query,
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

export default UpdateDynamicRecord