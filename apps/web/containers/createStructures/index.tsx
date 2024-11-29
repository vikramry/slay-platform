"use client";

import { serverFetch } from "@/app/action";
import { useLazyQuery } from "@/app/hook";
import {
  CREATE_STRUCTURE,
  CreateTabQuary,
  GET_STRUCTURE,
  GetTabQuary,
  LIST_ALL_MODELS_ID_LABEL,
  LIST_GET_LAYOUTS,
  UPDATE_STRUCTURE,
  UpdateTabQuary,
  listcomponents,
} from "@/app/queries";
import { Layout } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Toaster,
  toast,
} from "@repo/ui";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  order: z.coerce.number(),
  row: z.coerce.number(),
  col: z.coerce.number(),
  layout: z.string(),
  component: z.string(),
});

const CreatStructure = ({ edit = false }: { edit?: boolean }) => {
  const [CreatStructure, { data, loading, error }] = useLazyQuery(serverFetch);
  const [getStructure, getStructureResponse] = useLazyQuery(serverFetch);
  const [updateStructure, updateStructureResponse] = useLazyQuery(serverFetch);
  const [getLayouts, getLayoutsResponse] = useLazyQuery(serverFetch);
  const [ListComponents, ListComponentsResponse] = useLazyQuery(serverFetch);

  const router = useRouter();
  const params = useSearchParams();
  const { id, layoutId, structureId } = useParams();
  const getStructureFun = () => {
    getStructure(
      GET_STRUCTURE,
      {
        where: {
          id: {
            is: structureId,
          },
        },
      },
      {
        cache: "no-store",
      }
    );
  };

  useEffect(() => {
    getLayouts(
      LIST_GET_LAYOUTS,
      {
        where: {
          id: {
            is: layoutId,
          },
        },
      },
      {
        cache: "no-store",
      }
    );
    ListComponents(
      listcomponents,
      {
        limit: 100
      },
      {
        cache: "no-store",
      }
    );

    if (edit) {
      getStructureFun();
    }
  }, []);

  useEffect(() => {
    if (getLayoutsResponse?.data) {
      form.setValue("layout",
        getLayoutsResponse.data.getLayout.label,
      );
    } else if (getLayoutsResponse?.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: getLayoutsResponse.error?.message,
      });
    }
  }, [
    getLayoutsResponse?.data,
    getLayoutsResponse?.error,
    getLayoutsResponse?.loading,
  ]);
  //
  useEffect(() => {
    if (ListComponentsResponse?.data) {
    } else if (getLayoutsResponse?.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: ListComponentsResponse.error?.message,
      });
    }
  }, [
    ListComponentsResponse?.data,
    ListComponentsResponse?.error,
    ListComponentsResponse?.loading,
  ]);

  useEffect(() => {
    if (getStructureResponse.data) {
      console.log(getStructureResponse.data.getLayoutStructure.component?.id, "asdfghjkytrewasdfg");
      form.reset({
        row: +getStructureResponse.data.getLayoutStructure.row,
        col: +getStructureResponse.data.getLayoutStructure.col,
        order: +getStructureResponse.data.getLayoutStructure.order,
        component: getStructureResponse.data.getLayoutStructure.component?.id,
        layout: getStructureResponse.data.getLayoutStructure.layout.label,
      });
    } else if (getStructureResponse.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: getStructureResponse.error?.message,
      });
    }
  }, [
    getStructureResponse?.data,
    getStructureResponse?.loading,
    getStructureResponse?.error,
  ]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      col: 0,
      row: 0,
      order: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (edit == false) {
      CreatStructure(
        CREATE_STRUCTURE,
        {
          input: {
            col: values?.col,
            component: values?.component,
            layout: layoutId,
            order: values?.order,
            row: values?.row,
          },
        },
        {
          cache: "no-store",
        }
      );
    } else if (edit == true) {
      updateStructure(
        UPDATE_STRUCTURE,
        {
          input: {
            col: values?.col,
            component: values?.component,
            id: structureId,
            layout: layoutId,
            order: values?.order,
            row: values?.row,
          },
        },
        {
          cache: "no-store",
        }
      );
    }
  }

  useEffect(() => {
    if (data) {
      toast({
        title: "Success",
        description: "Successful created",
      });
      router.back();
    } else if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.message,
      });
    }
  }, [data, loading, error]);

  useEffect(() => {
    if (updateStructureResponse.data) {
      toast({
        title: "Success upadated",
        description: "Successful updated",
      });
      setTimeout(function () {
        router.back();
      }, 2000);
    } else if (updateStructureResponse?.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: updateStructureResponse?.error?.message,
      });
    }
  }, [
    updateStructureResponse?.data,
    updateStructureResponse?.error,
    updateStructureResponse?.loading,
  ]);
  // ...

  return (
    <Form {...form}>
      <Toaster />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          <FormField
            control={form.control}
            name="row"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Row</FormLabel>
                <FormControl>
                  <Input placeholder="Row" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="order"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order</FormLabel>
                <FormControl>
                  <Input placeholder="Order" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="col"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Col</FormLabel>
                <FormControl>
                  <Input placeholder="Col" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="layout"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Layout</FormLabel>
                <FormControl>
                  <Input placeholder="Layout" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="component"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Component</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select a Component" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Component</SelectLabel>
                        {ListComponentsResponse?.data?.listComponents?.docs.map(
                          (item: any) => {
                            return (
                              <SelectItem value={item?.id}>
                                {item?.label}
                              </SelectItem>
                            );
                          }
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-center items-center">
          <Button
            type="submit"
            variant="default"
            disabled={loading}
            className="flex justify-center items-center w-fit"
          >
            {loading ||updateStructureResponse?.loading ? "loading..." : "Submit"}
          </Button>
        </div>{" "}
      </form>
    </Form>
  );
};
export default CreatStructure;
