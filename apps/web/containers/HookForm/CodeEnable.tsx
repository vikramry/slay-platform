import { Editor } from "@monaco-editor/react";
import {
  Checkbox,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui";
import React from "react";

const CodeEnable = ({
  form,
  event,
  method,
}: {
  form: any;
  event: string;
  method: string;
}) => {
  const convertToTitleCase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <>
      {form.watch("event") == event && form.watch("method") == method && (
        <>
          <FormField
            control={form.control}
            enableBeforeCreate
            name={`enable${convertToTitleCase(event)}${convertToTitleCase(method)}`}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-center space-x-3 space-y-0 col-span-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Enable {convertToTitleCase(event)}{" "}
                    {convertToTitleCase(method)}
                    Hook
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`${event}${convertToTitleCase(method)}`}
            render={({ field }) => (
              <FormItem className="col-span-2 w-full">
                <FormLabel className="w-full text-center m-auto font-bold">
                  {convertToTitleCase(event)} {convertToTitleCase(method)} Hook
                  Code
                </FormLabel>
                <FormControl>
                  <Editor
                    height="350px"
                    width={`90%`}
                    language={"typescript"}
                    value={field.value}
                    theme={"hc-light"}
                    defaultValue="// write your hook code here..."
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
    </>
  );
};

export default CodeEnable;
