import { serverFetch } from '@/app/action'
import { useLazyQuery } from '@/app/hook'
import { listcomponents, listusers } from '@/app/queries'
import React, { useEffect } from 'react'

const ListUsers = () => {
    const[listusersdata,{data,loading,error}]=useLazyQuery(serverFetch)

    useEffect(()=>{
        listusersdata(
            listusers,{
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
}if(loading){
    console.log(loading,'checkloading')
}if(error){
    console.log(error,'checkerror')
}
    },[data,loading,error])
  return (
    <div>index</div>
  )
}

export default ListUsers