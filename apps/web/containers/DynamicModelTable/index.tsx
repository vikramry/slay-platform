"use client";
import { serverFetch } from "@/app/action";
import { useLazyQuery } from "@/app/hook";
import { getlistmodelfields } from "@/app/queries";
import { ModelFieldType } from "@/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button, Checkbox, DataTable } from "@repo/ui";
import { ChevronsUpDown } from "lucide-react";

const DynamicModelTable = () => {
  const modelName = useParams()?.modelName;
  const [getAllModelFields, { data, loading, error }] =
    useLazyQuery(serverFetch);
  const [columns, setColumns] = useState<any>();
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data?.listModelFields?.docs);

      const columns: ColumnDef<any>[] = data?.listModelFields?.docs?.map(
        (field: ModelFieldType) => {
          switch (field.type) {
            case "string" || "number" || "float" || "decimal128":
              return {
                accessorKey: field.fieldName,
                header: ({ column }) => {
                  return (
                    <Button
                      variant="ghost"
                      onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                      }
                    >
                      {field.label}
                      <ChevronsUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  );
                },
                cell: ({ row }) => (
                  <div className="">{row.getValue(field.fieldName)}</div>
                ),
              };
            case "boolean":
              return {
                accessorKey: field.fieldName,
                header: field.label,
                cell: ({ row }) => (
                  <div className="">
                    <Checkbox
                      checked={row.getValue(field.fieldName)}
                      readonly
                      aria-label="Select all"
                    />
                  </div>
                ),
              };
            case "date":
              return {
                accessorKey: field.fieldName,
                header: ({ column }) => {
                  return (
                    <Button
                      variant="ghost"
                      onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                      }
                    >
                      {field.label}
                      <ChevronsUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  );
                },
                cell: ({ row }) => (
                  <div className="">
                    {new Date(row.getValue(field.fieldName)).getTime()}
                  </div>
                ),
              };
            default:
              return {
                accessorKey: field.fieldName,
                header: ({ column }) => {
                  return (
                    <Button
                      variant="ghost"
                      onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                      }
                    >
                      {field.label}
                      <ChevronsUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  );
                },
                cell: ({ row }) => (
                  <div className="">{row.getValue(field.fieldName)}</div>
                ),
              };
          }
        }
      );

      setColumns(columns);
      let str = `query ListModels($sort: sortModelInput) {
                    list${modelName!.toString().charAt(0).toUpperCase() + modelName!.toString().substring(1)}s(sort: $sort) {
                        docs {
                            id`;
      data?.listModelFields?.docs?.forEach((item: ModelFieldType) => {
        if(item.type === "virtual" || item.type === "relationship"){
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
                        }
                    }`;
      setQuery(str);
      console.log(str);
    }
  }, [data, loading, error]);

  return (
    <div>
      {columns?.length > 0 && (
        <DataTable
          columns={columns || []}
          loading={loading}
          data={[]}
          filterBy="fieldName"
          text="Create Layout"
          url="layouts/add"
        />
      )}
    </div>
  );
};

export default DynamicModelTable;
