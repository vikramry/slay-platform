"use client";

import { serverFetch } from "@/app/action";
import { useLazyQuery } from "@/app/hook";
import {
  CREATE_COMPONENT,
  GET_COMPONENT,
  UPDATE_COMPONENT,
} from "@/app/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@monaco-editor/react";
import {
  Button,
  Checkbox,
  Form,
  FormControl,
  Textarea,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectContent,
  SelectLabel,
  SelectItem,
  useToast,
  Toaster,
} from "@repo/ui";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  label: z.string({
    required_error: "Label is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
  code: z.string({
    required_error: "Code is required",
  }),
  modules: z.array(z.string(), {
    required_error: "Modules is required",
  }),
  managed:z.boolean()
});

const ComponentForm = ({ edit = false }: { edit?: boolean }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const { toast } = useToast();

  const [createComponent, { data, error, loading }] = useLazyQuery(serverFetch);
  const [getComponent, getComponentResponse] = useLazyQuery(serverFetch);
  const [updateComponent, updateComponentResponse] = useLazyQuery(serverFetch);
  const [editorLanguage, setEditorLanguage] = useState("javascript");
  const router = useRouter();
  const { componentId } = useParams();

  useEffect(() => {
    if (edit) {
      getComponent(
        GET_COMPONENT,
        {
          where: {
            id: {
              is: componentId,
            },
          },
        },
        {
          cache: "no-store",
        }
      );
    }
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!edit) {
      createComponent(
        CREATE_COMPONENT,
        {
          input: {
            code: btoa((unescape(encodeURIComponent(values.code)))),
            description: values.description,
            createdBy: null,
            label: values.label,
            modules: values.modules,
            name: values.name,
            updatedBy: null,
            managed:values?.managed
          },
        },
        {
          cache: "no-store",
        }
      );
    } else {
      updateComponent(
        UPDATE_COMPONENT,
        {
          input: {
            id: componentId,
            code: btoa((unescape(encodeURIComponent(values.code)))),
            description: values.description,
            createdBy: null,
            label: values.label,
            modules: values.modules,
            name: values.name,
            updatedBy: null,
            managed:values?.managed
          },
        },
        {
          cache: "no-store",
        }
      );
    }
  }

  useEffect(() => {
    if (getComponentResponse.data) {
      console.log(getComponentResponse.data?.getComponent);

      form.reset({
        code: decodeURIComponent(escape(atob(getComponentResponse.data?.getComponent.code))),
        description: getComponentResponse.data?.getComponent.description,
        label: getComponentResponse.data?.getComponent.label,
        modules: getComponentResponse.data?.getComponent.modules,
        name: getComponentResponse.data?.getComponent.name,
        managed:getComponentResponse.data?.getComponent?.managed
      });
    }
    if (getComponentResponse.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: getComponentResponse.error?.message,
      });
    }
  }, [
    getComponentResponse.data,
    getComponentResponse.error,
    getComponentResponse.loading,
  ]);

  useEffect(() => {
    if (data) {
      toast({
        title: "Component Created",
      });
      setTimeout(() => {
        router.back();
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

  useEffect(() => {
    if (updateComponentResponse?.data) {
      toast({
        title: "Component Updated",
      });
      setTimeout(() => {
        router.back();
      }, 1000);
    }

    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: updateComponentResponse?.error?.message,
      });
    }
  }, [
    updateComponentResponse.data,
    updateComponentResponse.loading,
    updateComponentResponse.error,
  ]);

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
                  <Input placeholder="Name" {...field} />
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
                  <Input placeholder="Label" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="modules"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Modules</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Modules"
                    {...field}
                    onChange={(event) => {
                      const modules = event.target.value
                        .split(",")
                        .map((value: string) => value.trim());
                      field.onChange(modules);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                                    <FormLabel>
                                        Managed
                                    </FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <div className="w-[200px]">
                    <Select
                      onValueChange={(value: string) =>
                        setEditorLanguage(value)
                      }
                      value={editorLanguage}
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select Language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Languages</SelectLabel>
                          <SelectItem value="javascript">Javascript</SelectItem>
                          <SelectItem value="typescript">Typescript</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <FormControl>
                    <Editor
                      height="350px"
                      width={`90%`}
                      language={editorLanguage}
                      value={field.value}
                      theme={"hc-light"}
                      defaultValue="// paste your code here"
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
export default ComponentForm;
