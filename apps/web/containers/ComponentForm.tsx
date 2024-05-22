"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@monaco-editor/react";
import {
  Button,
  Checkbox,
  Form,
  FormControl,
  Textarea,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectContent,
  SelectLabel,
  SelectItem,
} from "@repo/ui";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  label: z.string({
    required_error: "Label is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
  code: z.string({
    required_error: "Code is required",
  }),
  modules: z.array(z.string(), {
    required_error: "Modules is required",
  }),
});

const ComponentForm = ({ edit = false }: { edit?: boolean }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const [editorLanguage, setEditorLanguage] = useState("javascript");
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(btoa(values.code), "    ", atob("Ly8gcGFzdGUgeW91ciBjb2RlIGhlcmUNCg0KY29uc3QgYTpzdHJpbmcgPSAicHJhdmVlbiI=")); // convert string to base64 encoded string and vice-versa 
    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
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

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="modules"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Modules</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Modules"
                    {...field}
                    onChange={(event) => {
                      const modules = event.target.value
                        .split(",")
                        .map((value: string) => value.trim());
                      field.onChange(modules);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <div className="w-[200px]">
                    <Select onValueChange={(value: string) => setEditorLanguage(value)} value={editorLanguage}>
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select Language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Languages</SelectLabel>
                          <SelectItem value="javascript">Javascript</SelectItem>
                          <SelectItem value="typescript">Typescript</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <FormControl>

                    <Editor
                      height="350px"
                      width={`90%`}
                      language={editorLanguage}
                      value={field.value}
                      theme={"hc-light"}
                      defaultValue="// paste your code here"
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Button
            type="submit"
            variant="default"
            className="flex justify-center items-center w-fit"
          >
            Submit
          </Button>
        </div>{" "}
      </form>
    </Form>
  );
};
export default ComponentForm;
