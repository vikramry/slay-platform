"use client";
import { serverFetch } from "@/app/action";
import { useLazyQuery } from "@/app/hook";
import {
  GET_DYNAMIC_MODEL_LIST,
  getlistmodelfields,
  getModelFieldRefModelKey,
  ORDER_EXPORT_QUERY,
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
import { Workbook } from "exceljs";
import FileSaver from "file-saver";
import { addDays, format, subDays } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
const DynamicModelTable = () => {
  const modelName = useParams()?.modelName;
  const [getAllModelFields, { data, loading, error }] =
    useLazyQuery(serverFetch);
  const [listModelData, listModelDataResponse] = useLazyQuery(serverFetch);
  const [DeleteRecordd, DeleteRecorddResponse] = useLazyQuery(serverFetch);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: subDays(new Date(),30),
    to: new Date(),
  });
// console.log(date,"date")
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
  const handleExcelDownload = async () => {
    let res = await serverFetch(
      ORDER_EXPORT_QUERY,
      {
        "startDate": date?.from,
        "endDate": date?.to
      },
      {
        cache: "no-store",
      }
    );

    const workBook = new Workbook();
    workBook.creator = "Slay Admin";
    workBook.created = new Date();
    workBook.modified = new Date();
    workBook.views = [
      {
        x: 0,
        y: 0,
        width: 10000,
        height: 20000,
        firstSheet: 0,
        activeTab: 0,
        visibility: "visible",
      },
    ];

    const customers = workBook.addWorksheet("Orders List", {
      properties: { tabColor: { argb: "00B050" } },
      views: [{ state: "frozen", ySplit: 1 }],
    });

    customers.columns = res.ordersExport.columns.map((column: any) => ({
      header: column.displayName,
      key: column.id,
    }));

    res.ordersExport.orders.forEach((rowData: any) => {
      customers.addRow(rowData);
    });

    workBook.xlsx
      .writeBuffer()
      .then((buffer) => {
        const blob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8",
        });
        FileSaver.saveAs(blob, "Slay_Coffee_Order_List.xlsx");
      })
      .catch((err: any) => {
        console.error("Error generating Excel file:", err);
      });
  };

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
            <Dialog >
              <DialogTrigger asChild>
                <Button variant="outline">Export</Button>
              </DialogTrigger>
              <DialogContent className=" min-w-fit">
                <DialogHeader>
                  <DialogTitle>Export Orders</DialogTitle>
                  <DialogDescription>
                    Select the timeline and export the data into an Excel.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-2">
                   <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                      />
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleExcelDownload}>Export Orders</Button>
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
