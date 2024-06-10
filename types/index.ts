import { DefaultSession } from "next-auth";

export interface UserInterface {
  _id: string;
  username: string;
  bio: string;
  password: string;
  email: string;
  avatar: string;
  emailVerified: boolean;
  chats: string[];
  posts: string[];
  followers: string[];
  following: string[];
  createdAt: Date;
}

export type User = DefaultSession["user"] & UserInterface;

declare module "next-auth" {
  // eslint-disable-next-line no-unused-vars
  interface User extends UserInterface {}
}

export type AuthFormProps = {
  type: "login" | "register";
};

export interface UserAvatarTypes {
  name?: string | null | undefined;
  avatar: string;
  subText?: string | null | undefined;
  className?: string;
  avatarSize?: string;
  textClassName?: string;
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
  searchParams: { [key: string]: string | undefined };
}

export interface URLProps {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}
