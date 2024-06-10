import Link from "next/link";
import React from "react";

export default function Component() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-gray-100 px-4 dark:bg-gray-800">
      <div className="mx-auto max-w-md space-y-4 text-center">
        <div className="inline-flex items-center rounded-full bg-red-100 p-2 dark:bg-red-900">
          <CircleAlertIcon className="size-6 text-red-500 dark:text-red-400" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Authentication Error
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          It looks like there was an issue with your authentication. Please sign
          in again to continue.
        </p>
        <Link
          href="/sign-in"
          className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
        >
          Sign in again
        </Link>
      </div>
    </div>
  );
}

function CircleAlertIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );
}
