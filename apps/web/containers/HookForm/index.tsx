"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@monaco-editor/react";
import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useToast,
  Toaster,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@repo/ui";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CodeEnable from "./CodeEnable";

const formSchema = z.object({
  event: z.string({
    required_error: "Event is required",
  }),
  method: z.string({
    required_error: "Method is required",
  }),
  model: z.string().optional(),
  enableBeforeCreate: z.boolean().optional(),
  enableBeforeUpdate: z.boolean().optional(),
  enableBeforeDelete: z.boolean().optional(),
  enableAfterCreate: z.boolean().optional(),
  enableAfterUpdate: z.boolean().optional(),
  enableAfterDelete: z.boolean().optional(),
  enableBeforeGet: z.boolean().optional(),
  enableAfterGet: z.boolean().optional(),
  enableBeforeList: z.boolean().optional(),
  enableAfterList: z.boolean().optional(),
  afterCreate: z.string().optional(),
  beforeCreate: z.string().optional(),
  beforeUpdate: z.string().optional(),
  beforeDelete: z.string().optional(),
  beforeGet: z.string().optional(),
  afterGet: z.string().optional(),
  beforeList: z.string().optional(),
  afterList: z.string().optional(),
  afterDelete: z.string().optional(),
  afterUpdate: z.string().optional(),
});
const HookForm = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      enableBeforeCreate: false,
      enableBeforeUpdate: false,
      enableBeforeDelete: false,
      enableAfterCreate: false,
      enableAfterUpdate: false,
      enableAfterDelete: false,
      enableBeforeGet: false,
      enableAfterGet: false,
      enableBeforeList: false,
      enableAfterList: false,
      afterCreate: "",
      beforeCreate: "",
      beforeUpdate: "",
      beforeDelete: "",
      beforeGet: "",
      afterGet: "",
      beforeList: "",
      afterList: "",
      afterDelete: "",
      afterUpdate: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <Toaster />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          <FormField
            control={form.control}
            name="event"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select an event" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Events</SelectLabel>
                        <SelectItem value="after">After</SelectItem>
                        <SelectItem value="before">Before</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="method"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Method</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select an method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Methods</SelectLabel>
                        <SelectItem value="create">Create</SelectItem>
                        <SelectItem value="update">Update</SelectItem>
                        <SelectItem value="get">Get</SelectItem>
                        <SelectItem value="list">List</SelectItem>
                        <SelectItem value="delete">Delete</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {["after", "before"].map((event: string) =>
            ["create", "delete", "update", "list", "get"].map(
              (method: string) => <CodeEnable form={form} event={event} method={method} />
            )
          )}
        </div>
        <div className="flex justify-center items-center">
          <Button
            type="submit"
            variant="default"
            className="flex justify-center items-center w-fit"
          >
            {"Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default HookForm;
