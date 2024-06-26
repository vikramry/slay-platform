"use client"
import React, { useEffect, useState } from "react";
import Card from "@repo/ui/card";
import { useLazyQuery } from "./hook";
import { serverFetch } from "./action";
import { LIST_ALL_LAYOUTS, LIST_ALL_LAYOUTS_LABELS, LIST_LAYOUT_STRUCTURES, listtabs } from "./queries";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@repo/ui";
import { Layout } from "@/types";
import App from "@/containers/DynamicComponent";
import { NavBar } from "@repo/ui/navBar";


// to make tailwind classes work dynamically
("col-span-1 col-span-2 col-span-3 row-span-1 row-span-2 row-span-3 col-span-4 col-span-5 row-span-4 col-span-5");

const DynamicLayout = () => {
  const [listLayouts, { data, loading, error }] = useLazyQuery(serverFetch);
  const [getCurrentLayoutStructures, getCurrentLayoutStructuresResponse] = useLazyQuery(serverFetch);
  const [ListTabs, ListTabsResponse] = useLazyQuery(serverFetch);
  const [ListLayouts, ListLayoutsResponse] = useLazyQuery(serverFetch);

  const [modelId, setModelId] = useState("")
  useEffect(() => {
    listLayouts(
      LIST_ALL_LAYOUTS_LABELS,
      {},
      {
        cache: 'no-store'
      }
    )
    ListTabs(
      listtabs, {}, {
      cache: 'no-store'
    }
    )
  }, [])


  useEffect(() => {

  }, [data, error, loading])
  useEffect(() => {
    if (ListTabsResponse?.data) {
      console.log(ListTabsResponse?.data, "tabsdata")
      setModelId(ListTabsResponse?.data?.listTabs?.docs[0].model?.id)
    }
    else if (ListTabsResponse?.error) {
      console.log(ListTabsResponse?.error)
    }

  }, [ListTabsResponse?.data, ListTabsResponse?.error, ListTabsResponse?.loading])


  useEffect(() => {
    if (modelId) {
      ListLayouts(
        LIST_ALL_LAYOUTS, {
        "where": {
          "model": {
            "is": modelId
          }
        },
        limit: 100
      }, {
        cache: "no-store"
      }

      )
    }
  }, [modelId])
  useEffect(() => {
    if (ListLayoutsResponse?.data) {
      getCurrentLayoutStructures(
        LIST_LAYOUT_STRUCTURES,
        {
          "where": {
            "layout": {
              "is": ListLayoutsResponse?.data?.listLayouts?.docs.find((item: Layout) => item.profiles && item.profiles.length === 0)?.id
            }
          },
          "sort": {
            "order": "asc"
          }
        },
        {
          cache: "no-store"
        }
      )
    }

  }, [ListLayoutsResponse?.data, ListLayoutsResponse?.loading, ListLayoutsResponse?.error])

  useEffect(() => {
    if (getCurrentLayoutStructuresResponse.data) {
      console.log(getCurrentLayoutStructuresResponse.data);
    }
  }, [getCurrentLayoutStructuresResponse.data, getCurrentLayoutStructuresResponse.error, getCurrentLayoutStructuresResponse.loading])
  return (
    <div>
      <NavBar tabsData={ListTabsResponse?.data?.listTabs?.docs} setACTIVETab={setModelId} aCTIVETab={modelId} loading={ListTabsResponse?.loading} />
      {/* <div className="py-5">
        <Select onValueChange={(value: string)=>{setCurrentLayout(value)}} value={currentLayout}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Layout" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Layouts</SelectLabel>
              {
                data?.listLayouts?.docs.map((item: Layout) => <SelectItem value={item.id}>{item.label}</SelectItem>)
              }
            </SelectGroup>
          </SelectContent>
        </Select>
      </div> */}
      <div className="h-auto w-[100vw - 100px] grid lg:grid-cols-3 gap-2 md:grid-cols-2 grid-cols-1 bg-white dark:bg-black bg-gray-100 p-2">
        {getCurrentLayoutStructuresResponse.data?.listLayoutStructures.docs.map((item: any) => (
          <Card
            classNames={`col-span-${item.col} row-span-${item.row} bg-white`}
          >
            <App jsxString={atob(item.component.code)} onClick={() => console.log("Clicked A button")} />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DynamicLayout;
