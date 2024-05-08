"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Checkbox, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input } from "@repo/ui"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useLazyQuery } from "../app/hook"
import { serverFetch } from "../app/action"
import { CreateModelQuary } from "../app/queries"
import { useEffect } from "react"



const formSchema = z.object({
  name: z.string(),
  label: z.string(),
  managed: z.boolean(),
  prefix:z.string()

})

const CreatModel = () => {
  const [createModel,{ data, loading, error }] = useLazyQuery(serverFetch);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      managed: false
    },
  })


  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    createModel(
      CreateModelQuary,
      {
        "input": {
          "createdBy": null,
          "label": values?.label,
          "managed": values?.managed,
          "name": values?.name,
          "prefix": values?.prefix,
          "updatedBy": null
        }
      },
      {
          cache: "no-store"
      }
  );
  }
useEffect(()=>{
if(data){

}else if(error){
  
}
},[data, loading, error])
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
                  <Input placeholder="Model name" {...field} />
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
                  <Input placeholder="Model label" {...field} />
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
                  <FormLabel>
                    Managed
                  </FormLabel>
                </div>
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
            Submit
          </Button>
        </div>      </form>
    </Form>
  )
}
export default CreatModel