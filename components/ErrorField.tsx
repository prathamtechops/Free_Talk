"use client";
import { TriangleAlertIcon } from "./icons";
import { Alert, AlertTitle } from "./ui/alert";

export const ErrorField = ({ message }: { message: string | null }) => {
  return (
    message && (
      <Alert variant="destructive" className="w-full max-w-md ">
        <div className="flex items-center gap-4">
          <TriangleAlertIcon className="size-6 text-red-500" />
          <AlertTitle className="text-red-500 ">{message}</AlertTitle>
        </div>
      </Alert>
    )
  );
};
