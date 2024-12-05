"use client";
import { serverFetch } from "@/app/action";
import { useLazyQuery } from "@/app/hook";
import {
  GET_DYNAMIC_MODEL_LIST,
  getlistmodelfields,
  getModelFieldRefModelKey,
} from "@/app/queries";
import { ModelFieldType } from "@/types";
import { useParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button, Checkbox, DataTable, Popover, PopoverContent, PopoverTrigger, toast, Toaster } from "@repo/ui";
import {
  ChevronsUpDown,
  Copy,
  ExternalLink,
  FileUp,
  Pencil,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { PulseLoader } from "react-spinners";
import _ from "lodash";
import BreadcrumbComp from "../breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Calendar,
} from "@repo/ui";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
const DynamicModelTable = () => {
  const modelName = useParams()?.modelName;
  const [getAllModelFields, { data, loading, error }] =
    useLazyQuery(serverFetch);
  const [listModelData, listModelDataResponse] = useLazyQuery(serverFetch);
  const [DeleteRecordd, DeleteRecorddResponse] = useLazyQuery(serverFetch);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  const [columns, setColumns] = useState<any>();

  useEffect(() => {
    getAllModelFields(
      getlistmodelfields,
      {
        where: {
          modelName: {
            is: modelName,
          },
        },
        limit: 200,
      },
      {
        cache: "no-store",
      }
    );
  }, []);
  const Delete_Query = useMemo(() => {
    return `mutation Delete${modelName}($delete${modelName}Id: ID!) {
  delete${modelName}(id: $delete${modelName}Id)
}`;
  }, []);
  function DeleteRecord(id: string) {
    console.log(id);
    DeleteRecordd(
      Delete_Query,
      {
        [`delete${modelName}Id`]: id,
      },
      {
        cache: "no-store",
      }
    );
  }
  useEffect(() => {
    if (DeleteRecorddResponse?.data) {
      toast({
        title: "Success",
        description: "Successful deleted",
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else if (DeleteRecorddResponse?.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: DeleteRecorddResponse?.error?.message,
      });
    }
  }, [
    DeleteRecorddResponse?.data,
    DeleteRecorddResponse?.loading,
    DeleteRecorddResponse?.error,
  ]);
  useEffect(() => {
    if (data) {
      // console.log(data,"ajScjbxsj")

      (async () => {
        const refKeyMap: Record<string, string> = {};

        for (const field of data?.listModelFields?.docs || []) {
          if (field.type === "relationship" || field.type === "virtual") {
            refKeyMap[field.fieldName] = await getModelFieldRefModelKey(
              field.ref
            );
          }
        }

        const columns: ColumnDef<any>[] = data?.listModelFields?.docs?.map(
          (field: ModelFieldType) => {
            switch (field.type) {
              case "string":
              case "number":
              case "float":
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
                        {_.startCase(field.label)}
                        <ChevronsUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    );
                  },
                  cell: ({ row }) => (
                    <div className="text-wrap break-words max-w-40 line-clamp-6">
                      {field.many
                        ? row.getValue(field.fieldName)?.join(", ")
                        : row.getValue(field.fieldName)}
                    </div>
                  ),
                };

              case "relationship":
              case "virtual":
                return {
                  accessorKey: `${field.fieldName}.id`,
                  header: ({ column }) => {
                    return (
                      <Button
                        variant="ghost"
                        onClick={() =>
                          column.toggleSorting(column.getIsSorted() === "asc")
                        }
                        className="font-bold"
                      >
                        {_.startCase(field.label)}
                        {/* ({field.ref}) */}
                        <ChevronsUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    );
                  },
                  cell: ({ row }) => {
                    if (field.many) {
                      return (
                        <div className="flex justify-center items-center flex-wrap gap-2">
                          {row.original[field.fieldName]?.map((item: any) => (
                            <Link
                              href={`${
                                item?.id
                                  ? `/dashboard/o/${field.ref}/r/${item?.id}`
                                  : "#"
                              }`}
                              className="hover:underline"
                            >
                              {(refKeyMap[field.fieldName] &&
                                item?.[`${refKeyMap[field.fieldName]}`]) ||
                                item?.id ||
                                "-"}
                            </Link>
                          ))}
                        </div>
                      );
                    } else {
                      return (
                        <Link
                          href={`${
                            row.original[field.fieldName]?.id
                              ? `/dashboard/o/${field.ref}/r/${row.original[field.fieldName]?.id}`
                              : "#"
                          }`}
                          className="hover:underline"
                        >
                          {(refKeyMap[field.fieldName] &&
                            row.original[field.fieldName]?.[
                              `${refKeyMap[field.fieldName]}`
                            ]) ||
                            row.original[field.fieldName]?.id ||
                            "-"}
                        </Link>
                      );
                    }
                  },
                };
              case "boolean":
                return {
                  accessorKey: field.fieldName,
                  header: _.startCase(field.label),
                  cell: ({ row }) => {
                    if (field.many) {
                      return (
                        <div className="flex justify-center items-center gap-3 flex-wrap">
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
                      );
                    } else {
                      return (
                        <div className="">
                          <Checkbox
                            checked={row.getValue(field.fieldName)}
                            readonly
                            aria-label="Select all"
                          />
                        </div>
                      );
                    }
                  },
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
                        {_.startCase(field.label)}
                        <ChevronsUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    );
                  },
                  cell: ({ row }) => (
                    <div className="">
                      {field.many
                        ? row
                            .getValue(field.fieldName)
                            ?.map((item: string) =>
                              new Date(item).toLocaleString()
                            )
                            ?.join(", ")
                        : new Date(
                            row.getValue(field.fieldName)
                          ).toLocaleString()}
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
                        {_.startCase(field.label)}
                        <ChevronsUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    );
                  },
                  cell: ({ row }) => (
                    <div className="">
                      {field.many
                        ? row.getValue(field.fieldName)?.join(", ")
                        : row.getValue(field.fieldName)}
                    </div>
                  ),
                };
            }
          }
        );

        columns.push({
          accessorKey: "action",
          header: ({ column }) => {
            return <Button variant="ghost">Action</Button>;
          },
          cell: ({ row }) => (
            <div className="flex justify-start items-center gap-2">
              <Link href={`/dashboard/o/${modelName}/r/${row.original?.id}`}>
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
              {/* <div title="Copy Record URL" className="cursor-pointer" onClick={() => navigator.clipboard.writeText(`${window.location.host}/dashboard/o/${modelName}/r/${row.original?.id}`)}><Copy className="ml-2 h-4 w-4" /></div> */}
              <Link
                href={`/dashboard/o/${modelName}/r/${row.original?.id}/edit`}
              >
                <Pencil className="ml-2 h-4 w-4" />
              </Link>
              <Trash
                className="ml-2 h-4 w-4 cursor-pointer"
                color="#a11212"
                onClick={() => DeleteRecord(row.original?.id)}
              />
            </div>
          ),
        });

        setColumns(columns);
        const str = await GET_DYNAMIC_MODEL_LIST(
          modelName as string,
          data?.listModelFields?.docs
        );
        console.log(str);
        listModelData(
          str,
          {
            sort: {
              createdOn: "desc",
            },
            limit: 1000,
          },
          {
            cache: "no-store",
          }
        );
      })();
    }
  }, [data, loading, error]);

  useEffect(() => {
    if (listModelDataResponse.data) {
      console.log(listModelDataResponse.data, "data11");
    }

    if (listModelDataResponse.error) {
      console.log(listModelDataResponse.error);
    }
  }, [
    listModelDataResponse.data,
    listModelDataResponse.error,
    listModelDataResponse.loading,
  ]);
  console.log(
    data?.listModelFields?.docs[0]?.model?.key || data?.listModelFields?.docs,
    "testing"
  );
  return (
    <div>
      <Toaster />
      <div className="ml-5 mb-4 flex justify-between items-center ">
        <BreadcrumbComp
          breadcrumb={[
            { name: "Dashboard", url: "/dashboard", active: false },
            {
              name: (modelName as string) || "Model",
              url: `/dashboard/o/${modelName}/list`,
              active: true,
            },
          ]}
        />
        {modelName === "Order" && (
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Export</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Export Orders</DialogTitle>
                  <DialogDescription>
                    Select the timeline and export the data into an Excel.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className=
                          {`w-[300px] justify-start text-left font-normal
                          ${!date && "text-muted-foreground"}
                        `}
                      >
                        <CalendarIcon />
                        {date?.from ? (
                          date.to ? (
                            <>
                              {format(date.from, "LLL dd, y")} -{" "}
                              {format(date.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(date.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <DialogFooter>
                  <Button type="submit">Export Orders</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
      {columns?.length > 0 ? (
        <DataTable
          columns={columns || []}
          loading={listModelDataResponse.loading || loading}
          data={listModelDataResponse.data?.[`list${modelName}s`]?.docs || []}
          filterBy={
            data?.listModelFields?.docs[0]?.model?.key ||
            data?.listModelFields?.docs[0]?.fieldName
          }
          text={"Create"}
          url={`/dashboard/o/${modelName}/r/create`}
          filters={modelName == "Order" && true}
          statusFilterData={data?.listModelFields?.docs}
          statusFilter="shipmentStatus"
        />
      ) : (
        <div className="w-screen mx-auto my-auto">
          <PulseLoader color="#817994" />
        </div>
      )}
    </div>
  );
};

export default DynamicModelTable;
