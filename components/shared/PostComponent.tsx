"use client";

import { PostInterface } from "@/database/post.model";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CommentIcon, HeartIcon } from "../icons";

export function PostComponent({ post }: { post: PostInterface }) {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div
      className="relative size-36 xs:size-40 sm:size-48 md:size-52  xl:size-56"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={`/post/${post._id}`}>
        <Image
          src={post.imageUrl}
          alt={post.content}
          className="absolute aspect-square object-cover"
          fill
        />
        {hovered && (
          <div className="absolute inset-0 flex items-center justify-center gap-4  bg-black/50 text-white">
            <p className="flex items-center gap-2">
              <HeartIcon className="size-6" /> {post.likes.length}
            </p>
            <p className="flex items-center gap-2">
              <CommentIcon className="size-6" /> {post.comments.length}
            </p>
          </div>
        )}
      </Link>
    </div>
  );
}
