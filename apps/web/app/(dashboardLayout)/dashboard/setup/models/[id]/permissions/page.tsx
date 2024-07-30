"use client"
import ListPermissionContainer from '@/containers/ListPermissionsContainer'
import PermissionForm from '@/containers/PermissionForm'
import React, { useState } from 'react'

const page = () => {
  const [fieldLevelAccessFlag, setFieldLevelAccessFlag] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<string>("");
  const [crudAccess, setCrudAccess] = useState<{ create: boolean, delete: boolean, update: boolean, read: boolean }>({
    create: false,
    delete: false,
    update: false,
    read: false
  })


  return (
    <div>
      <PermissionForm setFieldLevelAccessFlag={setFieldLevelAccessFlag} setSelectedProfile={setSelectedProfile} setCrudAccess={setCrudAccess} />
      {fieldLevelAccessFlag && selectedProfile && <ListPermissionContainer selectedProfile={selectedProfile} crudAccess={crudAccess} />}
    </div>
  )
}

export default page