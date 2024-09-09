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
      listtabs, {
        "offset": 0,
        "limit": 100
      }, {
      cache: 'no-store'
    }
    )
  }, [])


  useEffect(() => {

  }, [data, error, loading])
  useEffect(() => {
    if (ListTabsResponse?.data) {
      console.log(ListTabsResponse?.data, "tabsdata")
      setModelId(ListTabsResponse?.data?.listTabs?.docs[0]?.model?.id)
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
      <div className="h-auto w-[100vw - 100px] grid lg:grid-cols-3 gap-2 md:grid-cols-2 grid-cols-1  dark:bg-black bg-white p-2">
        {getCurrentLayoutStructuresResponse.loading || ListLayoutsResponse?.loading || loading ?
          // Skeleton Loader
          <>
            {[1, 2, 3, 4, 5].map((_, index) => (

              <div role="status" key={index} className="max-w-sm p-4 border border-gray-200 rounded  animate-pulse md:p-6 dark:border-gray-700">
                <div className="flex items-center justify-center h-16 mb-4 bg-gray-300 rounded dark:bg-gray-700">

                </div>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                <div className="flex items-center mt-4">
                  <svg className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                  </svg>
                  <div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                    <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  </div>
                </div>
                <span className="sr-only">Loading...</span>
              </div>))}
          </> :
          <>
            {getCurrentLayoutStructuresResponse.data?.listLayoutStructures.docs.map((item: any) => (
              <Card
                classNames={`col-span-${item.col} bg-white`}
                rows={item.row}
              >
                <App jsxString={decodeURIComponent(escape(atob(item.component.code)))} onClick={() => console.log("Clicked A button")} />
              </Card>
            ))}
          </>}
      </div>
    </div>
  );
};

export default DynamicLayout;
