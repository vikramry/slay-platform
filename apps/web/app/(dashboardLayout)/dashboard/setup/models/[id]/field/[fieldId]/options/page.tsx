"use client"
import React from 'react'
import { DataTable } from '@repo/ui';
import { fieldOptionsColumns } from '../../../../../columns';
import { FieldOptionsData } from '../../../../../../../../tempData';
import ListFieldOptions from '@/containers/ListFieldOptions';

const page = ({params}: {params: {fieldId: string}}) => {
    console.log(params.fieldId)
//     const url = "http://localhost:3000/dashboard/model/4/field/111/options/add";
// const parts = url.split("/"); // Split the URL by '/'
// const modelIndex = parts.indexOf("model"); // Find the index of "model"
// const modelId = parts[modelIndex + 1]; // Get the next part after "model"

// console.log(modelId);
    return (
        <div>
            <ListFieldOptions/>

        </div>
    )
}

export default page



