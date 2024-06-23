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
  likes: Schema.Types.ObjectId[];
  comments: {
    _id: Schema.Types.ObjectId;
    content: string;
    author: {
      _id: Schema.Types.ObjectId;
      clerkId: string;
      avatar: string;
      username: string;
      name: string;
    };
  }[];
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
            name={post.author.name}
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
        <div className="relative w-full h-80 mt-4">
          <Image
            src={post.imageUrl}
            alt={post.content}
            fill
            className="object-cover aspect-square absolute"
          />
        </div>
      </CardContent>
      <div className="border-b-2" />
      <CardFooter>
        <Metrics />
      </CardFooter>
    </Card>
  );
};
