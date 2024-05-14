"use client";
import { serverFetch } from "@/app/action";
import { useLazyQuery } from "@/app/hook";
import { getlistmodelfields } from "@/app/queries";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { DataTable } from "@repo/ui";
import { permissionColumns } from "@/app/(dashboardLayout)/dashboard/columns";

const ListPermissionContainer = () => {
  const [getAllFields, { data, error, loading }] = useLazyQuery(serverFetch);
  const { id } = useParams();

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
    if(error){
        
    }
  }, [data, error, loading]);
  return (
    <div>
      <DataTable
        columns={permissionColumns}
        data={[{
            id: "123qww",
            modelField: {
                label: "Permission"
            },
            create: false,
            update: true,
            read: true,
            delete: true
        }]}
        filterBy={"modelField.label"}
        text={"Edit"}
        url={"#"}
      />
    </div>
  );
};

export default ListPermissionContainer;
