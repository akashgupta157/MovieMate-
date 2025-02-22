"use client";
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Globe, Keyboard, User } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormItem,
  FormField,
  FormMessage,
  FormControl,
} from "@/components/ui/form";

const formSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(50, { message: "Username must be at most 50 characters long" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(50, { message: "Password must be at most 50 characters long" }),
});

export default function Login() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const validCredentials = { username: "naval.ravikant", password: "05111974" };

  function onSubmit(values) {
    if (
      values.username === validCredentials.username &&
      values.password === validCredentials.password
    ) {
      toast.success("Login successful", {
        style: {
          backgroundColor: "#15803d",
          color: "#ffffff",
        },
      });
      router.push("/booking");
      localStorage.setItem("isLoggedIn", true);
    } else {
      toast.error("Wrong Credentials", {
        style: {
          backgroundColor: "#b91c1c",
          color: "#ffffff",
        },
      });
      form.reset();
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-sm p-8 bg-black rounded-lg shadow-lg space-y-5">
        <div className="text-3xl font-bold flex justify-center items-center text-white gap-2">
          <Globe className="size-8" />
          Almanack
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Username" {...field} icon={<User />} />
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
                  <FormControl>
                    <Input
                      placeholder="Password"
                      type="password"
                      {...field}
                      icon={<Keyboard />}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="bg-white text-black rounded-3xl text-lg hover:bg-white font-bold w-1/2 mx-auto block"
            >
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
