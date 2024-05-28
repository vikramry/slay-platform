"use client";
import React, { useEffect } from "react";
import { DataTable, Toaster, useToast } from "@repo/ui";
import { LayoutColumns } from "@/app/(dashboardLayout)/dashboard/columns";
import { useLazyQuery } from "@/app/hook";
import { serverFetch } from "@/app/action";
import { LIST_ALL_LAYOUTS } from "@/app/queries";
import { useParams } from "next/navigation";

const ListLayouts = () => {
  const [getLayouts, { data, loading, error }] = useLazyQuery(serverFetch);
  const { toast } = useToast();
  const { id } = useParams();

  useEffect(() => {
    getLayouts(
      LIST_ALL_LAYOUTS,
      {
        where: {
          model: {
            is: id,
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
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.message,
      });
    }
  }, [data, error, loading]);

  return (
    <div>
      <Toaster />
      <DataTable
        columns={LayoutColumns}
        loading={loading}
        data={data?.listLayouts?.docs || []}
        filterBy="name"
        text="Create Layout"
        url="layouts/add"
      />
    </div>
  );
};

export default ListLayouts;
