"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getCommentsByPostId } from "@/lib/actions/post.action";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Schema } from "mongoose";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import UsersAvatar from "./UsersAvatar";

interface PostCommentsInterface {
  postId: Schema.Types.ObjectId;
}

export function PostComments({ postId }: PostCommentsInterface) {
  const [userComments, setUserComments] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();
  const [loading, setLoading] = useState(false);

  const fetchCommentsResults = async () => {
    setLoading(true);
    try {
      const result = await getCommentsByPostId({
        postId,
      });

      setUserComments(result.comments);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommentsResults();
  }, []);

  const fetchMoreData = useCallback(async () => {
    const next = page + 1;
    const newComments = await getCommentsByPostId({
      postId,
      page: next,
    });
    if (newComments?.comments.length > 0) {
      setUserComments([...userComments, ...newComments.comments]);
      setPage(next);
    }
  }, [postId, page, userComments]);

  useEffect(() => {
    if (inView && totalPages > page) {
      fetchMoreData();
    }
  }, [inView, fetchMoreData]);
  return (
    <Dialog>
      <DialogTrigger>Comments</DialogTrigger>
      <DialogContent className="max-h-[70vh] overflow-auto  sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Comments</DialogTitle>
        </DialogHeader>
        <div className="w-full space-y-2">
          {userComments.map((data: any) => (
            <UsersAvatar
              key={data._id.toString()}
              avatar={data.author.avatar}
              name={data.content}
              subText={data.author.username}
              avatarSize="size-10"
              textClassName="flex flex-col-reverse"
            />
          ))}
        </div>
        <div ref={ref} />

        {loading && (
          <ReloadIcon className="mx-auto size-7 animate-spin text-center text-primary" />
        )}
      </DialogContent>
    </Dialog>
  );
}
