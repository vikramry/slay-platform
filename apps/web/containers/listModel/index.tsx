"use client"
import { serverFetch } from '@/app/action';
import { useLazyQuery } from '@/app/hook'
import { getlistmodels } from '@/app/queries';
import React, { useEffect } from 'react'

const ListModels = () => {
   const[modellist,{data,loading,error}]=useLazyQuery(serverFetch);
   useEffect(()=>{
    modellist(
        getlistmodels,
        {},{
            cache:"no-store",
          }
    )

   },[])

   useEffect(()=>{
    if(data){
        console.log(data,'checkdata')
       }
       else if(error){
        console.log(error,'checkerror')
       }
   },[data,loading,error])

  return (
    <div>index</div>
  )
}

export default ListModels