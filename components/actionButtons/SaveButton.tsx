"use client";

import { saveOrUnsavePost } from "@/lib/actions/post.action";
import { cn } from "@/lib/utils";
import { useSavedStore } from "@/store/saved.store";
import { SavedButtonProps } from "@/types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SaveIcon } from "../icons";
import { PostSavedByUser } from "../shared/PostSaveByUsers";

const SaveButton = ({
  iconStyle,
  post,
  showText,
  userId,
  isSaved,
}: SavedButtonProps) => {
  const saved = useSavedStore((state) => state.saved);
  const setSaved = useSavedStore((state) => state.setSaved);
  const pathname = usePathname();
  const [totalSaved, setTotalSaved] = useState<number>(post.saved.length);
  const [like] = useState<boolean>(saved[post?._id.toString()] || isSaved);

  useEffect(() => {
    setSaved(post?._id, like);
  }, [post?._id]);

  const handleSave = async () => {
    const value = !saved[post?._id.toString()];

    const currentTotalSaved = totalSaved;

    const currentValue = saved[post?._id.toString()];

    if (value) {
      setTotalSaved(currentTotalSaved + 1);
    } else {
      setTotalSaved(currentTotalSaved - 1);
    }

    setSaved(post?._id, value);

    try {
      await saveOrUnsavePost({ userId, postId: post._id, pathname });
    } catch (err) {
      console.log(err);
      setSaved(post._id, currentValue);
      setTotalSaved(currentTotalSaved);
    }
  };

  return (
    <>
      <SaveIcon
        onClick={handleSave}
        className={cn(
          "size-4 text-muted-foreground cursor-pointer",
          iconStyle,
          {
            "text-primary fill-primary border-none":
              saved[post?._id.toString()],
          }
        )}
      />
      <p className="space-x-1">
        <span>{totalSaved}</span>
        {showText && <PostSavedByUser postId={post._id} userId={userId} />}
      </p>
    </>
  );
};

export default SaveButton;
