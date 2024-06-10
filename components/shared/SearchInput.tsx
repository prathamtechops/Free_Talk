import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "../ui/input";

export const SearchInput = ({
  className,
  iconDirection = "left",
  inputClassName,
}: {
  className?: string;
  iconDirection?: "left" | "right";
  inputClassName?: string;
}) => {
  return (
    <div className={cn("relative", className)}>
      <Input
        placeholder="Search"
        className={cn(
          "",
          {
            "pl-10": iconDirection === "left",
            "pr-10": iconDirection === "right",
          },
          inputClassName
        )}
      />
      {/* <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2" /> */}
      <MagnifyingGlassIcon
        className={cn(" size-5 absolute top-1/2 -translate-y-1/2", {
          "left-3": iconDirection === "left",
          "right-3": iconDirection === "right",
        })}
      />
    </div>
  );
};
