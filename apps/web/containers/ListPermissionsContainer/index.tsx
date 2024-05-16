"use client";
import { serverFetch } from "@/app/action";
import { useLazyQuery } from "@/app/hook";
import { getlistmodelfields } from "@/app/queries";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { DataTable } from "@repo/ui";
import { permissionColumns } from "@/app/(dashboardLayout)/dashboard/columns";
import { ModelFieldType, PermissionType } from "@/types";

const ListPermissionContainer = () => {
  const [getAllFields, { data, error, loading }] = useLazyQuery(serverFetch);
  const { id } = useParams();
  const [modelFields, setModelFields] = useState<PermissionType[]>([]);

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
      
      <DataTable
        columns={permissionColumns}
        data={modelFields || []}
        filterBy={""}
        text={"Edit"}
        url={"#"}
      />
    </div>
  );
};

export default ListPermissionContainer;
