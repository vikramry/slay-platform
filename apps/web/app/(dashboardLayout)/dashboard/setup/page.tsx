"use client";
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {
    const router = useRouter();
    useEffect(()=>{
        router.replace('/dashboard/setup/models');
    }, [])
  return (
    <div>Redirecting to models...</div>
  )
}

export default page