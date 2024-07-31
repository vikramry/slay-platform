"use client";
import { serverFetch } from "@/app/action";
import { useLazyQuery } from "@/app/hook";
import { getlistmodelfields } from "@/app/queries";
import { ModelFieldType } from "@/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button, Checkbox, DataTable } from "@repo/ui";
import { ChevronsUpDown, Copy, ExternalLink, Pencil } from "lucide-react";
import Link from "next/link";

const DynamicModelTable = () => {
  const modelName = useParams()?.modelName;
  const [getAllModelFields, { data, loading, error }] =
    useLazyQuery(serverFetch);
  const [listModelData, listModelDataResponse] = useLazyQuery(serverFetch);
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
      const columns: ColumnDef<any>[] = data?.listModelFields?.docs?.map(
        (field: ModelFieldType) => {

          switch (field.type) {
            case "string" || "number" || "float":
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
                  <div className="">{field.many ? row.getValue(field.fieldName)?.join(', ') : row.getValue(field.fieldName)}</div>
                ),
              };

            case "relationship" || "virtual":
              return {
                accessorKey: `${field.fieldName}.id`,
                header: ({ column }) => {
                  return (
                    <Button
                      variant="ghost"
                      onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                      }
                    >
                      {field.label}({field.ref})
                      <ChevronsUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  );
                },
                cell: ({ row }) => {
                  if (field.many) {
                    return row.original[field.fieldName]?.map((item: any) => (
                      <Link href={`${item?.id ?
                        `/dashboard/o/${field.ref}/r/${item?.id}`
                        :
                        "#"}`
                      } className="hover:underline">{item?.id || "-"}
                      </Link>
                    ))

                  }
                  else {
                    return <Link href={`${row.original[field.fieldName]?.id ?
                      `/dashboard/o/${field.ref}/r/${row.original[field.fieldName]?.id}`
                      :
                      "#"}`
                    } className="hover:underline">{row.original[field.fieldName]?.id || "-"}
                    </Link>
                  }
                }
              };
            case "boolean":
              return {
                accessorKey: field.fieldName,
                header: field.label,
                cell: ({ row }) => {
                  if (field.many) {
                    return <div className="flex justify-center items-center gap-3 flex-wrap">
                      {row.getValue(field.fieldName)?.map((item: any) => (
                        <div className="">
                          <Checkbox
                            checked={item}
                            readonly
                            aria-label="Select all"
                          />
                        </div>
                      ))}
                    </div>
                  }
                  else {
                    return <div className="">
                      <Checkbox
                        checked={row.getValue(field.fieldName)}
                        readonly
                        aria-label="Select all"
                      />
                    </div>
                  }

                }
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
                    {field.many ? row.getValue(field.fieldName)?.map((item: string) => new Date(item).getTime())?.join(', ') : new Date(row.getValue(field.fieldName)).getTime()}
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
                  <div className="">{field.many ? row.getValue(field.fieldName)?.join(', ') : row.getValue(field.fieldName)}</div>
                ),
              };
          }
        }
      );

      columns.push({
        accessorKey: "action",
        header: ({ column }) => {
          return (
            <Button variant="ghost">
              Action
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="flex justify-start items-center gap-2">
            <Link href={`/dashboard/o/${modelName}/r/${row.original?.id}`}><ExternalLink className="ml-2 h-4 w-4" /></Link>
            <div title="Copy Record ID" className="cursor-pointer" onClick={() => navigator.clipboard.writeText(row.original?.id)}><Copy className="ml-2 h-4 w-4" /></div>
            <Link href={`/dashboard/o/${modelName}/r/${row.original?.id}/edit`}><Pencil className="ml-2 h-4 w-4" /></Link>
          </div>
        ),
      });

      setColumns(columns);
      let str = `query List${modelName}($sort: sort${modelName}Input) {
                    list${modelName}s(sort: $sort) {
                        docs {
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
                        }
                    }`;
      setQuery(str);

      listModelData(
        str,
        {
          sort: {
            createdOn: "desc",
          },
        },
        {
          cache: "no-store",
        }
      );
    }
  }, [data, loading, error]);

  useEffect(() => {
    if (listModelDataResponse.data) {
      console.log(listModelDataResponse.data);
    }

    if (listModelDataResponse.error) {
      console.log(listModelDataResponse.error);
    }
  }, [
    listModelDataResponse.data,
    listModelDataResponse.error,
    listModelDataResponse.loading,
  ]);

  return (
    <div>
      {columns?.length > 0 && (
        <DataTable
          columns={columns || []}
          loading={listModelDataResponse.loading || loading}
          data={listModelDataResponse.data?.[`list${modelName}s`]?.docs || []}
          filterBy="id"
          text={"Create"}
          url={`/dashboard/o/${modelName}/r/create`}
        />
      )}
    </div>
  );
};

export default DynamicModelTable;
