"use client";

import { serverFetch } from "@/app/action";
import { useLazyQuery } from "@/app/hook";
import {
  CreateTabQuary,
  GetTabQuary,
  LIST_ALL_MODELS_ID_LABEL,
  LIST_ALL_PROFILES,
  UpdateTabQuary,
} from "@/app/queries";
import { ProfileType } from "@/types";
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
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
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
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  order: z.coerce.number(),
  label: z.string({
    required_error: "Label is required",
  }),
  model: z.string({
    required_error: "Model is required",
  }),
  profiles: z.array(z.string()).optional(),
});

const CreatTab = ({ edit = false }: { edit?: boolean }) => {
  const [createTab, { data, loading, error }] = useLazyQuery(serverFetch);
  const [getTab, getTabResponse] = useLazyQuery(serverFetch);
  const [updateTab, updateTabResponse] = useLazyQuery(serverFetch);
  const [getModels, getModelsResponse] = useLazyQuery(serverFetch);
  const [getAllProfiles, getAllProfilesresponse] = useLazyQuery(serverFetch);
  const router = useRouter();
  const { tabId } = useParams();

  const getTabFun = () => {
    getTab(
      GetTabQuary,
      {
        where: {
          id: {
            is: tabId,
          },
        },
      },
      {
        cache: "no-store",
      }
    );
  };
  useEffect(() => {
    getAllProfiles(
      LIST_ALL_PROFILES,
      {
        limit: 100,
      },
      {
        cache: "no-store",
      }
    );
    getModels(
      LIST_ALL_MODELS_ID_LABEL,
      {
        limit: 50,
      },
      {
        cache: "no-store",
      }
    );
    if (edit) {
      getTabFun();
    }
  }, []);

  useEffect(() => {
    if (getAllProfilesresponse.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: getAllProfilesresponse?.error?.message,
      });
    }
  }, [
    getAllProfilesresponse.data,
    getAllProfilesresponse.loading,
    getAllProfilesresponse.error,
  ]);
  useEffect(() => {
    if (getModelsResponse.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: getModelsResponse.error?.message,
      });
    }
  }, [
    getModelsResponse.data,
    getModelsResponse.error,
    getModelsResponse.loading,
  ]);
  useEffect(() => {
    if (getTabResponse.data) {
      form.reset({
        label: getTabResponse.data.getTab.label,
        order: getTabResponse.data.getTab.order,
        model: getTabResponse.data.getTab.model?.id,
        profiles: getTabResponse.data?.getTab.profiles?.map(
          (item: ProfileType) => item.name
        ) || [],
      });
    } else if (getTabResponse.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: getTabResponse.error?.message,
      });
    }
  }, [getTabResponse?.data, getTabResponse?.loading, getTabResponse?.error]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profiles: [],
      label: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (edit == false) {
      createTab(
        CreateTabQuary,
        {
          input: {
            //   "createdBy": null,
            icon: "icon",
            label: values?.label,
            model: values?.model,
            order: values?.order,
            profiles: values.profiles?.map(
              (profile) =>
                getAllProfilesresponse?.data?.listProfiles?.docs?.find(
                  (item: ProfileType) => item.name === profile
                )?.id
            ),
            //   "updatedBy": null
          },
        },
        {
          cache: "no-store",
        }
      );
    } else if (edit == true) {
      updateTab(
        UpdateTabQuary,
        {
          input: {
            //   "createdBy": null,
            //   "icon": null,
            label: values?.label,
            model: values?.model,
            order: values?.order,
            profiles: values.profiles?.map(
              (profile) =>
                getAllProfilesresponse?.data?.listProfiles?.docs?.find(
                  (item: ProfileType) => item.name === profile
                )?.id
            ),
            //   "updatedBy": null,
            id: tabId,
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
      router.push("/dashboard/setup/tabs");
    } else if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.message,
      });
    }
  }, [data, loading, error]);

  useEffect(() => {
    if (updateTabResponse.data) {
      toast({
        title: "Success upadated",
        description: "Successful updated",
      });
      setTimeout(function () {
        router.push("/dashboard/setup/tabs");
      }, 2000);
    } else if (updateTabResponse?.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: updateTabResponse?.error?.message,
      });
    }
  }, [updateTabResponse]);
  // ...

  return (
    <Form {...form}>
      <Toaster />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
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
            name="model"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Reference Model</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select a Model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Models</SelectLabel>
                        {getModelsResponse.data?.listModels?.docs.map(
                          (item: any) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.label}
                            </SelectItem>
                          )
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Profile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile</FormLabel>
                <FormControl>
                  <MultiSelector
                    values={form.watch("profiles") || []}
                    onValuesChange={(values) => {
                      form.setValue("profiles", values);
                    }}
                    loop
                  >
                    <MultiSelectorTrigger>
                      <MultiSelectorInput placeholder="Select profiles" />
                    </MultiSelectorTrigger>
                    <MultiSelectorContent>
                      <MultiSelectorList>
                        {getAllProfilesresponse?.data?.listProfiles?.docs?.map(
                          (item: any) => {
                            return (
                              <MultiSelectorItem value={item?.name}>
                                {item?.label}
                              </MultiSelectorItem>
                            );
                          }
                        )}
                      </MultiSelectorList>
                    </MultiSelectorContent>
                  </MultiSelector>
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
            {loading || updateTabResponse.loading ? "loading..." : "Submit"}
          </Button>
        </div>{" "}
      </form>
    </Form>
  );
};
export default CreatTab;
