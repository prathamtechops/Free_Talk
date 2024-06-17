"use client";

import { PostInterface } from "@/database/post.model";
import { getUserPosts } from "@/lib/actions/post.action";
import { Schema } from "mongoose";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { PostComponent } from "./PostComponent";

interface UserPostParams {
  userId: Schema.Types.ObjectId;
  userPosts: {
    posts: PostInterface[];
    totalPosts: number;
    currentPage: number;
    totalPages: number;
    hasMore: boolean;
  };
}

const UserPosts = ({ userId, userPosts }: UserPostParams) => {
  const [posts, setPosts] = useState<PostInterface[]>(userPosts.posts);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();

  const fetchMoreData = useCallback(async () => {
    const next = page + 1;
    const newPosts = await getUserPosts({
      userId,
      page: next,
    });
    if (newPosts?.posts.length > 0) {
      setPosts([...posts, ...newPosts.posts]);
      setPage(next);
    }
  }, [userId, page, posts]);

  useEffect(() => {
    if (inView) {
      fetchMoreData();
    }
  }, [inView, fetchMoreData]);

  return (
    <div className="scrollbar-hide grid max-h-[calc(100vh-200px)] grid-cols-1 gap-4  overflow-y-auto  md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {posts?.map((post) => (
        <div key={post._id.toString()}>
          <PostComponent post={post} />
        </div>
      ))}
      <div ref={ref} />
    </div>
  );
};

export default UserPosts;
