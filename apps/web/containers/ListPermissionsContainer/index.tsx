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

export const FieldActionContext = createContext<{ actions: Map<string, { read: boolean; create: boolean; update: boolean; delete: boolean; }>; setActions: React.Dispatch<React.SetStateAction<Map<string, { read: boolean; create: boolean; update: boolean; delete: boolean; }>>> }>(
  { actions: defaultActions, setActions: () => { } }
);
const ListPermissionContainer = ({ selectedProfile }: { selectedProfile: string }) => {
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
          create: true,
          read: true,
          delete: true,
          update: true,
        }
      })

      setModelFields(modifiedFields);
    }
  }, [data, error, loading]);
  return (
    <div>
      <FieldActionContext.Provider value={{ actions, setActions }}>
        <DataTable
          columns={permissionColumns}
          data={modelFields || []}
          filterBy={""}
          text={"Edit"}
          url={"#"}
        />
      </FieldActionContext.Provider>
    </div>
  );
};

export default ListPermissionContainer;


export const setActionFromTable = (id: string, accessType: "CREATE" | "READ" | "UPDATE" | "DELETE", value: boolean) => {
  const context = useContext(FieldActionContext);
  // context.setActions(action);
  console.log(id, "     ", accessType, "     ", value);

}