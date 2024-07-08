"use client";
import { serverFetch } from "@/app/action";
import { useLazyQuery } from "@/app/hook";
import {
  GET_MODEL,
  LIST_ALL_LAYOUTS,
  LIST_LAYOUT_STRUCTURES,
  getlistmodelfields,
} from "@/app/queries";
import { Layout, ModelFieldType } from "@/types";
import Card from "@repo/ui/card";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect } from "react";
import App from "../DynamicComponent";

function RecordView() {
  const [ListLayouts, ListLayoutsResponse] = useLazyQuery(serverFetch);
  const [getModel, GetModelResponse] = useLazyQuery(serverFetch);
  const { modelName, recordId } = useParams();
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
      getCurrentLayoutStructures(
        LIST_LAYOUT_STRUCTURES,
        {
          where: {
            layout: {
              is: ListLayoutsResponse?.data?.listLayouts?.docs.find(
                (item: Layout) => item.profiles && item.profiles.length === 0
              )?.id,
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
      let str = `query Get${modelName}($where: where${modelName}Input!) {
            get${modelName}(where: $where) {
                    id`;
      data?.listModelFields?.docs?.forEach((item: ModelFieldType) => {
        if (item.type === "virtual" || item.type === "relationship") {
          str += `
                    ${item.fieldName} {
                        id
                    }`;
          return;
        }
        str += `
                    ${item.fieldName}`;
      });
      str += `
                    }
            }`;
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
      <div className="h-auto w-[100vw - 100px] grid lg:grid-cols-3 gap-2 md:grid-cols-2 grid-cols-1 dark:bg-black bg-white p-2">
        {getCurrentLayoutStructuresResponse.loading || loading ?
          <>
            {[1, 2, 3, 4, 5].map((_, index) => (

              <div role="status" key={index} className="max-w-sm p-4 border border-gray-200 rounded  animate-pulse md:p-6 dark:border-gray-700">
                <div className="flex items-center justify-center h-16 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                  {/* <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
        </svg> */}
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
                    jsxString={atob(item.component.code)}
                    onClick={() => console.log("Clicked A button")}
                    metaData={{ data: DynamicGetQuaryResponse?.data?.[`get${modelName}`] }}
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
