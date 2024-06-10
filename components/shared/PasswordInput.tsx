import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import React from "react";
import { Button } from "../ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface FromProps {
  name: string;
  label: string;
  placeholder?: string;
  form: any;
}

const PasswordInput = ({ name, label, placeholder, form }: FromProps) => {
  const [show, setShow] = React.useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                type={show ? "text" : "password"}
                placeholder={placeholder}
                {...field}
              />
              <Button
                className="absolute inset-y-0 right-0 flex select-none items-center px-2"
                variant="link"
                type="button"
                onClick={() => setShow(!show)}
              >
                {show ? (
                  <EyeNoneIcon className="size-5" />
                ) : (
                  <EyeOpenIcon className="size-5" />
                )}
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PasswordInput;
