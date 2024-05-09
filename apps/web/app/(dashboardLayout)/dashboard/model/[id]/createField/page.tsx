"use client"
import React from 'react'
import ModelFieldFormContainer from '@/containers/ModelFieldFormContainer'

function page({ params }: { params: { id: string } }) {
  return (
    <div>
      <ModelFieldFormContainer />
    </div>
  )
}

export default page