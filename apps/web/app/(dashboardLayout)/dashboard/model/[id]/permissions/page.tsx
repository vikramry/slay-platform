"use client"
import ListPermissionContainer from '@/containers/ListPermissionsContainer'
import PermissionForm from '@/containers/PermissionForm'
import React, { useState } from 'react'

const page = () => {
  const [fieldLevelAccessFlag, setFieldLevelAccessFlag] = useState(false);
  

  return (
    <div>
      <PermissionForm setFieldLevelAccessFlag={setFieldLevelAccessFlag}/>
      {fieldLevelAccessFlag && <ListPermissionContainer />}
    </div>
  )
}

export default page