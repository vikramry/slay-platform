"use client"
import React from 'react'
import CreatModelField from '../../../../../../containers/creatModelField'

function page({params}: {params: {id: string}}) {
  console.log(params.id)


  return (
    <div>
        <CreatModelField/>
    </div>
  )
}

export default page