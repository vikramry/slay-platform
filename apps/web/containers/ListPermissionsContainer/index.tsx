"use client";
import { serverFetch } from "@/app/action";
import { useLazyQuery } from "@/app/hook";
import { LIST_ALL_FIELD_PERMISSIONS, getlistmodelfields } from "@/app/queries";
import { useParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { DataTable } from "@repo/ui";
import { permissionColumns } from "@/app/(dashboardLayout)/dashboard/columns";
import { ModelFieldType, PermissionType } from "@/types";
import { Button } from "@repo/ui";

const defaultActions = new Map<
  string,
  { read: boolean; create: boolean; update: boolean; delete: boolean }
>();

export const FieldActionContext = createContext<{
  actions: Map<
    string,
    { read: boolean; create: boolean; update: boolean; delete: boolean }
  >;
  setActions: React.Dispatch<
    React.SetStateAction<
      Map<
        string,
        { read: boolean; create: boolean; update: boolean; delete: boolean }
      >
    >
  >;
  crudAccess: {
    read: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
}>({
  actions: defaultActions,
  setActions: () => {},
  crudAccess: { create: false, read: false, update: false, delete: false },
});
const ListPermissionContainer = ({
  selectedProfile,
  crudAccess,
}: {
  selectedProfile: string;
  crudAccess: {
    create: boolean;
    delete: boolean;
    update: boolean;
    read: boolean;
  };
}) => {
  const [getAllFields, { data, error, loading }] = useLazyQuery(serverFetch);
  const [getAllFieldPermissions, getAllFieldPermissionsResponse] =
    useLazyQuery(serverFetch);
  const { id } = useParams();
  const [modelFields, setModelFields] = useState<PermissionType[]>([]);
  const [actions, setActions] =
    useState<
      Map<
        string,
        { read: boolean; create: boolean; update: boolean; delete: boolean }
      >
    >(defaultActions);

  useEffect(() => {
    getAllFieldPermissions(
      LIST_ALL_FIELD_PERMISSIONS,
      {
        where: {
          model: {
            is: id,
          },
          profile: {
            is: selectedProfile,
          },
        },
        limit: 100,
      },
      {
        cache: "no-store",
      }
    );
  }, []);

  useEffect(() => {
    if (getAllFieldPermissionsResponse.data) {
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
    }
  }, [
    getAllFieldPermissionsResponse.data,
    getAllFieldPermissionsResponse.error,
    getAllFieldPermissionsResponse.loading,
  ]);

  useEffect(() => {
    if (error) {
    }
    if (data) {
      const fieldPermissionIds: string[] =
        getAllFieldPermissionsResponse.data?.listFieldPermissions?.docs.map(
          (item: PermissionType) => item?.id
        );
      const modifiedFields =
        getAllFieldPermissionsResponse.data?.listFieldPermissions?.docs.map(
          (item: PermissionType) => {
            return {
              id: item.id,
              modelField: item.modelField,
              read: item.read,
              create: item.create,
              update: item.update,
              delete: item.delete,
            };
          }
        );

      const modifiedFieldsWithModelAccess = data?.listModelFields?.docs
        .map((field: ModelFieldType) => {
          if (!fieldPermissionIds.includes(field.id))
            return {
              id: field.id,
              modelField: field,
              ...crudAccess,
            };
          else return null;
        })
        .filter((item: any) => item !== null);
      console.log([...modifiedFields, ...modifiedFieldsWithModelAccess]);

      setModelFields([...modifiedFields, ...modifiedFieldsWithModelAccess]);
    }
  }, [data, error, loading]);

  const handleTabelUpdate = () => {
    console.log(actions);
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <FieldActionContext.Provider value={{ actions, setActions, crudAccess }}>
        <DataTable
          columns={permissionColumns}
          data={modelFields || []}
          filterBy={""}
        />
      </FieldActionContext.Provider>
      <Button className="mt-5" onClick={handleTabelUpdate}>
        Update Field Level Accessess
      </Button>
    </div>
  );
};

export default ListPermissionContainer;
