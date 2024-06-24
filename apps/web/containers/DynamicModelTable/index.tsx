"use client"
import { serverFetch } from '@/app/action'
import { useLazyQuery } from '@/app/hook'
import { getlistmodelfields } from '@/app/queries'
import { ModelFieldType } from '@/types'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ColumnDef } from "@tanstack/react-table";
import {
    Button,
    DataTable
} from "@repo/ui";
import { ChevronsUpDown } from 'lucide-react'

const DynamicModelTable = () => {
    const modelName = useParams()?.modelName;
    const [getAllModelFields, { data, loading, error }] = useLazyQuery(serverFetch);
    const [columns, setColumns] = useState<any>();
    useEffect(() => {
        getAllModelFields(
            getlistmodelfields,
            {
                "where": {
                    "modelName": {
                        "is": modelName
                    },
                }
            },
            {
                cache: 'no-store'
            }
        )
    }, [])

    useEffect(() => {
        if (data) {
            const columns: ColumnDef<any>[] = data?.listModelFields?.docs?.map((field: ModelFieldType) => {
                return ({
                    accessorKey: field.fieldName,
                    header: ({ column }) => {
                        return (
                            <Button
                                variant="ghost"
                                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                            >
                                {field.label}
                                <ChevronsUpDown className="ml-2 h-4 w-4" />
                            </Button>
                        );
                    },
                    cell: ({ row }) => <div className="">{row.getValue(field.fieldName)}</div>,
                })
            })
            console.log(columns);
            
            setColumns(columns);
        }
    }, [data, loading, error])

    return (
        <div>
           {columns?.length > 0 && <DataTable
                columns={columns || []}
                loading={loading}
                data={[]}
                filterBy="fieldName"
                text="Create Layout"
                url="layouts/add"
            />}
        </div>
    )
}

export default DynamicModelTable