"use client"
import React, { useEffect, useState } from "react";
import Card from "@repo/ui/card";
import { useLazyQuery } from "./hook";
import { serverFetch } from "./action";
import { LIST_ALL_LAYOUTS_LABELS, LIST_LAYOUT_STRUCTURES } from "./queries";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@repo/ui";
import { Layout } from "@/types";
import App from "@/containers/DynamicComponent";

const LayoutCardTemplate = [
  {
    title: "Card1",
    cols: 2,
    rows: 2,
  },
  {
    title: "Card2",
    cols: 1,
    rows: 2,
  },
  {
    title: "Card3",
    cols: 1,
    rows: 1,
  },
  {
    title: "Card3",
    cols: 2,
    rows: 1,
  },
];

// to make tailwind classes work dynamically
("col-span-1 col-span-2 col-span-3 row-span-1 row-span-2 row-span-3 col-span-4 col-span-5 row-span-4 col-span-5");

const DynamicLayout = () => {
  const [listLayouts, { data, loading, error }] = useLazyQuery(serverFetch);
  const [currentLayout, setCurrentLayout] = useState("");
  const [getCurrentLayoutStructures, getCurrentLayoutStructuresResponse] = useLazyQuery(serverFetch);


  useEffect(() => {
    listLayouts(
      LIST_ALL_LAYOUTS_LABELS,
      {},
      {
        cache: 'no-store'
      }
    )
  }, [])


  useEffect(() => {

  }, [data, error, loading])

  useEffect(()=>{
    if(currentLayout){
      getCurrentLayoutStructures(
        LIST_LAYOUT_STRUCTURES,
        {
          "where": {
            "layout": {
              "is": currentLayout
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
}, [currentLayout])

  useEffect(()=>{
    if(getCurrentLayoutStructuresResponse.data){
      console.log(getCurrentLayoutStructuresResponse.data);
    }
  }, [getCurrentLayoutStructuresResponse.data, getCurrentLayoutStructuresResponse.error, getCurrentLayoutStructuresResponse.loading])
  return (
    <div>
      <div className="py-5">
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
      </div>
      <div className="h-auto w-[100vw - 100px] grid lg:grid-cols-3 gap-2 md:grid-cols-2 grid-cols-1 dark:bg-[#121212] bg-gray-100 p-2">
        {getCurrentLayoutStructuresResponse.data?.listLayoutStructures.docs.map((item: any) => (
          <Card
            classNames={`col-span-${item.col} row-span-${item.row} bg-white`}
          >
            <App jsxString={atob(item.component.code)} onClick={() => console.log("Clicked A button")}/>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DynamicLayout;
