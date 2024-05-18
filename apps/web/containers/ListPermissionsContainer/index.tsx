"use client";
import { serverFetch } from "@/app/action";
import { useLazyQuery } from "@/app/hook";
import { getlistmodelfields } from "@/app/queries";
import { useParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { DataTable } from "@repo/ui";
import { permissionColumns } from "@/app/(dashboardLayout)/dashboard/columns";
import { ModelFieldType, PermissionType } from "@/types";


const defaultActions = new Map<string, { read: boolean; create: boolean; update: boolean; delete: boolean; }>();

export const FieldActionContext = createContext<{
  actions: Map<string, { read: boolean; create: boolean; update: boolean; delete: boolean; }>;
  setActions: React.Dispatch<React.SetStateAction<Map<string, { read: boolean; create: boolean; update: boolean; delete: boolean; }>>>,
  crudAccess: { read: boolean, create: boolean, update: boolean, delete: boolean }
}>(
  { actions: defaultActions, setActions: () => { }, crudAccess: { create: false, read: false, update: false, delete: false } }
);
const ListPermissionContainer = ({ selectedProfile, crudAccess }: { selectedProfile: string, crudAccess: { create: boolean, delete: boolean, update: boolean, read: boolean } }) => {
  const [getAllFields, { data, error, loading }] = useLazyQuery(serverFetch);
  const { id } = useParams();
  const [modelFields, setModelFields] = useState<PermissionType[]>([]);
  const [actions, setActions] = useState<Map<string, { read: boolean; create: boolean; update: boolean, delete: boolean; }>>(defaultActions);

  useEffect(() => {
    getAllFields(
      getlistmodelfields,
      {
        where: {
          model: {
            is: id,
          },
        },
      },
      {
        cache: "no-store",
      }
    );
  }, []);

  useEffect(() => {
    if (error) {

    }
    if (data) {
      const modifiedFields = data?.listModelFields?.docs.map((field: ModelFieldType) => {
        return {
          id: field.id,
          modelField: field,
          ...crudAccess
        }
      })

      setModelFields(modifiedFields);
    }
  }, [data, error, loading]);


  useEffect(() => {
    console.log(actions);

  }, [actions])
  return (
    <div>
      <FieldActionContext.Provider value={{ actions, setActions, crudAccess }}>
        <DataTable
          columns={permissionColumns}
          data={modelFields || []}
          filterBy={""}
        />
      </FieldActionContext.Provider>
    </div>
  );
};

export default ListPermissionContainer;
