"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Toaster,
  useToast,
} from "@repo/ui";
import { useParams, useRouter } from "next/navigation";
import { useLazyQuery } from "@/app/hook";
import { serverFetch } from "@/app/action";
import { CreateLayoutQuery, GET_LAYOUT, LIST_ALL_PROFILES, UpdateLayoutQuery } from "@/app/queries";
import { useEffect } from "react";
import { MultiSelector, MultiSelectorContent, MultiSelectorInput, MultiSelectorItem, MultiSelectorList, MultiSelectorTrigger } from "../../../packages/ui/dist";
import { ProfileType } from "@/types";

const formSchema = z.object({
  model: z.string().optional(),
  label: z.string({
    required_error: "Label is required",
  }),
  profiles: z.array(z.string()).optional(),
  name: z.string({
    required_error: "Name is required",
  }),
});

const LayoutFormcontainer = ({ edit = false }: { edit?: boolean }) => {
  const [createLayout, { data, loading, error }] = useLazyQuery(serverFetch);
  const [upadteLayout, updateLayoutresponse] = useLazyQuery(serverFetch);
  const [getAllProfiles, getAllProfilesresponse] = useLazyQuery(serverFetch);
  const [getCurrentLayout, getCurrentLayoutresponse] = useLazyQuery(serverFetch);
  const { id, layoutId } = useParams();
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: "",
      profiles: [],
      name: "",
    },
  });

  useEffect(() => {
    getAllProfiles(
      LIST_ALL_PROFILES,
      {
        limit: 100
      },
      {
        cache: "no-store"
      }
    );

    getCurrentLayout(
      GET_LAYOUT,
      {
        "where": {
          "id": {
            "is": layoutId
          }
        }
      },
      {
        cache: "no-store"
      }
    )
  }, [])


  useEffect(()=>{
    if(getCurrentLayoutresponse.error){
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: getCurrentLayoutresponse?.error?.message,
      });
    }
    if(getCurrentLayoutresponse.data){
      form.reset({
        label: getCurrentLayoutresponse.data?.getLayout?.label,
        name: getCurrentLayoutresponse?.data?.getLayout?.name,
        model: getCurrentLayoutresponse?.data?.getLayout?.model?.id,
        profiles: getCurrentLayoutresponse?.data?.getLayout?.profiles.map((item:ProfileType) => item.name)
      })
    }
  }, [getCurrentLayoutresponse.data, getCurrentLayoutresponse.error, getCurrentLayoutresponse.loading])

  useEffect(() => {
    if (getAllProfilesresponse.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: getAllProfilesresponse?.error?.message,
      });
    }
  }, [getAllProfilesresponse.data, getAllProfilesresponse.loading, getAllProfilesresponse.error])

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (edit)
      upadteLayout(
        UpdateLayoutQuery,
        {
          "input": {
            "id": layoutId,
            "label": values.label,
            "model": id,
            "name": values.name,
            "profiles": values.profiles?.map(profile => getAllProfilesresponse?.data?.listProfiles?.docs?.find((item: ProfileType) => item.name === profile)?.id)
          }
        },
        {
          cache: "no-store",
        }
      );
    else
      createLayout(
        CreateLayoutQuery,
        {
          input: {
            label: values?.label,
            model: id,
            profiles: values.profiles?.map(profile => getAllProfilesresponse?.data?.listProfiles?.docs?.find((item: ProfileType) => item.name === profile)?.id),
            name: values?.name,
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
        title: "Layout created successfully",
      });
      router.back();
    } else if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.message,
      });
    }
  }, [data, error, loading]);

  useEffect(() => {
    if (updateLayoutresponse.data) {
      toast({
        title: " Layout Updated",
      });
      router.back();
    } else if (updateLayoutresponse.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: updateLayoutresponse.error?.message,
      });
    }
  }, [
    updateLayoutresponse.data,
    updateLayoutresponse.error,
    updateLayoutresponse.loading,
  ]);

  return (
    <>
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
                    <Input placeholder="Layout Name" {...field} />
                  </FormControl>
                  <FormMessage />
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
                    <MultiSelector values={form.watch("profiles") || []} onValuesChange={(values) => {
                      form.setValue("profiles", values)
                    }} loop>
                      <MultiSelectorTrigger>
                        <MultiSelectorInput placeholder="Select profiles" />
                      </MultiSelectorTrigger>
                      <MultiSelectorContent>
                        <MultiSelectorList>
                          {
                            getAllProfilesresponse?.data?.listProfiles?.docs?.map((item: any) => {
                              return <MultiSelectorItem value={item?.name}>{item?.label}</MultiSelectorItem>
                            })
                          }
                        </MultiSelectorList>
                      </MultiSelectorContent>
                    </MultiSelector>
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
          </div>
          <div className="flex justify-center items-center">
            <Button
              type="submit"
              variant="default"
              className="flex justify-center items-center w-fit"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default LayoutFormcontainer;
