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
  toast,
  Toaster,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@repo/ui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLazyQuery } from "../app/hook";
import { serverFetch } from "../app/action";
import { CreateUserQuary, GetUserQuary, UpdateUserQuary } from "../app/queries";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";



const CreateUser = ({ edit = false }: { edit?: boolean }) => {
  const [createUser, { data, loading, error }] = useLazyQuery(serverFetch);
  const [getUser, getUserResponse] = useLazyQuery(serverFetch);
  const [updateUser, updateUserResponse] = useLazyQuery(serverFetch);
  const router = useRouter()
  const params = useSearchParams();
  console.log(params.get("id"), "fjyfjhvjgyg");
  const UserId = params.get("id")
  const formSchema = z.object({
    firstName: z.string({
      required_error: "Name is required",
    }),
    lastName: z.string({
      required_error: "Name is required",
    }),
    email: z.string({
      required_error: "Email is required",
    }),
    password: edit ? z.string().optional() : z.string({ required_error: "Password is required" }),
    // role: z.string({
    //   required_error: "role is required",
    // }),
  });
  useEffect(() => {
    if (edit) {
      getUser(
        GetUserQuary, {
        "where": {
          "id": {
            "is": UserId
          }
        }
      }, {
        cache: "no-store",
      }
      )
    }

  }, [])
  useEffect(() => {
    if (getUserResponse.data) {
      form.reset({
        firstName: getUserResponse.data.getUser.name,
        lastName: getUserResponse.data.getUser.name,
        email: getUserResponse.data.getUser.email,
        // role: getUserResponse.data.getUser.role
        // password:getUserResponse.data.getUser.password
      })
    }
    else if (getUserResponse?.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: getUserResponse.error?.message,
      });
    }

  }, [getUserResponse?.data, getUserResponse?.loading, getUserResponse.error])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (edit == false) {
      createUser(
        CreateUserQuary,
        {
          input: {
            email: values?.email,
            firstName: values?.firstName,
            lastName: values?.lastName,
            password: values?.password,
            // role: values?.role,
          },
        },
        {
          cache: "no-store",
        }
      );
    }

    else if (edit == true) {
      updateUser(
        UpdateUserQuary,
        {
          input: {
            email: values?.email,
            firstName: values?.firstName,
            lastName: values?.lastName,
            id: UserId
          },
        },
        {
          cache: "no-store",
        }
      )
    }
  }
  useEffect(() => {
    if (data) {
      toast({
        title: "Success",
        description: "Successful created",
      })
      setTimeout(function() {
        router.push("/dashboard/users")
    }, 2000);

    } else if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.message,
      });
    }
  }, [data, loading, error])
  useEffect(() => {
    if (updateUserResponse.data) {
      toast({
        title: "Success Upadted",
        description: "Successful updated",
      })
      setTimeout(function() {
        router.push("/dashboard/users")
    }, 2000);
  

    }
    else if (updateUserResponse?.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: updateUserResponse?.error?.message,
      });
    }
  }, [updateUserResponse])
  // ...

  return (
    <Form {...form}>
      <Toaster />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter last name" {...field} />
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
          {!edit &&

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
            />}
          {/* <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="ANONYMOUS">ANONYMOUS</SelectItem>

                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </div>
        <div className="flex justify-center items-center">
          <Button
            type="submit"
            disabled={loading}
            className="flex justify-center items-center w-fit"
          >
           {loading?"loading...":"Submit"} 
          </Button>
        </div>{" "}
      </form>
    </Form>
  );
};
export default CreateUser;
