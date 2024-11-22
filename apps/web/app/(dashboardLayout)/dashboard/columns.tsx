"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  Checkbox,
  Button,
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  AlertDialog,
  AlertDialogTrigger,
  DeletePopupComp,
  toast,
  useToast,
  Toaster,
} from "@repo/ui";
import { ChevronsUpDown, CircleEllipsis, Trash2 } from "lucide-react";
import {
  ComponentsType,
  FieldOptionsType,
  Layout,
  LayoutStructure,
  Model,
  ModelFieldType,
  ModelOptionType,
  PermissionType,
  ProfileType,
  TabType,
  User,
} from "../../../types";
import Link from "next/link";
import { cache, useContext, useEffect, useState } from "react";
import { useLazyQuery } from "@/app/hook";
import { serverFetch } from "@/app/action";
import {
  DELETE_COMPONENT,
  DELETE_FIELD_OPTION,
  DELETE_LAYOUT,
  DELETE_MODEL,
  DELETE_MODELFIELD,
  DELETE_MODELOPTION,
  DELETE_PROFILE,
  DELETE_STRUCTURE,
  DELETE_TAB,
  DELETE_USER,
} from "@/app/queries";
import { title } from "process";
import { usePathname, useRouter } from "next/navigation";
import { FieldActionContext } from "@/containers/ListPermissionsContainer";
import AssingnProfileUser from "@/containers/AssingnProfileUser";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <CircleEllipsis className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const modelColumns: ColumnDef<Model>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "label",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Label
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("label")}</div>,
  },
  {
    accessorKey: "prefix",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Prefix
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("prefix") || "-"}</div>,
  },
  {
    accessorKey: "key",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Key
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("key") || "-"}</div>,
  },
  {
    accessorKey: "managed",
    header: "Managed",
    cell: ({ row }) => (
      <div className="">
        <Checkbox
          checked={row.getValue("managed")}
          readonly
          aria-label="Select all"
        />
      </div>
    ),
  },
  {
    accessorKey: "createdBy.firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created By
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className=""> {row.original.createdBy?.firstName || "-"}</div>;
    },
  },
  {
    accessorKey: "updatedBy.firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Updated By
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="">{row.original.updatedBy?.firstName || "-"}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
      const { toast } = useToast();
      const [handledeleteModel, { data, loading, error }] =
        useLazyQuery(serverFetch);
      useEffect(() => {
        if (data) {
          toast({
            title: "Model Deleted Successfully.",
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
        if (error) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: error?.message,
          });
        }
      }, [data, loading, error]);

      const handleModelDelete = () => {
        handledeleteModel(
          DELETE_MODEL,
          {
            deleteModelId: row.original.id,
          },
          {
            cache: "no-store",
          }
        );
      };

      return (
        <DropdownMenu>
          <Toaster />
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <CircleEllipsis className="h-4 w-4" />
              {/* <CircleEllipsis className="h-4 w-4" /> */}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy Model ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link
              href={`/dashboard/setup/models/${row.original.id}`}
              className="cursor-pointer"
            >
              <DropdownMenuItem>View Model</DropdownMenuItem>
            </Link>

            <Link
              href={`/dashboard/setup/models/${row.original.id}/edit`}
              className="cursor-pointer"
            >
              <DropdownMenuItem>Update Model</DropdownMenuItem>
            </Link>
            <DropdownMenuLabel>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div className="w-full h-full text-red-500 flex justify-center items-center gap-2 cursor-pointer">
                    <Trash2 size={14} /> Delete Model
                  </div>
                </AlertDialogTrigger>
                <DeletePopupComp
                  inputText={row.original.name}
                  onclick={handleModelDelete}
                  type="MODEL"
                />
              </AlertDialog>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const LayoutColumns: ColumnDef<Layout>[] = [
  {
    accessorKey: "model.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Model Name
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.original.model.name}</div>,
  },
  {
    accessorKey: "profiles",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Profiles
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="">
        {row.original.profiles
          ?.map((profile: ProfileType) => profile.label)
          .join(", ") || "Default"}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "label",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Label
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("label")}</div>,
  },
  {
    accessorKey: "createdBy.firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created By
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className=""> {row.original.createdBy?.firstName || "-"}</div>;
    },
  },
  {
    accessorKey: "updatedBy.firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Updated By
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="">{row.original.updatedBy?.firstName || "-"}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
      const { toast } = useToast();
      const [handledeleteLayout, { data, loading, error }] =
        useLazyQuery(serverFetch);
      useEffect(() => {
        if (data) {
          toast({
            title: "Layout Deleted Successfully.",
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
        if (error) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: error?.message,
          });
        }
      }, [data, loading, error]);

      const handleLayoutDelete = () => {
        handledeleteLayout(
          DELETE_LAYOUT,
          {
            deleteLayoutId: row.original.id,
          },
          {
            cache: "no-store",
          }
        );
      };

      return (
        <DropdownMenu>
          <Toaster />
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <CircleEllipsis className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy Layout ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link
              href={`/dashboard/setup/models/${row.original.model.id}/layouts/${row.original.id}/structures`}
              className="cursor-pointer"
            >
              <DropdownMenuItem>View Layout</DropdownMenuItem>
            </Link>

            <Link
              href={`/dashboard/setup/models/${row.original.model.id}/layouts/${row.original.id}/edit`}
              className="cursor-pointer"
            >
              <DropdownMenuItem>Update Layout</DropdownMenuItem>
            </Link>
            <DropdownMenuLabel>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div className="w-full h-full text-red-500 flex justify-center items-center gap-2 cursor-pointer">
                    <Trash2 size={14} /> Delete Layout
                  </div>
                </AlertDialogTrigger>
                <DeletePopupComp
                  inputText={row.original.name}
                  onclick={handleLayoutDelete}
                  type="LAYOUT"
                />
              </AlertDialog>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const modelFieldColumns: ColumnDef<ModelFieldType>[] = [
  {
    accessorKey: "fieldName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Field Name
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("fieldName")}</div>,
  },
  {
    accessorKey: "label",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Label
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("label")}</div>,
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("type") || "-"}</div>
    ),
  },
  {
    accessorKey: "required",
    header: "Required",
    cell: ({ row }) => (
      <div className="">
        <Checkbox
          checked={row.getValue("required")}
          readonly
          aria-label="Select all"
        />
      </div>
    ),
  },
  {
    accessorKey: "unique",
    header: "Unique",
    cell: ({ row }) => (
      <div className="">
        <Checkbox
          checked={row.getValue("unique")}
          readonly
          aria-label="Select all"
        />
      </div>
    ),
  },
  {
    accessorKey: "managed",
    header: "Managed",
    cell: ({ row }) => (
      <div className="">
        <Checkbox
          checked={row.getValue("managed")}
          readonly
          aria-label="Select all"
        />
      </div>
    ),
  },
  {
    accessorKey: "createdBy.firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created By
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="lowercase"> {row.original.createdBy?.firstName || "-"}</div>
      );
    },
  },
  {
    accessorKey: "updatedBy.firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Updated By
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.original.updatedBy?.firstName || "-"}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      const [handleModelField, { data, loading, error }] =
        useLazyQuery(serverFetch);
      useEffect(() => {
        if (data) {
          toast({
            title: "Model Field Deleted Successfully.",
          });

          window.location.reload();
        }
        if (error) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: error?.message,
          });
        }
      }, [data, loading, error]);

      const handleModelFieldDelete = () => {
        handleModelField(
          DELETE_MODELFIELD,
          {
            deleteModelFieldId: row.original.id,
          },
          {
            cache: "no-store",
          }
        );
      };
      return (
        <DropdownMenu>
          <Toaster />
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <CircleEllipsis className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy Model Field ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link
              href={`${row.original.model.id}/field/${row.original.id}/edit`}
              className="cursor-pointer"
            >
              <DropdownMenuItem>Update Model Field</DropdownMenuItem>
            </Link>
            <Link
              href={`${row.original.model.id}/field/${row.original.id}/options`}
              className="cursor-pointer"
            >
              <DropdownMenuItem>Go to Field Options</DropdownMenuItem>
            </Link>
            <DropdownMenuLabel>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div className="w-full h-full text-red-500 flex justify-center items-center gap-2 cursor-pointer text-xs">
                    <Trash2 size={13} /> Delete Model Field
                  </div>
                </AlertDialogTrigger>
                <DeletePopupComp
                  inputText={row.original.fieldName}
                  onclick={handleModelFieldDelete}
                  type="MODELFIELD"
                />
              </AlertDialog>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const tabsColumns: ColumnDef<TabType>[] = [
  {
    accessorKey: "model.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Model
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.original.model?.name || "-"}</div>
    ),
  },
  {
    accessorKey: "label",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Label
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("label")}</div>,
  },
  {
    accessorKey: "order",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("order") || "-"}</div>
    ),
  },
  {
    accessorKey: "profiles",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Profiles
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="">
        {row.original.profiles
          ?.map((profile: ProfileType) => profile.label)
          .join(", ") || "-"}
      </div>
    ),
  },
  {
    accessorKey: "createdBy.firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created By
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="lowercase"> {row.original.createdBy?.firstName || "-"}</div>
      );
    },
  },
  {
    accessorKey: "updatedBy.firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Updated By
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.original.updatedBy?.firstName || "-"}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
      const [handleDeleteTab, { data, loading, error }] =
        useLazyQuery(serverFetch);
      useEffect(() => {
        if (data) {
          toast({
            title: "Tab Deleted Successfully.",
            description: "Successful Deleted",
          });

          setTimeout(function () {
            window.location.reload();
          }, 2000);
        }
        if (error) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: error?.message,
          });
        }
      }, [data, loading, error]);
      const handleTabDelete = () => {
        handleDeleteTab(
          DELETE_TAB,
          {
            deleteTabId: row.original.id,
          },
          {
            cache: "no-store",
          }
        );
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <CircleEllipsis className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy Tab ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <Link href={`/model/${row.original.id}`} className="cursor-pointer">
              <DropdownMenuItem>View Tab</DropdownMenuItem>
            </Link> */}
            <Link
              href={`/dashboard/setup/tabs/${row.original.id}/edit`}
              className="cursor-pointer"
            >
              <DropdownMenuItem>Edit Tab</DropdownMenuItem>
            </Link>
            <DropdownMenuLabel>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div className="w-full h-full text-red-500 flex justify-center items-center gap-2 cursor-pointer text-xs">
                    <Trash2 size={13} /> Delete Tab
                  </div>
                </AlertDialogTrigger>
                <DeletePopupComp
                  inputText={row.original.label}
                  onclick={handleTabDelete}
                  type="TAB"
                />
              </AlertDialog>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const modelOptionsColumns: ColumnDef<ModelOptionType>[] = [
  {
    accessorKey: "model.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Model
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.original.model?.name || "-"}</div>
    ),
  },
  {
    accessorKey: "keyName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Key Name
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("keyName")}</div>,
  },
  {
    accessorKey: "managed",
    header: "Managed",
    cell: ({ row }) => (
      <div className="">
        <Checkbox
          checked={row.getValue("managed")}
          readonly
          aria-label="Select all"
        />
      </div>
    ),
  },
  {
    accessorKey: "value",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Value
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("value") || "-"}</div>
    ),
  },
  {
    accessorKey: "createdBy.firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created By
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="lowercase"> {row.original.createdBy?.firstName || "-"}</div>
      );
    },
  },
  {
    accessorKey: "updatedBy.firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Updated By
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.original.updatedBy?.firstName || "-"}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
      const [handleDeleteModeloption, { data, loading, error }] =
        useLazyQuery(serverFetch);
      useEffect(() => {
        if (data) {
          toast({
            title: "modeloption Deleted Successfully.",
          });
        }
        if (error) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: error?.message,
          });
        }
      }, [data, loading, error]);
      const handleModeloptionDelete = () => {
        handleDeleteModeloption(
          DELETE_MODELOPTION,
          {
            deleteModelOptionId: row.original.id,
          },
          {
            cache: "no-store",
          }
        );
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <CircleEllipsis className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy Model Options ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link
              href={`options/${row.original.id}/edit`}
              className="cursor-pointer"
            >
              <DropdownMenuItem>Update Model Option</DropdownMenuItem>
            </Link>
            <DropdownMenuLabel>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div className="w-full h-full text-red-500 flex justify-center items-center gap-2 cursor-pointer text-xs">
                    <Trash2 size={13} /> Delete Model Options
                  </div>
                </AlertDialogTrigger>
                <DeletePopupComp
                  inputText={row.original.keyName}
                  onclick={handleModeloptionDelete}
                  type="MODELOPTION"
                />
              </AlertDialog>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const fieldOptionsColumns: ColumnDef<FieldOptionsType>[] = [
  {
    accessorKey: "keyName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Key Name
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.original.keyName || "-"}</div>
    ),
  },
  {
    accessorKey: "modelName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Model Name
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("modelName")}</div>,
  },
  {
    accessorKey: "fieldName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Field Name
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("fieldName")}</div>,
  },
  {
    accessorKey: "managed",
    header: "Managed",
    cell: ({ row }) => (
      <div className="">
        <Checkbox
          checked={row.getValue("managed")}
          readonly
          aria-label="Select all"
        />
      </div>
    ),
  },
  {
    accessorKey: "prefix",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Prefix
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("prefix") || "-"}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
      const [handleDeleteFieldoption, { data, loading, error }] =
        useLazyQuery(serverFetch);
      const { toast } = useToast();
      useEffect(() => {
        if (data) {
          toast({
            title: "Fieldoption Deleted Successfully.",
          }),
            window.location.reload();
        }
        if (error) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: error?.message,
          });
        }
      }, [data, loading, error]);
      const handleFieldoptionDelete = () => {
        handleDeleteFieldoption(
          DELETE_FIELD_OPTION,
          {
            deleteFieldOptionId: row.original.id,
          },
          {
            cache: "no-store",
          }
        );
      };
      return (
        <DropdownMenu>
          <Toaster />
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <CircleEllipsis className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy Tab ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <Link href={`/model/${row.original.id}`} className="cursor-pointer">
              <DropdownMenuItem>View Field Option</DropdownMenuItem>
            </Link> */}
            <Link
              href={`options/${row.original.id}/edit`}
              className="cursor-pointer"
            >
              <DropdownMenuItem>Update Field Option</DropdownMenuItem>
            </Link>
            <DropdownMenuLabel>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div className="w-full h-full text-red-500 flex justify-center items-center gap-2 cursor-pointer text-xs">
                    <Trash2 size={13} /> Delete Field Option
                  </div>
                </AlertDialogTrigger>
                <DeletePopupComp
                  inputText={row.original.keyName}
                  onclick={handleFieldoptionDelete}
                  type="FIELDOPTION"
                />
              </AlertDialog>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const componentsColumns: ColumnDef<ComponentsType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "label",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Label
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("label")}</div>,
  },
  {
    accessorKey: "createdBy.firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created By
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="lowercase"> {row.original.createdBy?.firstName || "-"}</div>
      );
    },
  },
  {
    accessorKey: "updatedBy.firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Updated By
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.original.updatedBy?.firstName || "-"}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
      const [handleDeletecomponent, { data, loading, error }] =
        useLazyQuery(serverFetch);
      useEffect(() => {
        if (data) {
          toast({
            title: "Component Deleted Successfully.",
          });
        }
        if (error) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: error?.message,
          });
        }
      }, [data, loading, error]);
      const handlecomponentDelete = () => {
        handleDeletecomponent(
          DELETE_COMPONENT,
          {
            deleteComponentId: row.original.id,
          },
          {
            cache: "no-store",
          }
        );
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <CircleEllipsis className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy Component ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link
              href={`/dashboard/setup/components/${row.original.id}/edit`}
              className="cursor-pointer"
            >
              <DropdownMenuItem>Update Component</DropdownMenuItem>
            </Link>
            <DropdownMenuLabel>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div className="w-full h-full text-red-500 flex justify-center items-center gap-2 cursor-pointer text-xs">
                    <Trash2 size={13} /> Delete Component
                  </div>
                </AlertDialogTrigger>
                <DeletePopupComp
                  inputText={row.original.name}
                  onclick={handlecomponentDelete}
                  type="COMPONENT"
                />
              </AlertDialog>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          First Name
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("firstName")}</div>,
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Name
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("lastName")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "profile",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Profile
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("profile")?.label || "-"}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      const [handeleDeleteuser, { data, loading, error }] =
        useLazyQuery(serverFetch);

      useEffect(() => {
        if (data) {
          toast({
            title: "User deleted Successfully.",
          }),
            setTimeout(function () {
              window.location.reload();
            }, 2000);
        }
        if (error) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: error?.message,
          });
        }
      }, [data, loading, error]);

      const handleuserDelete = () => {
        handeleDeleteuser(
          DELETE_USER,
          {
            deleteUserId: row.original?.id,
          },
          {
            cache: "no-store",
          }
        );
      };

      return (
        <DropdownMenu>
          <Toaster />
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <CircleEllipsis className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(row.original.id)}
            >
              Copy User ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <Link href={`/model/${row.original.id}`} className="cursor-pointer">
              <DropdownMenuItem>View User</DropdownMenuItem>
            </Link> */}
            <Link
              href={`/dashboard/setup/users/edit?id=${row.original.id}`}
              className="cursor-pointer"
            >
              <DropdownMenuItem>Edit User</DropdownMenuItem>
            </Link>
            <DropdownMenuLabel>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div className="w-full h-full flex justify-start items-center gap-2 cursor-pointer text-sm font-normal">
                    Assign Profile
                  </div>
                </AlertDialogTrigger>

                <AssingnProfileUser userId={row.original.id}/>

              </AlertDialog>
            </DropdownMenuLabel>
            <DropdownMenuLabel>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div className="w-full h-full text-red-500 flex justify-start items-center gap-2 cursor-pointer text-xs">
                    <Trash2 size={13} /> Delete User
                  </div>
                </AlertDialogTrigger>
                <DeletePopupComp
                  inputText={row.original.firstName}
                  onclick={handleuserDelete}
                  type="USER"
                />
              </AlertDialog>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const profileColumns: ColumnDef<ProfileType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "label",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Label
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("label")}</div>,
  },
  {
    accessorKey: "createdBy.firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created By
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className=""> {row.original.createdBy?.firstName || "-"}</div>;
    },
  },
  {
    accessorKey: "updatedBy.firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Updated By
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="">{row.original.updatedBy?.firstName || "-"}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
      const router = useRouter();
      const [handledeleteProfile, { data, loading, error }] =
        useLazyQuery(serverFetch);
      useEffect(() => {
        if (data) {
          toast({
            title: "Profile Deleted Successfully.",
          });
          window.location.reload();
        }
        if (error) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: error?.message,
          });
        }
      }, [data, loading, error]);

      const handleProfileDelete = () => {
        handledeleteProfile(
          DELETE_PROFILE,
          {
            deleteProfileId: row.original.id,
          },

          {
            cache: "no-store",
          }
        );
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <CircleEllipsis className="h-4 w-4" />
              {/* <CircleEllipsis className="h-4 w-4" /> */}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy Profile ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <Link
              href={`/dashboard/setup/profiles/${row.original.id}/edit`}
              className="cursor-pointer"
            >
              <DropdownMenuItem>Update Profile</DropdownMenuItem>
            </Link>
            <DropdownMenuLabel>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div className="w-full h-full text-red-500 flex justify-center items-center gap-2 cursor-pointer">
                    <Trash2 size={14} /> Delete Profile
                  </div>
                </AlertDialogTrigger>
                <DeletePopupComp
                  inputText={row.original.name}
                  onclick={handleProfileDelete}
                  type="PROFILE"
                />
              </AlertDialog>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const permissionColumns: ColumnDef<PermissionType>[] = [
  {
    accessorKey: "modelField.label",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Field Name
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.original.modelField?.label}</div>,
  },
  {
    accessorKey: "create",
    header: "Create",
    cell: ({ row }) => {
      const context = useContext(FieldActionContext);

      return (
        <div className="">
          <Checkbox
            defaultChecked={row.getValue("create")}
            onCheckedChange={(value: boolean) => {
              const newActions = new Map(context.actions);
              const oldValuesIfExists = context.actions.get(
                row.original.id
              ) || {
                create: row.original.create,
                update: row.original.update,
                delete: row.original.delete,
                read: row.original.read,
              };
              newActions.set(row.original.id, {
                read: oldValuesIfExists?.read || false,
                create: value,
                update: oldValuesIfExists?.update || false,
                delete: oldValuesIfExists?.delete || false,
              });
              context.setActions(newActions);
            }}
            aria-label="Select all"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "update",
    header: "Update",
    cell: ({ row }) => {
      const context = useContext(FieldActionContext);

      return (
        <div className="">
          <Checkbox
            defaultChecked={row.getValue("update")}
            onCheckedChange={(value: boolean) => {
              const newActions = new Map(context.actions);
              const oldValuesIfExists = context.actions.get(
                row.original.id
              ) || {
                create: row.original.create,
                update: row.original.update,
                delete: row.original.delete,
                read: row.original.read,
              };
              newActions.set(row.original.id, {
                read: oldValuesIfExists?.read || false,
                create: oldValuesIfExists?.create || false,
                update: value,
                delete: oldValuesIfExists?.delete || false,
              });
              context.setActions(newActions);
            }}
            aria-label="Select all"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "read",
    header: "Read",
    cell: ({ row }) => {
      const context = useContext(FieldActionContext);

      return (
        <div className="">
          <Checkbox
            defaultChecked={row.getValue("read")}
            onCheckedChange={(value: boolean) => {
              const newActions = new Map(context.actions);
              const oldValuesIfExists = context.actions.get(
                row.original.id
              ) || {
                create: row.original.create,
                update: row.original.update,
                delete: row.original.delete,
                read: row.original.read,
              };
              newActions.set(row.original.id, {
                read: value,
                create: oldValuesIfExists?.create || false,
                update: oldValuesIfExists?.read || false,
                delete: oldValuesIfExists?.delete || false,
              });
              context.setActions(newActions);
            }}
            aria-label="Select all"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "delete",
    header: "Delete",
    cell: ({ row }) => {
      const context = useContext(FieldActionContext);

      return (
        <div className="">
          <Checkbox
            defaultChecked={row.getValue("delete")}
            onCheckedChange={(value: boolean) => {
              const newActions = new Map(context.actions);
              const oldValuesIfExists = context.actions.get(
                row.original.id
              ) || {
                create: row.original.create,
                update: row.original.update,
                delete: row.original.delete,
                read: row.original.read,
              };
              newActions.set(row.original.id, {
                read: oldValuesIfExists?.read || false,
                create: oldValuesIfExists?.create || false,
                update: oldValuesIfExists?.update || false,
                delete: value,
              });
              context.setActions(newActions);
            }}
            aria-label="Select all"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "createdBy.firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created By
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className=""> {row.original.createdBy?.firstName || "-"}</div>;
    },
  },
  {
    accessorKey: "updatedBy.firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Updated By
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="">{row.original.updatedBy?.firstName || "-"}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
      const [handledeleteModel, { data, loading, error }] =
        useLazyQuery(serverFetch);
      useEffect(() => {
        if (data) {
          toast({
            title: "Model Deleted Successfully.",
          });
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        }
        if (error) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: error?.message,
          });
        }
      }, [data, loading, error]);

      const handleModelDelete = () => {
        handledeleteModel(
          DELETE_MODEL,
          {
            deleteModelId: row.original.id,
          },
          {
            cache: "no-store",
          }
        );
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <CircleEllipsis className="h-4 w-4" />
              {/* <CircleEllipsis className="h-4 w-4" /> */}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy Field Permission ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const StructureColumns: ColumnDef<LayoutStructure>[] = [
  {
    accessorKey: "order",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("order")}</div>,
  },
  {
    accessorKey: "row",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Row
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("row")}</div>,
  },
  {
    accessorKey: "col",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Col
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("col")}</div>,
  },
  {
    accessorKey: "layout.label",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Layout
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="">{row.original.layout?.label || "-"}</div>
    ),
  },
  {
    accessorKey: "component.label",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Component
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="">{row.original.component.label || "-"}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
      const [handledeleteStructure, { data, loading, error }] =
        useLazyQuery(serverFetch);
      useEffect(() => {
        if (data) {
          toast({
            title: "Model Deleted Successfully.",
          });
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        }
        if (error) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: error?.message,
          });
        }
      }, [data, loading, error]);

      const handleStructureDelete = () => {
        handledeleteStructure(
          DELETE_STRUCTURE,
          {
            deleteLayoutStructureId: row.original.id,
          },
          {
            cache: "no-store",
          }
        );
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <CircleEllipsis className="h-4 w-4" />
              {/* <CircleEllipsis className="h-4 w-4" /> */}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy Structure ID
            </DropdownMenuItem>
            {/* <Link
              href={`/dashboard/setup/models/${row.original.id}`}
              className="cursor-pointer"
            >
              <DropdownMenuItem>View Structure</DropdownMenuItem>
            </Link> */}

            <Link
              href={`structures/${row.original.id}/edit`}
              className="cursor-pointer"
            >
              <DropdownMenuItem>Update Structure</DropdownMenuItem>
            </Link>
            <DropdownMenuLabel>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div className="w-full h-full text-red-500 flex justify-center items-center gap-2 cursor-pointer text-xs">
                    <Trash2 size={13} /> Delete User
                  </div>
                </AlertDialogTrigger>
                <DeletePopupComp
                  inputText={row.original.layout.label}
                  onclick={handleStructureDelete}
                  type="Structure"
                />
              </AlertDialog>
            </DropdownMenuLabel>

          </DropdownMenuContent>

        </DropdownMenu>
      );
    },
  },
];