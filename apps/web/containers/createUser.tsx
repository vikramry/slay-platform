"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormDescription,
  DateTimePicker,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@repo/ui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLazyQuery } from "../app/hook";
import { serverFetch } from "../app/action";
import { CreateUserQuary, GetUserQuary, GetUserquary } from "../app/queries";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const formSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  email: z.string({
    required_error: "Email is required",
  }),
  password: z.string({
    required_error: "Password is required",
  }),
  role: z.string({
    required_error: "role is required",
  }),
});

const CreateUser = ({edit=false}:{edit:boolean}) => {
  const [createUser, { data, loading, error }] = useLazyQuery(serverFetch);
  const [getUser, getUserResponse] = useLazyQuery(serverFetch);
  const params = useSearchParams();
  console.log(params.get("edit"), "fjyfjhvjgy");
  console.log(params.get("id"), "fjyfjhvjgy");

  const getUserFun=()=>{
    getUser(
        GetUserQuary,{
        "where": {
          "id": {
            "is": null
          }
        }
      },{
            cache: "no-store",
          }
    )
  }
useEffect(()=>{
if(edit){
    getUserFun()
}

},[])
useEffect(() => {
  if(getUserResponse.data){
    form.reset({
        name:getUserResponse.data.getUser.name,
        email:getUserResponse.data.getUser.email,
      })
  }

}, [getUserResponse])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    createUser(
      CreateUserQuary,
      {
        input: {
          email: values?.email,
          name: values?.name,
          password: values?.password,
          role: null,
        },
      },
      {
        cache: "no-store",
      }
    );
  }
  // ...

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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
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
            Submit
          </Button>
        </div>{" "}
      </form>
    </Form>
  );
};
export default CreateUser;
