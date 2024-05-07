"use client"
import React from 'react'
import { DataTable } from '@repo/ui';
import { fieldOptionsColumns } from '../../../../../columns';
import { FieldOptionsData } from '../../../../../../../../tempData';

const page = ({params}: {params: {fieldId: string}}) => {
    console.log(params.fieldId)
    return (
        <div>
            <DataTable columns={fieldOptionsColumns} data={FieldOptionsData} text={"Create Field Option"} url={"options/add"}  />

        </div>
    )
}

export default page



