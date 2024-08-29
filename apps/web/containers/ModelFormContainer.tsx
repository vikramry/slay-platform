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
  Toaster,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem
} from "@repo/ui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLazyQuery } from "@/app/hook";
import { serverFetch } from "@/app/action";
import { CreateModelQuary, GET_MODEL, LIST_ALL_MODEL_FIELDS_ID_NAME_LABEL, UPDATE_MODEL } from "@/app/queries";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ModelFieldType } from "@/types";

const formSchema = z.object({
  name: z.string({
    required_error: "Name is required"
  }),
  label: z.string({
    required_error: "Label is required"
  }),
  key: z.string().optional(),
  managed: z.boolean(),
  prefix: z.string().optional(),
});

const ModelFormContainer = ({ edit = false }: { edit?: boolean }) => {
  const router = useRouter()
  const { id } = useParams();
  const [createModel, { data, loading, error }] = useLazyQuery(serverFetch);
  const [updateModel, updateModelResponse] = useLazyQuery(serverFetch);
  const [getAllModelFields, getAllModelFieldsResponse] = useLazyQuery(serverFetch);
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
      getAllModelFields(
        LIST_ALL_MODEL_FIELDS_ID_NAME_LABEL,
        {
          limit: 10,
          where: {
            "model": {
              "is": id
            }
          }
        }
      )
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
      const Data: any = {
        name: getModelResponse.data.getModel.name,
        label: getModelResponse.data.getModel.label,
        managed: getModelResponse.data.getModel.managed,
        key: getModelResponse.data.getModel.key
      };

      if (getModelResponse.data.getModel.prefix != null) {
        Data.prefix = getModelResponse.data.getModel.prefix;
      }
      form.reset(Data);
    }
    if (getModelResponse.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: getModelResponse.error?.message,
      });
    }
  }, [getModelResponse.data, getModelResponse.error, getModelResponse.loading]);

  useEffect(()=>{
    if(getAllModelFieldsResponse.error){
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: getAllModelFieldsResponse.error?.message,
      });
    }
  }, [getAllModelFieldsResponse.data, getAllModelFieldsResponse.error, getAllModelFields.loading])
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
            "key": values?.key,
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
      router.push("/dashboard/setup/models")
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
      router.push("/dashboard/setup/models")
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
          {edit && <FormField
            control={form.control}
            name="key"
            render={({ field }) => (

              <FormItem>
                <FormLabel>Key</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Model Fields</SelectLabel>
                        {
                          getAllModelFieldsResponse?.data?.listModelFields?.docs.map((item: ModelFieldType) => {
                            return <SelectItem value={item.fieldName}>{item.label}</SelectItem>
                          })
                        }
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />}
          <FormField
            control={form.control}
            name="managed"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 ">
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
            disabled={loading}
            className="flex justify-center items-center w-fit"
          >
            {loading || updateModelResponse?.loading ? "loading..." : "Submit"}

          </Button>
        </div>{" "}
      </form>
    </Form>
  );
};
export default ModelFormContainer;
