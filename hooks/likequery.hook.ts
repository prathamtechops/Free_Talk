"use client";
import { useLikesStore } from "@/store/like.store";
import { PostPage } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Schema } from "mongoose";
import {
  LikeOrUnlikePostParams,
  likeOrUnlikePost,
} from "./../lib/actions/post.action";

const useLikeOrUnlikePost = () => {
  const queryClient = useQueryClient();
  const setLikes = useLikesStore((state) => state.setLike);

  return useMutation({
    mutationFn: async ({ userId, postId }: LikeOrUnlikePostParams) => {
      return await likeOrUnlikePost({ userId, postId });
    },
    onMutate: async ({ userId, postId, value }: LikeOrUnlikePostParams) => {
      const previousPost = queryClient.getQueryData<PostPage>(["post", postId]);

      setLikes(postId, value || !previousPost?.likes.includes(userId));

      if (previousPost) {
        queryClient.setQueryData(["post", postId], (prev: any) => {
          if (prev) {
            return {
              ...prev,
              likes: value
                ? [...prev.likes, userId]
                : prev.likes.filter(
                    (id: Schema.Types.ObjectId) =>
                      id.toString() !== userId.toString()
                  ),
            };
          }
        });
      }

      return { previousPost };
    },
    onError: (_error, variables, context) => {
      queryClient.setQueryData(
        ["post", variables.postId],
        context?.previousPost
      );

      setLikes(variables.postId, !variables.value);
    },
  });
};

export default useLikeOrUnlikePost;
