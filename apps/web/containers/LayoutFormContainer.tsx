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
import { useParams } from "next/navigation";
import { useLazyQuery } from "@/app/hook";
import { serverFetch } from "@/app/action";
import { CreateLayoutQuery, UpdateLayoutQuery } from "@/app/queries";
import { useEffect } from "react";
import { MultiSelector, MultiSelectorContent, MultiSelectorInput, MultiSelectorItem, MultiSelectorList, MultiSelectorTrigger } from "../../../packages/ui/dist";

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
  const [upadteLayout, upadteLayoutresponce] = useLazyQuery(serverFetch);
  const { id } = useParams();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: "",
      profiles: [],
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (edit)
      upadteLayout(
        UpdateLayoutQuery,
        {
          input: {},
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
            model: values?.model,
            profiles: values?.profiles,
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
        titile: "Layout created successfully",
      });
    } else if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.message,
      });
    }
  }, [data, error, loading]);

  useEffect(() => {
    if (upadteLayoutresponce.data) {
      toast({
        title: " Layout Updated",
      });
    } else if (upadteLayoutresponce.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: upadteLayoutresponce.error?.message,
      });
    }
  }, [
    upadteLayoutresponce.data,
    upadteLayoutresponce.error,
    upadteLayoutresponce.loading,
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
                    <MultiSelector values={["React"]} onValuesChange={(value) => console.log(value)} loop className="max-w-xs">
                      <MultiSelectorTrigger>
                        <MultiSelectorInput placeholder="Select your framework" />
                      </MultiSelectorTrigger>
                      <MultiSelectorContent>
                        <MultiSelectorList>
                          <MultiSelectorItem value={"React"}>React</MultiSelectorItem>
                          <MultiSelectorItem value={"Vue"}>Vue</MultiSelectorItem>
                          <MultiSelectorItem value={"Svelte"}>Svelte</MultiSelectorItem>
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
