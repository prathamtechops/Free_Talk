"use client";

import { cn } from "@/lib/utils";
import { Share1Icon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

type ShareProfileProps = {
  userId: string | null;
  className?: string;
  username: string;
};
export const ShareProfile = ({
  userId,
  className,
  username,
}: ShareProfileProps) => {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `https://free-talk-iota.vercel.app/profile/${userId}`
    );

    toast({
      description: (
        <span className="font-sans text-sm font-bold">
          Copied {username || userId} profile link to clipboard
        </span>
      ),
    });
  };

  return (
    <Button className={cn("w-full", className)} onClick={handleCopy}>
      <div className="flex items-center gap-2">
        <Share1Icon />
        <p>Share</p>
      </div>
    </Button>
  );
};
