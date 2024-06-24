import { MenuIcon } from "@/components/icons";
import { Metrics } from "@/components/shared/Metrics";
import UsersAvatar from "@/components/shared/UsersAvatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getTimestamp } from "@/lib/utils";

import { Schema } from "mongoose";
import Image from "next/image";
import Link from "next/link";

export interface PostCardInterface {
  _id: Schema.Types.ObjectId;
  author: {
    _id: Schema.Types.ObjectId;
    clerkId: string;
    avatar: string;
    username: string;
    name: string;
  };
  imageUrl: string;
  tags: Schema.Types.ObjectId[];
  content: string;
  saved: Schema.Types.ObjectId[];
  likes: Schema.Types.ObjectId[];
  comments: Schema.Types.ObjectId[];
  shares: Schema.Types.ObjectId[];
  createdAt: Date;
}

export const PostCard = ({ post }: { post: PostCardInterface }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <UsersAvatar
            avatar={post.author.avatar}
            name={post.author.username}
            subText={getTimestamp(post.createdAt)}
          />

          <DropdownMenu>
            <DropdownMenuTrigger>
              <MenuIcon className="size-6 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="flex  flex-col">
        <p className="text-pretty text-sm font-thin ">{post.content}</p>
        {/* /TODO: Add image */}
        <Link href={`/post/${post._id}`}>
          <div className="relative mt-4 h-96 w-full">
            <Image
              src={post.imageUrl}
              alt={post.content}
              fill
              className="absolute aspect-square object-cover"
            />
          </div>
        </Link>
      </CardContent>
      <div className="border-b-2" />
      <CardFooter>
        <Metrics
          comments={post.comments.length}
          likes={post.likes.length}
          shares={post.shares.length}
          saved={post?.saved?.length}
        />
      </CardFooter>
    </Card>
  );
};
