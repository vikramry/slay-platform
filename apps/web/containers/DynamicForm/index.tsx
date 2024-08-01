"use client";
import {
  Button, Input, Checkbox, Form, FormItem, FormLabel, FormControl, FormMessage, FormField,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@repo/ui";
import { ModelFieldType } from "@/types";
import GenerateRelationshipValues from "./GenerateRelationshipValues";


const DynamicForm = ({ handleSubmit, modelFields, form, loading }: { handleSubmit: Function, modelFields: ModelFieldType[], form: any, loading?: boolean }) => {

  return (
    <div>
      <Form {...form}>
        {/* <Toaster /> */}
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
            {modelFields.map((item) => {
              return (
                <div>
                  {item.type === "string" && (
                    <FormField
                      control={form.control}
                      name={item.fieldName}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{item.label}</FormLabel>
                          <FormControl>
                            <Input placeholder={item.fieldName} {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {
                    item.type == "relationship" && (
                      <FormField
                        control={form.control}
                        name={item.fieldName}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{item.label}</FormLabel>
                            <FormControl>
                              <Select onValueChange={(val) => {
                                if (val)
                                  field.onChange(val);
                              }} value={field.value}>
                                <SelectTrigger className="">
                                  <SelectValue placeholder={`Select a ${item.ref}`} />
                                </SelectTrigger>
                                <SelectContent>
                                  <GenerateRelationshipValues fieldData={item} form={form} />
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )
                  }
                  {item.type === "number" && (
                    <FormField
                      control={form.control}
                      name={item.fieldName}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{item.label}</FormLabel>
                          <FormControl>
                            <Input placeholder={item.fieldName} {...field} type="number" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {item.type === "boolean" && (
                    <FormField
                      control={form.control}
                      name={item.fieldName}
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
                  {item.type === "enum" && (
                    <FormField
                      control={form.control}
                      name={item.fieldName}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Component</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger className="">
                                <SelectValue placeholder="Select a Component" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Select {item.label}</SelectLabel>
                                  {item?.enumValues.map(
                                    (enumValue: any) => {
                                      return (
                                        <SelectItem value={enumValue}>
                                          {enumValue}
                                        </SelectItem>
                                      );
                                    }
                                  )}

                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>

              )
            }

            )}
          </div>
          <div className="flex justify-center items-center">
            <Button
              type="submit"
              variant="default"
              disabled={loading}
              className="flex justify-center items-center w-fit"
            >
              {loading ? "loading..." : "Submit"}
            </Button>
          </div>{" "}
        </form>
      </Form>
    </div>
  );
};

export default DynamicForm;
