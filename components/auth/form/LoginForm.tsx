"use client";

import { login } from "@/actions/login";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LogoStatic } from "@/public/LogoStatic";
import { LoginSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import GoogleLogin from "../google-login";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setLoading(true);
    login(data).then((res) => {
      if (res.error) {
        setError(res.error);
        setLoading(false);
      }
      if (res.success) {
        setError("");
        setSuccess(res.success);
        setLoading(false);
      }
    });
  };

  return (
    <div className="min-h-[100dvh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <LogoStatic className="h-20 w-20 text-orange-500" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-medium text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="johndoe@email.com"
                      type="email"
                      className="rounded-xl border-gray-400"
                    />
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
                  <FormLabel className="text-gray-700">Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="******" type="password" className="rounded-xl border-gray-400" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">
                Or Sign-in with
              </span>
            </div>
          </div>

          <div className="mt-6">
             <GoogleLogin />
          </div>
        </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button type="submit" className="w-full flex justify-center items-center cursor-pointer py-2 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>
      </Form>
      <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">
                New to our platform?
              </span>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href='/sign-up'
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
              Create an account
            </Link>
              </div>
          </div>
        </div>
    </div>
  );
};

export default LoginForm;