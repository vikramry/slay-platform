import { serverFetch } from '@/app/action'
import { useLazyQuery } from '@/app/hook'
import { GET_DYNAMIC_MODEL_LIST, getlistmodelfields, getModelFieldRefModelKey } from '@/app/queries'
import { ModelFieldType } from '@/types'
import { SelectGroup, SelectItem, SelectLabel } from '@repo/ui'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const GenerateRelationshipValues = ({ fieldData, form }: { fieldData: ModelFieldType, form: any }) => {
    const [listRecords, { data, loading, error }] = useLazyQuery(serverFetch);
    const [listModelFields, listModelFieldsResponse] = useLazyQuery(serverFetch);
    const [refKey, setRefKey] = useState("");

    useEffect(() => {
        (async () => {
            const key = await getModelFieldRefModelKey(fieldData.ref);
            setRefKey(key);
        })()
        listModelFields(
            getlistmodelfields,
            {
                where: {
                    modelName: {
                        is: fieldData.ref,
                    },
                },
            },
            {

            }
        )
    }, [])
    useEffect(() => {
        if (listModelFieldsResponse.data) {
            console.log(listModelFieldsResponse.data);

            GET_DYNAMIC_MODEL_LIST(fieldData.ref, listModelFieldsResponse?.data?.listModelFields?.docs).then((str) => {
                listRecords(
                    str,
                    {
                        sort: {
                            createdOn: "desc",
                        },
                        limit: 1000
                    },
                    {

                    }
                )
            })

        }
    }, [listModelFieldsResponse.data, listModelFieldsResponse.error, listModelFieldsResponse.loading])

    useEffect(() => {
        if (data) {
            console.log(form.watch(fieldData.fieldName));

        }
    }, [data])


    return (
        <SelectGroup>
            <SelectLabel>{fieldData.ref}s</SelectLabel>
            {
                data?.[`list${fieldData.ref}s`]?.docs.map((item: any) => {

                    return <SelectItem value={item.id} title={JSON.stringify(item, null, 4)}>{refKey ? item[refKey] : item.id}</SelectItem>
                })
            }
        </SelectGroup>
    )
}

export default GenerateRelationshipValues