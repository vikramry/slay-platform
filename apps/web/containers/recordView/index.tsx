"use client";
import { serverFetch } from "@/app/action";
import { useLazyQuery } from "@/app/hook";
import {
  GET_DYNAMIC_RECORD_DATA,
  GET_MODEL,
  LIST_ALL_LAYOUTS,
  LIST_LAYOUT_STRUCTURES,
  getlistmodelfields,
} from "@/app/queries";
import { Layout, ModelFieldType } from "@/types";
import Card from "@repo/ui/card";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import App from "../DynamicComponent";
import { getCookie } from "cookies-next";
import { Button } from "@repo/ui";
import DownloadInvoiceContainer from "../downloadInvoiceContainer";
import Updateshippment from "../updateShipment";

function RecordView() {
  const [ListLayouts, ListLayoutsResponse] = useLazyQuery(serverFetch);
  const [getModel, GetModelResponse] = useLazyQuery(serverFetch);
  const { modelName, recordId } = useParams();
  const[openPopUp,setPopUp]=useState(false)
  const [getCurrentLayoutStructures, getCurrentLayoutStructuresResponse] =
    useLazyQuery(serverFetch);
  const [getAllModelFields, { data, loading, error }] =
    useLazyQuery(serverFetch);
  const [dynamicGetQuary, DynamicGetQuaryResponse] = useLazyQuery(serverFetch)
  useEffect(() => {
    getModel(GET_MODEL, {
      where: {
        name: {
          is: modelName,
        },
      },
    });
    getAllModelFields(
      getlistmodelfields,
      {
        where: {
          modelName: {
            is: modelName,
          },
        },
        limit: 200
      },
      {
        cache: "no-store",
      }
    );
  }, [modelName]);
  useEffect(() => {
    if (GetModelResponse?.data) {
      console.log(GetModelResponse?.data);
    } else if (GetModelResponse?.error) {
      console.log(GetModelResponse?.error);
    }
  }, [
    GetModelResponse?.data,
    GetModelResponse?.error,
    GetModelResponse?.loading,
  ]);
  useEffect(() => {
    if (GetModelResponse?.data) {
      ListLayouts(
        LIST_ALL_LAYOUTS,
        {
          where: {
            model: {
              is: GetModelResponse?.data?.getModel?.id,
            },
          },
          limit: 100,
        },
        {
          cache: "no-store",
        }
      );

    }
  }, [GetModelResponse?.data]);

  useEffect(() => {
    if (ListLayoutsResponse?.data) {
      let layoutId = ListLayoutsResponse?.data?.listLayouts?.docs.find(
        (item: Layout) => item.profiles && item.profiles.find(profile => profile.name === getCookie("profile") as string)?.id
      )?.id

      if (!layoutId) {

        layoutId = ListLayoutsResponse?.data?.listLayouts?.docs.find(
          (item: Layout) => item.profiles && item.profiles.length === 0
        )?.id
      }
      getCurrentLayoutStructures(
        LIST_LAYOUT_STRUCTURES,
        {
          where: {
            layout: {
              is: layoutId,
            },
          },
          sort: {
            order: "asc",
          },
        },
        {
          cache: "no-store",
        }
      );
    }
  }, [
    ListLayoutsResponse?.data,
    ListLayoutsResponse?.loading,
    ListLayoutsResponse?.error,
  ]);

  useEffect(() => {
    if (data) {
      (async () => {
        const str = await GET_DYNAMIC_RECORD_DATA(modelName as string, data?.listModelFields?.docs);
        console.log(str)
        dynamicGetQuary(
          str,
          {
            "where": {
              "id": {
                "is": recordId
              }
            }
          }, {
          cache: "no-store",
        }
        )
      })()

    }

  }, [data, loading, error])

  useEffect(() => {
    if (DynamicGetQuaryResponse?.data) {
      console.log(DynamicGetQuaryResponse?.data, "dynamic data")
    }
    else if (DynamicGetQuaryResponse?.error) {
      console.log(DynamicGetQuaryResponse?.error)
    }
  }, [DynamicGetQuaryResponse?.data, DynamicGetQuaryResponse?.loading, DynamicGetQuaryResponse?.error])
  return (
    <div>
        {modelName =="Order" &&   
        <div>

        <DownloadInvoiceContainer recordId={recordId}/>
        </div>}
      <div className="h-auto w-[100vw - 100px] grid lg:grid-cols-3 gap-2 md:grid-cols-2 grid-cols-1 dark:bg-black bg-white p-2">
        
        {getCurrentLayoutStructuresResponse.loading || loading || ListLayoutsResponse?.loading || GetModelResponse?.loading || getCurrentLayoutStructuresResponse.loading || DynamicGetQuaryResponse?.loading ?
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
          </>
          :
          <>
            {getCurrentLayoutStructuresResponse.data?.listLayoutStructures.docs.map(
              (item: any) => (
                <Card
                  classNames={`col-span-${item.col} row-span-${item.row} bg-white`}
                  rows={item.row}
                >
                  <App
                    jsxString={decodeURIComponent(escape(atob(item.component.code)))}
                    onClick={() => console.log("Clicked A button")}
                    metaData={{ recordData: DynamicGetQuaryResponse?.data?.[`get${modelName}`], model: GetModelResponse?.data?.getModel, modelFields: data?.listModelFields?.docs }}
                    managed={item.component?.managed} componentName={item.component?.name}
                  />
                </Card>
              )
            )}
          </>}
      </div>
    </div>
  );
}

export default RecordView;
