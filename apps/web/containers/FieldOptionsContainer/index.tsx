"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  Checkbox,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@repo/ui";
import { Input } from "@repo/ui";

const FieldOptionsContainer = () => {
  const fieldOptionSchema = z.object({
    model: z.string({
      required_error: "Model is required",
    }),
    modelField: z.string({
      required_error: "Model field is required",
    }),
    modelName: z.string({
      required_error: "Model name is required",
    }),
    fieldName: z.string({
      required_error: "Field name is required",
    }),
    keyName: z.string({
      required_error: "Key name is required",
    }),
    type: z.enum(["number", "string", "boolean", "date"]),
    value: z.string({
      required_error: "Value is required",
    }),
    managed: z.boolean(),
    prefix: z.string().nullable(),
  });

  type FieldOptionType = z.infer<typeof fieldOptionSchema>;

  const form = useForm<FieldOptionType>({
    resolver: zodResolver(fieldOptionSchema),
    defaultValues: {
      prefix: "DOMAIN",
    },
  });
  const onSubmit = (data: FieldOptionType) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-2/3"
      >
        <FormField
          control={form.control}
          name="modelName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model Name</FormLabel>
              <FormControl>
                <Input placeholder="Model name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="keyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Key Name</FormLabel>
              <FormControl>
                <Input placeholder="Key name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Types</SelectLabel>
                      <SelectItem value="string">String</SelectItem>
                      <SelectItem value="number">Number</SelectItem>
                      <SelectItem value="boolean">Boolean</SelectItem>
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
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Value</FormLabel>
              <FormControl>
                <Input placeholder="Value" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="managed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Managed</FormLabel>
              <FormControl>
                <Checkbox {...field} />
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

        <Button type="submit" variant="default">
          Update account
        </Button>
      </form>
    </Form>
  );
};

export default FieldOptionsContainer;
