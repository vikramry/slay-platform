import { componentsColumns } from "@/app/(dashboardLayout)/dashboard/columns";
import { serverFetch } from "@/app/action";
import { useLazyQuery } from "@/app/hook";
import { listcomponents } from "@/app/queries";
import { DataTable } from "@repo/ui";
import React, { useEffect } from "react";

const ListComponent = () => {
  const [listcomponentsdata, { data, loading, error }] =
    useLazyQuery(serverFetch);

  useEffect(() => {
    listcomponentsdata(
      listcomponents,
      {},
      {
        cache: "no-store",
      }
    );
  }, []);
  useEffect(() => {
    if (data) {
      console.log(data, "checkdata");
    }
    if (error) {
      console.log(error, "checkerror");
    }
  }, [data, loading, error]);
  return (
    <div>
      <DataTable
        columns={componentsColumns}
        filterBy={"name"}
        data={data?.listComponents?.docs || []}
        loading={loading}
        text="Create component"
        url="/dashboard/setup/components/createComponent"
      />
    </div>
  );
};

export default ListComponent;
