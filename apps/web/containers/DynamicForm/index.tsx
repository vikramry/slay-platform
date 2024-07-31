"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Button, Input, Checkbox, Select, Form, FormItem, FormLabel, FormControl, FormMessage, FormField } from "@repo/ui";
// import { Toaster, toast } from "react-hot-toast";

// Define a schema based on your metadata
const formSchema = z.object({
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().nonempty("Last name is required"),
  age: z.coerce.number().min(1, "Age must be at least 1"),
  email: z.string().email("Invalid email address"),
  isAdmin: z.boolean(),
});

type FormSchema = z.infer<typeof formSchema>;

interface DynamicFormProps {
  metadata: FieldMetadata[];
}

const DynamicForm: React.FC<DynamicFormProps> = ({ metadata }) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      age: 0,
      email: "",
      isAdmin: false,
    },
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
          {metadata.map((item) => {
            console.log(item.label,"field")
            return(
<div>
{item.type === "text" && (
                  <FormField
                  control={form.control}
                  name={item.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{item.label}</FormLabel>
                      <FormControl>
                        <Input placeholder={item.name} {...field} type="text" />
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
                      <FormLabel>{item.name}</FormLabel>
                      <FormControl>
                        <Input placeholder={item.name} {...field} type="number" />
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
              
          )}
           
          )}
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
