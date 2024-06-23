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
    totalPages: number;
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
    if (inView && userPosts.totalPages > page) {
      fetchMoreData();
    }
  }, [inView, fetchMoreData]);

  return (
    <div className="flex flex-wrap gap-4 ">
      {posts?.map((post) => (
        <PostComponent key={post._id.toString()} post={post} />
      ))}
      <div ref={ref} />
    </div>
  );
};

export default UserPosts;
