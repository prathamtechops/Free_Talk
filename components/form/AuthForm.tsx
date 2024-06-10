"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { login, register } from "@/lib/actions/user.actions";
import { loginSchema, registerSchema } from "@/lib/validation";
import { AuthFormProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ErrorField } from "../ErrorField";
import { Seperator } from "../Seperator";
import { SocialButtons } from "../SocialButtons";
import InputField from "../shared/InputField";
import PasswordInput from "../shared/PasswordInput";
import { ToastAction } from "../ui/toast";
import { useToast } from "../ui/use-toast";

export default function AuthForm({ type }: AuthFormProps) {
  const schema = type === "login" ? loginSchema : registerSchema;
  const searchParams = useSearchParams();
  const errorMessage =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use"
      : null;

  const [error, setError] = useState(errorMessage);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof schema>) {
    if (type === "register" && schema === registerSchema) {
      setError(null);
      try {
        await register(values as z.infer<typeof schema>);
        toast({
          title: "Success",
          // description: ,
          variant: "success",
        });
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });

        setError(error.message);
      }

      return;
    }

    if (type === "login") {
      try {
        await login(values as z.infer<typeof schema>);

        toast({
          title: "Success",
          description: "Login Successfull",
          variant: "success",
        });
      } catch (error: any) {
        setError(error.message);

        if (error.message === "Email not verified") {
          toast({
            title: error.message,
            description:
              "Click send varification button to send varification link",
            action: (
              <ToastAction altText="Send varification link">Send</ToastAction>
            ),
          });
        } else {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        }
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" size-full ">
        <div className="grid gap-4">
          <div className="grid gap-2">
            {type === "register" && (
              <InputField
                name="username"
                label="Username"
                placeholder="xyz"
                form={form}
              />
            )}

            <InputField
              name="email"
              label="Email"
              placeholder="abc@email.com"
              form={form}
            />

            <PasswordInput name="password" label="Password" form={form} />

            {type === "register" && (
              <InputField
                name="confirmPassword"
                label="Confirm Password"
                form={form}
                type="password"
              />
            )}
          </div>

          {/* //TODO: Add forgot password */}

          {type === "login" && (
            <Link
              href="/forgot-password"
              className="relative ml-auto inline-block text-xs transition duration-300 ease-in-out"
            >
              <span className="before:absolute before:-bottom-0.5 before:left-0 before:h-[2px] before:w-0 before:bg-current before:transition-all before:duration-300 before:ease-in-out hover:before:w-full">
                Forgot your password?
              </span>
            </Link>
          )}
          <ErrorField message={error} />
          <Button
            isLoading={form.formState.isSubmitting}
            type="submit"
            className="w-full"
          >
            {type === "login" ? "Login" : "Register"}
          </Button>
          <Seperator />
          <SocialButtons type={type} />
        </div>
      </form>
    </Form>
  );
}
