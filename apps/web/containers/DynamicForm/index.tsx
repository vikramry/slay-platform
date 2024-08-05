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
  DateTimePicker,
  MultiSelector,
  MultiSelectorTrigger,
  MultiSelectorInput,
  MultiSelectorContent,
} from "@repo/ui";
import { ModelFieldType } from "@/types";
import GenerateRelationshipValues from "./GenerateRelationshipSelectItems";
import GenerateMultiRelationshipItems from "./GenerateMultiRelationshipItems";


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
                  {item.type === "string" && !item.many && (
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
                    item.type == "date" &&
                    <FormField
                      control={form.control}
                      name={item.fieldName}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{item.label}</FormLabel>
                          <FormControl>
                            <DateTimePicker
                              granularity="second"
                              hourCycle={12}
                              jsDate={field.value}
                              onJsDateChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  }

                  {
                    ["string", "number", "boolean"].includes(item.type) && item.many &&
                    <FormField
                      control={form.control}
                      name={item.fieldName}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>[{item.label}]</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={`Enter values separated by comma`}
                              {...field}
                              type="text"
                              onChange={(event) => {

                                const arrayValues = event.target.value
                                  .split(",")
                                  .map((value: string) => {
                                    const trimmedValue = value.trim();
                                    if (item.type === "number") {
                                      return isNaN(Number(trimmedValue)) ? null : trimmedValue;
                                    } else if (item.type === "boolean") {
                                      return ['t', 'T', 'true', true].includes(trimmedValue) ? true : ['f', 'F', 'false', false].includes(trimmedValue) ? false : '';
                                    } else {
                                      return trimmedValue;
                                    }
                                  })
                                  .filter((value: any) => {
                                    if (item.type === "number") {
                                      return value !== null;
                                    } else if (item.type === "boolean") {
                                      return value !== null;
                                    }
                                    return true;
                                  });

                                field.onChange(arrayValues);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  }


                  {
                    item.type == "relationship" && !item.many && (
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

                  {
                    item.type == "relationship" && item.many &&

                    <FormField
                      control={form.control}
                      name={item.fieldName}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{item.label}</FormLabel>
                          <FormControl>
                            <MultiSelector values={form.watch(item.fieldName) || []} onValuesChange={(values) => {
                              form.setValue(item.fieldName, values)
                            }} loop>
                              <MultiSelectorTrigger>
                                <MultiSelectorInput placeholder={`select ${item.ref}s`} />
                              </MultiSelectorTrigger>
                              <MultiSelectorContent>
                                <GenerateMultiRelationshipItems fieldData={item} form={form} />
                              </MultiSelectorContent>
                            </MultiSelector>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  }
                  {["number", "float"].includes(item.type) && !item.many && (
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

                  {item.type === "boolean" && !item.many && (
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
                        <FormItem className="">
                          <FormLabel>{item.label}</FormLabel>
                          <FormControl>
                            <Select onValueChange={(val)=>field.onChange(val)} value={field.value}>
                              <SelectTrigger className="">
                                <SelectValue placeholder="Select" />
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
