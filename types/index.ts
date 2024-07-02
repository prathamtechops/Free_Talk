import { Schema } from "mongoose";
import React from "react";

export type AuthFormProps = {
  type: "login" | "register";
};

export interface UserAvatarTypes {
  name?: string;
  avatar?: string;
  subText?: string;
  className?: string;
  avatarSize?: string;
  textClassName?: string;
  children?: React.ReactNode;
}

export interface UserSessionTypes {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
}

export interface ParamsProps {
  params: { id: string };
}

export interface SearchParamsProps {
  searchParams?: { [key: string]: string | undefined };
}

export interface URLProps {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}

export interface DialogParams {
  trigger: React.ReactNode;
  user?: string;
}

export interface PostPage {
  _id: Schema.Types.ObjectId;
  author: {
    _id: Schema.Types.ObjectId;
    name: string;
    username: string;
    avatar: string;
    clerkId: string;
  };
  imageUrl: string;
  tags: Schema.Types.ObjectId[];
  content: string;
  likes: Schema.Types.ObjectId[];
  comments: Schema.Types.ObjectId[];
  shares: Schema.Types.ObjectId[];
  saved: Schema.Types.ObjectId[];
  createdAt: Date;
}

export interface LikeButtonProps {
  iconStyle?: string;
  post: PostPage;
  showText?: boolean;
  userId: Schema.Types.ObjectId;
  isLiked: boolean;
}
