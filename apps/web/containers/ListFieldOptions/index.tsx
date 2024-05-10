import { serverFetch } from "@/app/action";
import { useLazyQuery } from "@/app/hook";
import { LIST_FIELD_OPTIONS } from "@/app/queries";
import React, { useEffect, useState } from "react";
import { DataTable } from "@repo/ui";
import { useParams } from "next/navigation";
import { modelFieldColumns } from "@/app/(dashboardLayout)/dashboard/columns";

const ListFieldOptions = () => {
  const [ListFieldOptions, { data, loading, error }] = useLazyQuery(serverFetch);
  const [ListFieldOptionsData, setListFieldOptionsData] = useState([]);
    const { id } = useParams();
  useEffect(() => {
    ListFieldOptions(
      LIST_FIELD_OPTIONS,
      {
        where: {
          modelField: {
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
    if (data) {
      console.log(data, "ListFieldOptionsData");
      setListFieldOptionsData(data?.listFieldOptions?.docs)
    }
    if (loading) {
      console.log(loading, "ListFieldOptionsloading");
    }
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.message,
      });
      console.log(error, "ListFieldOptionserror");
    }
  }, [data, loading, error]);

  
  return(
    <div>
    <DataTable
      columns={modelFieldColumns}
      data={ListFieldOptionsData}
      text={"Create Field Option"}
      url={"options/add"}
    />
  </div>
  )
};

export default ListFieldOptions;
function toast(arg0: { variant: string; title: string; description: any }) {
  throw new Error("Function not implemented.");
}
