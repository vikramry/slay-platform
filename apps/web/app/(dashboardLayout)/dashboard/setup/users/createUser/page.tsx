import CreateUser from '@/containers/createUser'
import React, { Suspense } from 'react'

function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>

      <div><CreateUser /></div>
    </Suspense>
  )
}

export default page