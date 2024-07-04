"use client";
import { CommentIcon, ShareIcon } from "@/components/icons";
import { UserInterface } from "@/database/user.model";
import { cn } from "@/lib/utils";
import { useCommentStore } from "@/store/comment.store";
import { PostPage } from "@/types";
import { useEffect } from "react";
import LikeButton from "../actionButtons/LikeButton";
import SaveButton from "../actionButtons/SaveButton";
import { PostComments } from "./PostComments";

interface MetricInterface {
  textStyles?: string;
  showText?: boolean;
  iconStyles?: string;
  post: PostPage;
  user?: UserInterface;
}

export const Metrics = ({
  post,
  textStyles,
  iconStyles,
  showText = true,
  user,
}: MetricInterface) => {
  const setCommentCount = useCommentStore((state) => state.setCommentCount);
  const commentCount = useCommentStore((state) => state.commentCounts);

  useEffect(() => {
    if (commentCount[post?._id.toString()]) return;
    setCommentCount(post?._id.toString(), post?.comments?.length || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex w-full justify-between">
      <div className={cn("flex items-center gap-2 text-xs", textStyles)}>
        <CommentIcon
          className={cn("size-4 text-muted-foreground", iconStyles)}
        />
        <p className="space-x-1 ">
          <span>{commentCount[post?._id.toString()]}</span>
          {showText && <PostComments postId={post._id} />}
        </p>
      </div>
      <div className={cn("flex items-center gap-2 text-xs", textStyles)}>
        <LikeButton
          iconStyle={iconStyles}
          post={post}
          showText={showText}
          userId={JSON.parse(JSON.stringify(user?._id))}
          isLiked={!!user?.likes.includes(post?._id)}
        />
      </div>
      <div className={cn("flex items-center gap-2 text-xs", textStyles)}>
        <ShareIcon className={cn("size-4 text-muted-foreground", iconStyles)} />
        <p className="space-x-1 ">
          <span>{post?.shares?.length}</span>
          {showText && <span>Shares</span>}
        </p>
      </div>
      <div className={cn("flex items-center gap-2 text-xs", textStyles)}>
        <SaveButton
          iconStyle={iconStyles}
          post={post}
          showText={showText}
          userId={JSON.parse(JSON.stringify(user?._id))}
          isSaved={!!user?.saved.includes(post?._id)}
        />
      </div>
    </div>
  );
};
