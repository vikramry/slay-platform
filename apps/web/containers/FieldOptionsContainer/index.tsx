"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef } from "react";
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
  DateTimePicker,
} from "@repo/ui";
import { Input } from "@repo/ui";
import { useLazyQuery } from "@/app/hook";
import { serverFetch } from "@/app/action";
import { CreateFieldOptionQuary } from "@/app/queries";

const FieldOptionsContainer = () => {
  const [createModelField,{ data, loading, error }] = useLazyQuery(serverFetch);

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
    type: z.enum(["number", "string", "boolean"]),
    value: z.any({
      required_error: "Value is required",
    }),
    managed: z.boolean(),
    prefix: z.string().optional(),
  });

  type FieldOptionType = z.infer<typeof fieldOptionSchema>;

  const form = useForm<FieldOptionType>({
    resolver: zodResolver(fieldOptionSchema),
    defaultValues: {
      prefix: "DOMAIN",
      modelName: "some-model",
      model: "34567",
      modelField: "some-field",
      managed: false,
    },
  });
  const handleSubmit = (data: FieldOptionType) => {
    console.log(data);
    createModelField(
      CreateFieldOptionQuary,
      {
        "input": {
          "fieldName": data?.fieldName,
          "keyName": data?.keyName,
          "managed": data?.managed,
          "model": data?.model,
          "modelField": data?.modelField,
          "modelName": data?.modelName,
          "prefix": data?.prefix,
          "type": data?.type,
          "value": data?.value
        }
      },
      {
          cache: "no-store"
      }
  );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 ">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          <FormField
            control={form.control}
            name="modelName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model Name</FormLabel>
                <FormControl>
                  <Input placeholder="Model name" disabled={true} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fieldName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Field Name</FormLabel>
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
                  <Select
                    onValueChange={(e: any) => {
                      field.onChange(e);
                      form.setValue("value", "");
                    }}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="">
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

          {form.watch("type", "string") === "boolean" ? (
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 ">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Value</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          ) : (
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Value"
                      {...field}
                      type={
                        form.watch("type", "string") === "string"
                          ? "text"
                          : "number"
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

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
        </div>
        <div className="flex justify-center items-center">
          <Button
            type="submit"
            variant="default"
            className="flex justify-center items-center w-fit"
          >
            Add Field Option
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FieldOptionsContainer;
