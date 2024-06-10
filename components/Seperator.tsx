"use client";
export const Seperator = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <span className="h-[2px] w-full bg-muted"></span>
      <span className="w-full text-center text-xs font-medium text-muted-foreground">
        or continue with
      </span>
      <span className="h-[2px] w-full bg-muted"></span>
    </div>
  );
};
