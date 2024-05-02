"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox, Button, DropdownMenuTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator, AlertDialog, AlertDialogTrigger, DeletePopupComp } from "@repo/ui"
import { ChevronsUpDown, Ellipsis, Trash2 } from 'lucide-react';
import { FieldOptionsType, Model, ModelFieldType, ModelOptionType, TabType } from "../../../types";
import Link from "next/link";
import { useState } from "react";
// import { DeletePopupComp } from "@repo/ui/deletePopupComp";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
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
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <Ellipsis className="h-4 w-4" />
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
      )
    },
  },
]

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
      )
    },
    cell: ({ row }) => (
      <div className="">{row.getValue("name")}</div>
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
      )
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
      )
    },
    cell: ({ row }) => <div className="">{row.getValue("prefix") || "-"}</div>,
  },
  {
    accessorKey: "managed",
    header: "Managed",
    cell: ({ row }) => <div className="">
      <Checkbox
        checked={
          row.getValue("managed")
        }
        readonly
        aria-label="Select all"
      />
    </div>,
  },
  {
    accessorKey: "createdBy.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created By

          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className=""> {row.original.createdBy?.name || "-"}</div>
    },
  },
  {
    accessorKey: "updatedBy.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Updated By
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="">{row.original.updatedBy?.name || "-"}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original
      const handleDelete = () => {
        //delete functionality here
      }
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <Ellipsis className="h-4 w-4" />
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
            <Link href={`/dashboard/model/${row.original.id}`} className="cursor-pointer">
              <DropdownMenuItem>View Model</DropdownMenuItem>
            </Link>
            <DropdownMenuLabel>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div className="w-full h-full text-red-500 flex justify-center items-center gap-2 cursor-pointer">
                    <Trash2 size={14} /> Delete Model
                  </div>
                </AlertDialogTrigger>
                <DeletePopupComp InputText={row.original.name} onclick={handleDelete} />
              </AlertDialog>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

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
      )
    },
    cell: ({ row }) => (
      <div className="">{row.getValue("fieldName")}</div>
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
      )
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
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("type") || "-"}</div>,
  },
  {
    accessorKey: "required",
    header: "Required",
    cell: ({ row }) => <div className="">
      <Checkbox
        checked={
          row.getValue("required")
        }
        readonly
        aria-label="Select all"
      />
    </div>,
  },
  {
    accessorKey: "unique",
    header: "Unique",
    cell: ({ row }) => <div className="">
      <Checkbox
        checked={
          row.getValue("unique")
        }
        readonly
        aria-label="Select all"
      />
    </div>,
  },
  {
    accessorKey: "managed",
    header: "Managed",
    cell: ({ row }) => <div className="">
      <Checkbox
        checked={
          row.getValue("managed")
        }
        readonly
        aria-label="Select all"
      />
    </div>,
  },{
    accessorKey: "createdBy.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created By

          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="lowercase"> {row.original.createdBy?.name || "-"}</div>
    },
  },
  {
    accessorKey: "updatedBy.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Updated By
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.original.updatedBy?.name || "-"}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original
      const handleDelete = () => {
        //delete functionality here
      }
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <Ellipsis className="h-4 w-4" />
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
            <Link href={`${row.original.model.id}/field/${row.original.id}`} className="cursor-pointer">
              <DropdownMenuItem>View Model Field</DropdownMenuItem>
            </Link>
            <Link href={`${row.original.model.id}/field/${row.original.id}/options`} className="cursor-pointer">
              <DropdownMenuItem>Go to Field Options</DropdownMenuItem>
            </Link>
            <DropdownMenuLabel>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div className="w-full h-full text-red-500 flex justify-center items-center gap-2 cursor-pointer text-xs">
                    <Trash2 size={13} /> Delete Model Field
                  </div>
                </AlertDialogTrigger>
                <DeletePopupComp InputText={row.original.fieldName} onclick={handleDelete} />
              </AlertDialog>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

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
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.original.model?.name || "-"}</div>,
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
      )
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
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("order") || "-"}</div>,
  },
  {
    accessorKey: "createdBy.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created By

          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="lowercase"> {row.original.createdBy?.name || "-"}</div>
    },
  },
  {
    accessorKey: "updatedBy.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Updated By
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.original.updatedBy?.name || "-"}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original
      const handleDelete = () => {
        //delete functionality here
      }
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <Ellipsis className="h-4 w-4" />
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
            <Link href={`/model/${row.original.id}`} className="cursor-pointer">
              <DropdownMenuItem>View Tab</DropdownMenuItem>
            </Link>
            <DropdownMenuLabel>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div className="w-full h-full text-red-500 flex justify-center items-center gap-2 cursor-pointer text-xs">
                    <Trash2 size={13} /> Delete Tab
                  </div>
                </AlertDialogTrigger>
                <DeletePopupComp InputText={row.original.label} onclick={handleDelete} />
              </AlertDialog>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

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
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.original.model?.name || "-"}</div>,
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
      )
    },
    cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "managed",
    header: "Managed",
    cell: ({ row }) => <div className="">
      <Checkbox
        checked={
          row.getValue("managed")
        }
        readonly
        aria-label="Select all"
      />
    </div>,
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
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("value") || "-"}</div>,
  },
  {
    accessorKey: "createdBy.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created By

          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="lowercase"> {row.original.createdBy?.name || "-"}</div>
    },
  },
  {
    accessorKey: "updatedBy.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Updated By
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.original.updatedBy?.name || "-"}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original
      const handleDelete = () => {
        //delete functionality here
      }
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <Ellipsis className="h-4 w-4" />
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
            <Link href={`/model/${row.original.id}`} className="cursor-pointer">
              <DropdownMenuItem>View Model Option</DropdownMenuItem>
            </Link>
            <DropdownMenuLabel>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div className="w-full h-full text-red-500 flex justify-center items-center gap-2 cursor-pointer text-xs">
                    <Trash2 size={13} /> Delete Model Options
                  </div>
                </AlertDialogTrigger>
                <DeletePopupComp InputText={row.original.name} onclick={handleDelete} />
              </AlertDialog>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export const fieldOptionsColumns: ColumnDef<FieldOptionsType>[] = [
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
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.original.model?.name || "-"}</div>,
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
      )
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
      )
    },
    cell: ({ row }) => <div className="">{row.getValue("fieldName")}</div>,
  },
  {
    accessorKey: "managed",
    header: "Managed",
    cell: ({ row }) => <div className="">
      <Checkbox
        checked={
          row.getValue("managed")
        }
        readonly
        aria-label="Select all"
      />
    </div>,
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
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("prefix") || "-"}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original
      const handleDelete = () => {
        //delete functionality here
      }
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <Ellipsis className="h-4 w-4" />
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
            <Link href={`/model/${row.original.id}`} className="cursor-pointer">
              <DropdownMenuItem>View Field Option</DropdownMenuItem>
            </Link>
            <DropdownMenuLabel>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div className="w-full h-full text-red-500 flex justify-center items-center gap-2 cursor-pointer text-xs">
                    <Trash2 size={13} /> Delete Field Option
                  </div>
                </AlertDialogTrigger>
                <DeletePopupComp InputText={row.original.name} onclick={handleDelete} />
              </AlertDialog>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]