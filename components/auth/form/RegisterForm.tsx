"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CardWrapper from "../card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schema";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { register } from "@/actions/register";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";
import GoogleLogin  from "../google-login";
import { LogoStatic } from "@/public/LogoStatic";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    setLoading(true);
    register(data).then((res) => {
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
          Create New account
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="John Doe" className="rounded-xl border-gray-400"/>
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
                    <Input {...field} placeholder="******" type="password" className="rounded-xl border-gray-400"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Confirm Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="******" type="password" className="rounded-xl border-gray-400"/>
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
                Or Sign-up with
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
            {loading ? "Loading..." : "Register"}
          </Button>
        </form>
      </Form>
      </div>
      </div>
  );
};

export default RegisterForm;