import { serverFetch } from '@/app/action'
import { useLazyQuery } from '@/app/hook'
import {  listtabs } from '@/app/queries'
import React, { useEffect } from 'react'

const ListTabs = () => {
    const[listtabdata,{data,loading,error}]=useLazyQuery(serverFetch)

    useEffect(()=>{
      listtabdata(
            listtabs,{
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

export default ListTabs