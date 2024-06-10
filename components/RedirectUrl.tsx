"use client";
import { AuthFormProps } from "@/types";
import Link from "next/link";

export function RedirectUrl({ type }: AuthFormProps) {
  return (
    <div className="mt-1 space-x-1 text-center text-xs">
      {type === "login" ? (
        <>
          <span> Don&apos;t have an account?</span>
          <Link
            className="relative ml-auto inline-block text-xs font-bold transition duration-300 ease-in-out"
            href="/sign-up"
          >
            <span className="before:absolute before:-bottom-0.5 before:left-0 before:h-[2px] before:w-0 before:bg-current before:transition-all before:duration-300 before:ease-in-out hover:before:w-full">
              Sign up
            </span>
          </Link>
        </>
      ) : (
        <>
          <span>Already have an account?</span>
          <Link
            className="relative ml-auto inline-block text-xs font-bold transition duration-300 ease-in-out"
            href="/sign-in"
          >
            <span className="before:absolute before:-bottom-0.5 before:left-0 before:h-[2px] before:w-0 before:bg-current before:transition-all before:duration-300 before:ease-in-out hover:before:w-full">
              Sign In
            </span>
          </Link>
        </>
      )}
    </div>
  );
}
