import { modelFieldColumns } from '@/app/(dashboardLayout)/dashboard/columns'
import { serverFetch } from '@/app/action'
import { useLazyQuery } from '@/app/hook'
import { getlistmodelfields } from '@/app/queries'
import { DataTable } from '@repo/ui'
import { toast } from '@repo/ui'
import { useParams, usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const ListModelfields = () => {
    const[modelFieldslist,{data,loading,error}]=useLazyQuery(serverFetch)
const [modelFieldData,setModelFieldData]=useState([])
const {id} =useParams()
    useEffect(()=>{
        modelFieldslist(
            getlistmodelfields,{
                
                    "where": {
                      "model": {
                        "is": id
                      }
                    }
                  
            },{
                cache:"no-store",
            }
        )
    },[])

    useEffect(()=>{
if(data){
    console.log(data,'checkdata')
    setModelFieldData(data?.listModelFields?.docs)
}
    if(loading){
        console.log(loading,'checkloading')
    }if(error){
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: error?.message,
          })
        console.log(error,'checkerror')
    }

    },[data,loading,error])
    useEffect(()=>{
      console.log(modelFieldData)
          },[modelFieldData])
  return (
    <div>
            <DataTable columns={modelFieldColumns} data={modelFieldData} text="Create Model Field" url={`${useParams()?.id}/createField`}/>

    </div>
  )
}

export default ListModelfields