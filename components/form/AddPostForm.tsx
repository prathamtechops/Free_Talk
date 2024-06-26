"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createPost } from "@/lib/actions/post.action";
import { useEdgeStore } from "@/lib/edgestore";
import { addPostSchema } from "@/lib/validation";
import { useAddPostModal } from "@/store/addPost.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Cross1Icon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";

type AddPostFormProps = {
  url: string;
  author: string;
};

const AddPostForm = ({ url, author }: AddPostFormProps) => {
  const form = useForm<z.infer<typeof addPostSchema>>({
    resolver: zodResolver(addPostSchema),
    defaultValues: {
      content: "",
      tags: [] as string[],
    },
  });

  const { edgestore } = useEdgeStore();
  const pathname = usePathname();
  const { toast } = useToast();
  const setOpen = useAddPostModal((state) => state.toggleDialog);

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();

      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();
      if (tagValue?.length === 0) return;
      if (tagValue !== "") {
        if (field.value.length >= 5) {
          return form.setError("tags", {
            type: "required",
            message: "You can only add up to 5 tags",
          });
        }
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "Tag must be at most 15 characters",
          });
        }

        if (!field.value.includes(tagValue as never)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
        }
      } else {
        form.trigger();
      }
    }
  };

  const handleTagRemove = (tag: string, field: any) => {
    const newtags = field.value.filter((t: string) => t !== tag);
    form.setValue("tags", newtags);
  };

  async function onSubmit(values: z.infer<typeof addPostSchema>) {
    try {
      await edgestore.publicFiles.confirmUpload({
        url,
      });
      const res = await createPost({
        content: values.content,
        tags: values.tags,
        author,
        imageUrl: url,
        path: pathname,
      });

      if (res.success) {
        toast({
          description: res.message,
          variant: "success",
        });

        setOpen();
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        description: (err as Error).message,
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-5 min-w-[300px] space-y-4"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Caption</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add caption"
                  className="h-20 resize-none"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags (Optional)</FormLabel>
              <FormControl>
                <>
                  <Input
                    onKeyDown={(e) => {
                      handleInputKeyDown(e, field);
                    }}
                  />
                  {field.value?.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap items-start gap-2.5">
                      {field.value.map((tag, index) => (
                        <Badge
                          variant={"outline"}
                          className="flex items-center justify-center gap-2 rounded-md border-none bg-muted px-4 py-2 text-xs capitalize text-muted-foreground"
                          key={index}
                        >
                          {tag}
                          <Cross1Icon
                            onClick={() => handleTagRemove(tag, field)}
                            className="cursor-pointer"
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription className="text-xs">
                Add up to 5 tags.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <Button
          isLoading={form.formState.isSubmitting}
          className="w-full"
          type="submit"
        >
          Submit
        </Button> */}

        <Button
          isLoading={form.formState.isSubmitting}
          className="w-full"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AddPostForm;
