"use client";

import { UserInterface } from "@/database/user.model";
import { likeOrUnlikePost } from "@/lib/actions/post.action";
import { cn } from "@/lib/utils";
import { useLikesStore } from "@/store/like.store";
import { PostPage } from "@/types";
import { Heart } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PostLikedByUser } from "../shared/PostLikesByUser";

interface LikeButtonProps {
  iconStyle?: string;
  post: PostPage;
  showText?: boolean;
  user: UserInterface;
}

const LikeButton = ({ iconStyle, post, showText, user }: LikeButtonProps) => {
  const setLike = useLikesStore((state) => state.setLike);
  const likes = useLikesStore((state) => state.likes);
  const pathname = usePathname();
  const [totalLikes, setTotalLikes] = useState<number>(post.likes.length);
  const [like] = useState<boolean>(
    likes[post?._id.toString()] || !!user?.likes.includes(post?._id)
  );

  // const [userLikes, setUserLikes] = useState<UserInterface[]>([])
  // const [totalPages, setTotalPages] = useState<number>(0)

  // useEffect(()=>{
  //   const fetchLikeResults = async() => {
  //     const result = await getLikesByPostId({
  //       postId: post._id
  //     })

  //     setUserLikes(result.likes)
  //     setTotalPages(result.totalPages)
  //   }

  //   fetchLikeResults()
  // },[])

  useEffect(() => {
    setLike(post?._id, like);
  }, [like, post?._id, setLike]);

  const handleLike = async () => {
    const value = !likes[post?._id.toString()];

    const currentTotalLikes = totalLikes;

    const currentValue = likes[post?._id.toString()];

    if (value) {
      setTotalLikes(currentTotalLikes + 1);
    } else {
      setTotalLikes(currentTotalLikes - 1);
    }

    setLike(post?._id, value);

    try {
      await likeOrUnlikePost({ userId: user._id, postId: post._id, pathname });
    } catch (err) {
      console.log(err);
      setLike(post._id, currentValue);
      setTotalLikes(currentTotalLikes);
    }
  };

  return (
    <>
      <Heart
        onClick={handleLike}
        className={cn(
          "size-4 text-muted-foreground cursor-pointer",
          iconStyle,
          {
            "text-red-500 fill-red-500 border-none":
              likes[post?._id.toString()],
          }
        )}
      />
      <p className="space-x-1">
        <span>{totalLikes}</span>
        {showText && <PostLikedByUser postId={post._id} userId={user._id} />}
      </p>
    </>
  );
};

export default LikeButton;
