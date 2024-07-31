"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import {
  Button, Input, Checkbox, Form, FormItem, FormLabel, FormControl, FormMessage, FormField,
} from "@repo/ui";

interface FieldMetadata {
  name: string;
  type: "text" | "number" | "checkbox" ;
  label: string;
}

interface DynamicFormProps {
  metadata: FieldMetadata[];
}

const generateSchema = (metadata: FieldMetadata[]) => {
  const schemaObj: Record<string, any> = {};

  metadata.forEach((field) => {
    switch (field.type) {
      case "text":
        schemaObj[field.name] = z.string().optional();
        break;
      case "number":
        schemaObj[field.name] = z.coerce.number().optional();
        break;

      case "checkbox":
        schemaObj[field.name] = z.boolean();
        break;
      default:
        break;
    }
  });

  return z.object(schemaObj);
};

const DynamicForm: React.FC<DynamicFormProps> = ({ metadata }) => {
  const formSchema = generateSchema(metadata);
  type FormSchema = z.infer<typeof formSchema>;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: metadata.reduce((acc, field) => {
      acc[field.name] = field.type === "checkbox" ? false : field.type == "number" ? 0:"";
      return acc;
    }, {} as Record<string, any>),
  });

  const onSubmit: SubmitHandler<FormSchema> = (values) => {
    console.log(values);
    // toast.success("Form submitted successfully!");
  };

  return (
    <div>
      <Form {...form}>
        {/* <Toaster /> */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
            {metadata.map((item) => (
              <div key={item.name}>
                {item.type === "text" && (
                  <FormField
                    control={form.control}
                    name={item.name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{item.label}</FormLabel>
                        <FormControl>
                          <Input placeholder={item.label} {...field} type="text" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {item.type === "number" && (
                  <FormField
                    control={form.control}
                    name={item.name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{item.label}</FormLabel>
                        <FormControl>
                          <Input placeholder={item.label} {...field} type="number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {item.type === "checkbox" && (
                  <FormField
                    control={form.control}
                    name={item.name}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 ">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>{item.label}</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center">
            <Button type="submit" variant="default" className="flex justify-center items-center w-fit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DynamicForm;
