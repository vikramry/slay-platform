"use client";
import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {

    useEffect(()=>{
        redirect('setup/models');
    }, [])
  return (
    <div>Redirecting to models...</div>
  )
}

export default page