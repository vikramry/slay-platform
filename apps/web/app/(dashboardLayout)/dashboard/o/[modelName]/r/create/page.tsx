import CreateDynamicRecord from '@/containers/CreateDynamicRecord'
import React from 'react'

interface FieldMetadata {
    name: string;
    type: string;
    label: string;
  }
  const metadata: FieldMetadata[] = [
    { name: "firstName", type: "text", label: "First Name" },
    { name: "lastName", type: "text", label: "Last Name" },
    { name: "age", type: "number", label: "Age" },
    { name: "email", type: "email", label: "Email" },
    { name: "isAdmin", type: "checkbox", label: "Admin" },
  ];
const page = () => {
      
    return (
        <div>
            <CreateDynamicRecord />
        </div>
    )
}

export default page