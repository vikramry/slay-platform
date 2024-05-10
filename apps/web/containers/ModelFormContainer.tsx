"use client";

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
  useToast,
  Toaster
} from "@repo/ui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLazyQuery } from "@/app/hook";
import { serverFetch } from "@/app/action";
import { CreateModelQuary, GET_MODEL, UPDATE_MODEL } from "@/app/queries";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string({
    required_error: "Name is required"
  }),
  label: z.string({
    required_error: "Label is required"
  }),
  managed: z.boolean(),
  prefix: z.string().nullable(),
});

const ModelFormContainer = ({ edit = false }: { edit?: boolean }) => {
  const router = useRouter()
  const { id } = useParams();
  const [createModel, { data, loading, error }] = useLazyQuery(serverFetch);
  const [updateModel, updateModelResponse] = useLazyQuery(serverFetch);
  const [getModel, getModelResponse] = useLazyQuery(serverFetch);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      managed: false,
    },
  });

  useEffect(() => {
    if (edit) {
      getModel(
        GET_MODEL,
        {
          where: {
            id: {
              is: id,
            },
          },
        },
        {
          cache: "no-store",
        }
      );
    }
  }, []);

  useEffect(() => {
    if (getModelResponse.data) {
      form.reset({
        name: getModelResponse.data.getModel.name,
        label: getModelResponse.data.getModel.label,
        managed: getModelResponse.data.getModel.managed,
        prefix: getModelResponse.data.getModel.prefix,
      });
    }
    if (getModelResponse.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: getModelResponse.error?.message,
      });
    }
  }, [getModelResponse.data, getModelResponse.error, getModelResponse.loading]);
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    if (edit) {
      updateModel(UPDATE_MODEL,
        {
          "input": {
            "id": id,
            "label": values?.label,
            "managed": values?.managed,
            "name": values?.name,
            "prefix": values?.prefix,
            "updatedBy": null
          }
        },
        {
          cache: "no-store"
        }
      )
    }
    else
      createModel(
        CreateModelQuary,
        {
          input: {
            createdBy: null,
            label: values?.label,
            managed: values?.managed,
            name: values?.name,
            prefix: values?.prefix,
            updatedBy: null,
          },
        },
        {
          cache: "no-store",
        }
      );
  }

  useEffect(() => {
    if (data) {
      toast({
        title: "Model Created"
      });
      router.push("/dashboard/model")
    } else if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.message,
      });
    }
  }, [data, loading, error]);

  useEffect(() => {
    if (updateModelResponse.data) {
      toast({
        title: "Model Updated"
      });
      router.push("/dashboard/model")
    }
    if (updateModelResponse.error) {

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: updateModelResponse.error?.message,
      });
    }
  }, [updateModelResponse.data, updateModelResponse.error, updateModelResponse.loading])
  return (
    <Form {...form}>
      <Toaster />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Model name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input placeholder="Model label" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="prefix"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prefix</FormLabel>
                <FormControl>
                  <Input placeholder="Prefix" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="managed"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 ">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Managed</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-center items-center">
          <Button
            type="submit"
            variant="default"
            className="flex justify-center items-center w-fit"
          >
            Submit
          </Button>
        </div>{" "}
      </form>
    </Form>
  );
};
export default ModelFormContainer;