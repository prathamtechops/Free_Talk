"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserInterface } from "@/database/user.model";
import { addComment } from "@/lib/actions/comment.action";
import { createPost } from "@/lib/actions/post.action";
import { avatarInputSchema } from "@/lib/validation";
import { useCommentStore } from "@/store/comment.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReplyIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ThoughtBubbleCloudIcon } from "../icons";
import UsersAvatar from "../shared/UsersAvatar";
import { useToast } from "../ui/use-toast";

interface AvatarInputProps {
  user: UserInterface;
  placeholder?: string;
  type: "post" | "comment";
  postId?: string;
}

export const AvatarInputField = ({
  user,
  placeholder,
  type,
  postId,
}: AvatarInputProps) => {
  const form = useForm<z.infer<typeof avatarInputSchema>>({
    resolver: zodResolver(avatarInputSchema),
    defaultValues: {
      input: "",
    },
  });

  const { toast } = useToast();

  const commentCount = useCommentStore((state) => state.commentCounts);
  const setCommentCount = useCommentStore((state) => state.setCommentCount);
  const pathname = usePathname();

  async function onSubmit(values: z.infer<typeof avatarInputSchema>) {
    const { input } = values;

    if (type === "comment" && postId) {
      const currentCommentCount =
        commentCount[JSON.parse(postId).toString()] || 0;
      const increment = currentCommentCount + 1;
      setCommentCount(JSON.parse(postId).toString(), increment);
      try {
        const res = await addComment({
          postId: JSON.parse(postId),
          authorId: user._id,
          content: input,
          path: pathname,
        });

        if (res?.success) {
          toast({
            title: res?.message,
            variant: "success",
          });

          form.reset();
        }
      } catch (error) {
        toast({
          title: error instanceof Error ? error.message : "Unknown error",
        });

        setCommentCount(JSON.parse(postId).toString(), currentCommentCount);
      }
    }

    if (type === "post") {
      try {
        const res = await createPost({
          author: user.clerkId,
          content: input,
          path: pathname,
          tags: [],
        });

        if (res?.success) {
          toast({
            title: res?.message,
            variant: "success",
          });

          form.reset();
        }
      } catch (error) {
        toast({
          title: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="flex w-full justify-between">
          <div className="flex w-full">
            <UsersAvatar avatar={user?.avatar} />
            <FormField
              control={form.control}
              name="input"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={placeholder}
                      className="border-none shadow-none focus:bg-background focus:ring-0 focus-visible:bg-background focus-visible:ring-0 "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {type === "post" && (
            <button type="submit">
              <ThoughtBubbleCloudIcon className="ml-2 size-6 text-muted-foreground" />
            </button>
          )}
          {type === "comment" && (
            <button type="submit">
              <ReplyIcon className="ml-2 size-6 text-muted-foreground" />
            </button>
          )}
        </div>
      </form>
    </Form>
  );
};
