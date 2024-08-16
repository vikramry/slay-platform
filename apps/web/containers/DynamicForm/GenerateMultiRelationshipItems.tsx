import { serverFetch } from '@/app/action'
import { useLazyQuery } from '@/app/hook'
import { GET_DYNAMIC_MODEL_LIST, getlistmodelfields, getModelFieldRefModelKey } from '@/app/queries'
import { ModelFieldType } from '@/types'
import { MultiSelectorItem, MultiSelectorList, SelectGroup, SelectItem, SelectLabel } from '@repo/ui'
import React, { useEffect, useState } from 'react'

const GenerateMultiRelationshipItems = ({ fieldData, form }: { fieldData: ModelFieldType, form: any }) => {
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
            GET_DYNAMIC_MODEL_LIST(fieldData.ref, listModelFieldsResponse?.data?.listModelFields?.docs).then(data => {
                listRecords(
                    data,
                    {
                        sort: {
                            createdOn: "desc",
                        },
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

        <MultiSelectorList>
            {
                data?.[`list${fieldData.ref}s`]?.docs.map((item: any) => {

                    return <MultiSelectorItem value={item.id} title={JSON.stringify(item, null, 4)}>{refKey ? item[refKey] : item.id}</MultiSelectorItem>
                })
            }
        </MultiSelectorList>

    )
}

export default GenerateMultiRelationshipItems