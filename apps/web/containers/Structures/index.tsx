"use client";
import React, { useEffect } from "react";
import { DataTable, Toaster, useToast } from "@repo/ui";
import { StructureColumns } from "@/app/(dashboardLayout)/dashboard/columns";
import { useLazyQuery } from "@/app/hook";
import { serverFetch } from "@/app/action";
import { LIST_ALL_LAYOUT_STRUCTURE } from "@/app/queries";
import { useParams } from "next/navigation";

const Structures = () => {
  const [getStructures, { data, loading, error }] = useLazyQuery(serverFetch);
  const { toast } = useToast();
  // const { structureId} = useParams();
  const { id, layoutId } = useParams();

  useEffect(() => {
    getStructures(
      LIST_ALL_LAYOUT_STRUCTURE,
      {
        "where": {
          "layout": {
            "is": layoutId
          }
        }
      },
      {
        cache: "no-store",
      }
    );
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data, "data")
    }
    else if (error) {
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
        columns={StructureColumns}
        loading={loading}
        data={data?.listLayoutStructures?.docs || []}
        filterBy="name"
        text="Create Structure"
        url="structures/add"
      />
    </div>
  );
};

export default Structures;
