import { UserInterface } from "@/database/user.model";
import { Schema } from "mongoose";
import React from "react";

export type AuthFormProps = {
  type: "login" | "register";
};

export interface UserAvatarTypes {
  currentUser?: UserInterface;
  name?: string | null | undefined;
  avatar?: string | undefined;
  subText?: string | null | undefined;
  className?: string;
  avatarSize?: string;
  textClassName?: string;
  userId?: Schema.Types.ObjectId;
  showFollowButton?: boolean;
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
}
