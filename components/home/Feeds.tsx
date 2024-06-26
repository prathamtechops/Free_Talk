"use client";
import { PostCard } from "@/components/shared/PostCard";
import { UserInterface } from "@/database/user.model";
import { getUserFeed } from "@/lib/actions/post.action";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface PostFeedInterface {
  user: UserInterface;
  posts: any;
  totalPages: number;
}

const Feeds = ({ user, posts, totalPages }: PostFeedInterface) => {
  const [postsToShow, setPostsToShow] = useState(posts);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();

  const fetchMoreData = useCallback(async () => {
    const next = page + 1;
    const newPosts = await getUserFeed({
      userId: user._id,
      page: next,
    });
    if (newPosts?.posts.length > 0) {
      setPostsToShow([...postsToShow, ...newPosts.posts]);
      setPage(next);
    }
  }, [user._id, page, postsToShow]);

  useEffect(() => {
    if (inView && totalPages > page) {
      fetchMoreData();
    }
  }, [inView, fetchMoreData, page, totalPages]);

  return (
    <div className="space-y-4">
      {postsToShow?.map((post: any) => (
        <PostCard
          key={post._id.toString()}
          user={JSON.parse(JSON.stringify(user))}
          post={post}
        />
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
