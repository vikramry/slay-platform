import { tabsColumns } from "@/app/(dashboardLayout)/dashboard/columns";
import { serverFetch } from "@/app/action";
import { useLazyQuery } from "@/app/hook";
import { listtabs } from "@/app/queries";
import { DataTable } from "@repo/ui";
import React, { useEffect, useState } from "react";

const ListTabs = () => {
  const [listtabdata, { data, loading, error }] = useLazyQuery(serverFetch);
  const [tabsData, setTabsData] = useState([]);

  useEffect(() => {
    listtabdata(
      listtabs,
      {
        "offset": 0,
        "limit": 100
      },
      {
        cache: "no-store",
      }
    );
  }, []);
  useEffect(() => {
    if (data) {
      console.log(data, "checkdata");
      setTabsData(data?.listTabs?.docs);
    }
    if (error) {
      console.log(error, "checkerror");
    }
  }, [data, loading, error]);
  useEffect(() => {
    console.log(tabsData);
  }, [tabsData]);
  return (
    <div>
      <DataTable
        columns={tabsColumns}
        loading={loading}
        data={tabsData}
        filterBy={"label"}
        url="/dashboard/setup/tabs/createTab"
        text="Create tab"
      />
    </div>
  );
};

export default ListTabs;
