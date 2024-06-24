"use client";
import { PostCard } from "@/components/shared/PostCard";
import { getUserFeed } from "@/lib/actions/post.action";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Schema } from "mongoose";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface PostFeedInterface {
  userId: Schema.Types.ObjectId;
  posts: any;
  totalPages: number;
}

const Feeds = ({ userId, posts, totalPages }: PostFeedInterface) => {
  const [postsToShow, setPostsToShow] = useState(posts);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();

  const fetchMoreData = useCallback(async () => {
    const next = page + 1;
    const newPosts = await getUserFeed({
      userId,
      page: next,
    });
    if (newPosts?.posts.length > 0) {
      setPostsToShow([...postsToShow, ...newPosts.posts]);
      setPage(next);
    }
  }, [userId, page, postsToShow]);

  useEffect(() => {
    if (inView && totalPages > page) {
      fetchMoreData();
    }
  }, [inView, fetchMoreData, page, totalPages]);

  return (
    <div className="space-y-4">
      {postsToShow?.map((post: any) => (
        <PostCard key={post._id.toString()} post={post} />
      ))}
      <div ref={ref}>
        {totalPages > page && (
          <div className="text-center">
            <ReloadIcon className="mx-auto animate-spin text-3xl text-primary" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Feeds;
