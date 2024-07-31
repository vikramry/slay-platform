"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef } from "react";
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
  toast,
} from "@repo/ui";
import { Input } from "@repo/ui";
import { useLazyQuery } from "@/app/hook";
import { serverFetch } from "@/app/action";
import {
  CreateFieldOptionQuary,
  GET_MODEL,
  GET_MODEL_FIELD,
  GetFieldOptionQuary,
  UpdateFieldOptionsQuary,
} from "@/app/queries";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const FieldOptionsContainer = ({ edit = false }: { edit?: boolean }) => {
  const { id, fieldId, fieldOptionId } = useParams();
  const [createModelField, { data, loading, error }] =
    useLazyQuery(serverFetch);
    const router = useRouter();

  const [getFieldOption, getFieldOptionResponse] = useLazyQuery(serverFetch);
  const [updateFieldOption, updateFieldOptionResponse] =
    useLazyQuery(serverFetch);
  const [getCurrentModel, getCurrentModelResponse] = useLazyQuery(serverFetch);
  const [getCurrentModelField, getCurrentModelFieldResponse] =
    useLazyQuery(serverFetch);

  const getFieldOptionFun = () => {
    getFieldOption(
      GetFieldOptionQuary,
      {
        where: {
          id: {
            is: fieldOptionId,
          },
        },
      },
      {
        cache: "no-store",
      }
    );
  };
  useEffect(() => {
    if (edit) {
      getFieldOptionFun();
    } else {
      form.reset({
        prefix: "DOMAIN",
        managed: false,
      });
    }

    getCurrentModel(
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

    getCurrentModelField(
      GET_MODEL_FIELD,
      {
        where: {
          id: {
            is: fieldId,
          },
        },
      },
      {
        cache: "no-store",
      }
    );
  }, []);

  useEffect(() => {
    if (getCurrentModelResponse.data) {
      form.setValue("model", getCurrentModelResponse.data?.getModel?.id);
      form.setValue("modelName", getCurrentModelResponse.data?.getModel?.name);
    }
  }, [getCurrentModelResponse.data, getCurrentModelResponse.error]);

  useEffect(() => {
    if (getCurrentModelFieldResponse.data) {
      form.setValue(
        "modelField",
        getCurrentModelFieldResponse.data?.getModelField?.id
      );
      form.setValue(
        "fieldName",
        getCurrentModelFieldResponse.data?.getModelField?.fieldName
      );
    }
  }, [getCurrentModelFieldResponse.data, getCurrentModelFieldResponse.error]);

  useEffect(() => {
    if (getFieldOptionResponse.data) {
      form.reset({
        keyName: getFieldOptionResponse.data.getFieldOption.keyName,
        type: getFieldOptionResponse.data.getFieldOption.type,
        value: getFieldOptionResponse.data.getFieldOption.value,
        managed: getFieldOptionResponse.data.getFieldOption.managed,
        prefix: getFieldOptionResponse.data.getFieldOption.prefix,
        modelName:getCurrentModelResponse.data?.getModel?.name,
        model: getCurrentModelResponse.data?.getModel?.id,
        fieldName:getCurrentModelFieldResponse.data?.getModelField?.fieldName,
        modelField:getCurrentModelFieldResponse.data?.getModelField?.id
      });
    } else if (getFieldOptionResponse?.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: getFieldOptionResponse?.error?.message,
      });
    }
  }, [getFieldOptionResponse.data, getFieldOptionResponse.error]);

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
    defaultValues: {},
  });

  const handleSubmit = (data: FieldOptionType) => {
    console.log(data);
    if (edit == false) {
      createModelField(
        CreateFieldOptionQuary,
        {
          input: {
            fieldName:
              getCurrentModelFieldResponse?.data?.getModelField.fieldName,
            keyName: data?.keyName,
            managed: data?.managed,
            model: id,
            modelField: fieldId,
            modelName: getCurrentModelResponse?.data?.getModel.name,
            prefix: data?.prefix,
            type: data?.type,
            value: data?.value,
          },
        },
        {
          cache: "no-store",
        }
      );
    } else if (edit == true) {
      updateFieldOption(
        UpdateFieldOptionsQuary,
        {
          input: {
            keyName: data?.keyName,
            managed: data?.managed,
            prefix: data?.prefix,
            type: data?.type,
            value: data?.value,
            id: fieldOptionId,
          },
        },
        {
          cache: "no-store",
        }
      );
    }
  };
  useEffect(() => {
    if (data) {
      toast({
        title: "Success",
        description: "Successful created",
      });
      setTimeout(function () {
        router.back();
      }, 2000);
    } else if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.message,
      });
    }
  }, [data, loading, error]);
  useEffect(() => {
    if (updateFieldOptionResponse.data) {
      toast({
        title: "Success",
        description: "Successful updated",
      });
      setTimeout(function () {
        router.back();
      }, 2000);
    } else if (updateFieldOptionResponse?.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: updateFieldOptionResponse?.error?.message,
      });
    }
  }, [updateFieldOptionResponse.data, updateFieldOptionResponse.data]);

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
                  <Input placeholder="Field name" disabled={true} {...field} />
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
                    value={form.watch("type")}
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
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 ">
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
            disabled={loading}
            className="flex justify-center items-center w-fit"
          >
            {loading ||updateFieldOptionResponse?.loading ? "loading..." : "Add Field Option"}
          </Button>

        </div>
      </form>
    </Form>
  );
};

export default FieldOptionsContainer;
// "use client";
// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";

// interface FormValues {
//   firstName: string;
//   lastName: string;
//   email: string;
// }

// const FieldOptionsContainer: React.FC = () => {
//   const { register, handleSubmit, setValue } = useForm<FormValues>();
//   const [defaultValues, setDefaultValues] = useState<FormValues>({
//     firstName: "",
//     lastName: "",
//     email: "",
//   });

//   // Simulating fetching dynamic default values
//   useEffect(() => {
//     // Fetch dynamic data from an API or other source
//     const dynamicData: FormValues = {
//       firstName: "John",
//       lastName: "Doe",
//       email: "john.doe@example.com",
//     };

//     // Update default values state with dynamic data
//     setDefaultValues(dynamicData);
//   }, []);

//   // Set default values in the form fields
//   useEffect(() => {
//     Object.entries(defaultValues).forEach(([fieldName, value]) => {
//       setValue(fieldName as keyof FormValues, value);
//     });
//   }, [defaultValues, setValue]);

//   const onSubmit = (data: FormValues) => {
//     console.log(data);
//     // Handle form submission
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <label htmlFor="firstName">First Name:</label>
//       <input
//         type="text"
//         id="firstName"
//         name="firstName"
//         // ref={register}
//         defaultValue={defaultValues.firstName}
//       />

//       <br />

//       <label htmlFor="lastName">Last Name:</label>
//       <input
//         type="text"
//         id="lastName"
//         name="lastName"
//         // ref={register}
//         defaultValue={defaultValues.lastName}
//       />
//       <br />

//       <label htmlFor="email">Email:</label>
//       <input
//         type="email"
//         id="email"
//         name="email"
//         defaultValue={defaultValues.email}
//         {...register("email")}

//       />
//       <br />

//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default FieldOptionsContainer;
