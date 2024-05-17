"use client"
import ListPermissionContainer from '@/containers/ListPermissionsContainer'
import PermissionForm from '@/containers/PermissionForm'
import React, { useState } from 'react'

const page = () => {
  const [fieldLevelAccessFlag, setFieldLevelAccessFlag] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<string>("");


  return (
    <div>
      <PermissionForm setFieldLevelAccessFlag={setFieldLevelAccessFlag} setSelectedProfile={setSelectedProfile} />
      {fieldLevelAccessFlag && <ListPermissionContainer selectedProfile={selectedProfile}/>}
    </div>
  )
}

export default page