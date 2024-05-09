import { serverFetch } from '@/app/action'
import { useLazyQuery } from '@/app/hook'
import { getlistmodelfields } from '@/app/queries'
import { toast } from '@repo/ui'
import React, { useEffect } from 'react'

const listModelfields = () => {
    const[modelFieldslist,{data,loading,error}]=useLazyQuery(serverFetch)
    useEffect(()=>{
        modelFieldslist(
            getlistmodelfields,{
                
                    "where": {
                      "id": {
                        "is": null
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
}
    },[data,loading,error])
  return (
    <div>index</div>
  )
}

export default listModelfields