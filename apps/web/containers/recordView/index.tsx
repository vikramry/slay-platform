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
  const { modelName,recordId } = useParams();
  const [getCurrentLayoutStructures, getCurrentLayoutStructuresResponse] =
    useLazyQuery(serverFetch);
    const [getAllModelFields, { data, loading, error }] =
    useLazyQuery(serverFetch);
    const [dynamicGetQuary,DynamicGetQuaryResponse]=useLazyQuery(serverFetch)
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
    if(data){
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
                  },{
                    cache: "no-store",
                  }
            )

    }
  
  }, [data, loading, error])

 useEffect(()=>{
if(DynamicGetQuaryResponse?.data){
    console.log(DynamicGetQuaryResponse?.data,"dynamic data")
}
else if(DynamicGetQuaryResponse?.error){
    console.log(DynamicGetQuaryResponse?.error)
}
 },[DynamicGetQuaryResponse?.data,DynamicGetQuaryResponse?.loading,DynamicGetQuaryResponse?.error])
  return (
    <div>
      <div className="h-auto w-[100vw - 100px] grid lg:grid-cols-3 gap-2 md:grid-cols-2 grid-cols-1 bg-white dark:bg-black bg-gray-100 p-2">
        {getCurrentLayoutStructuresResponse.data?.listLayoutStructures.docs.map(
          (item: any) => (
            <Card
              classNames={`col-span-${item.col} row-span-${item.row} bg-white`}
            >
              <App
                jsxString={atob(item.component.code)}
                onClick={() => console.log("Clicked A button")}
                metaData={{data : DynamicGetQuaryResponse?.data?.[`get${modelName}`]}}
              />
            </Card>
          )
        )}
      </div>
    </div>
  );
}

export default RecordView;
