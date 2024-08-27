import React, { useEffect } from "react";

import { InputField } from "@repo/ui/inputField";
import { Button, CustomButton, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Toaster, useToast } from "@repo/ui";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLazyQuery } from "@/app/hook";
import { SIGNIN_PLATFORM } from "@/app/queries";
import { serverFetch } from "@/app/action";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
const formSchema = z.object({
  email: z.string({
    required_error: "Email is required"
  }),
  password: z.string({
    required_error: "Password is required"
  })
});
const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    },
  });
  const [login, { data, error, loading }] = useLazyQuery(serverFetch);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    login(
      SIGNIN_PLATFORM,
      {
        "email": values.email,
        "password": values.password
      }
    )
  }
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (data) {
      toast({
        title: "Sign In Success!!"
      });

      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 2);
      setCookie("session", data?.SignIn?.session, { expires: expiryDate });
      router.replace('/dashboard');
    }
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.message,
      });
    }
  }, [data, loading, error])
  return (
    <div className="flex justify-center flex-col items-center w-full p-5 h-full">
      <div className="flex-1 flex flex-col gap-4 justify-center items-center md:min-w-[390px] min-w-full">

        <Form {...form}>
          <Toaster />
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-4 justify-center items-center">
            <h1 className="font-bold text-3xl">Sign In</h1>
            <h5 className="text-gray-500 md:text-base text-sm dark:text-gray-300">
              Enter your email and password below to login
            </h5>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Enter your Email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Enter your Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CustomButton buttonText="Continue" variant="primary" size="lg" type="submit" />
          </form>
        </Form>

        <div className="relative w-full mt-6 flex justify-center items-center">
          <div className="absolute h-0.5 w-full bg-gray-100 dark:bg-gray-800"></div>
          <p className="text-xs font-extralight text-gray-500 dark:text-gray-300 z-10 bg-white dark:bg-black px-1">
            OR CONTINUE WITH
          </p>
        </div>

        <CustomButton
          buttonText="GitHub"
          variant="secondary"
          iconPosition="left"
          icon={<FaGithub size={22} />}
          size="lg"
          classnames="font-bold mt-3"
        />

        <div className="text-xs flex justify-center flex-col items-center gap-1 text-gray-500 dark:text-gray-300">
          <p>By clicking continue, you agree to our</p>
          <p>
            <Link href="#" className="text-blue-600 font-bold cursor-pointer">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="" className="text-blue-600 font-bold cursor-pointer">
              Privacy Policy.
            </Link>
          </p>
        </div>
      </div>
    </div >
  );
};

export default LoginForm;
