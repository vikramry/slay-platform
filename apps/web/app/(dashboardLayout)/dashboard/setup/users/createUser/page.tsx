import React, { Suspense } from 'react'
import CreateUser from '../../../../../containers/createUser'

function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>

      <div><CreateUser /></div>
    </Suspense>
  )
}

export default page