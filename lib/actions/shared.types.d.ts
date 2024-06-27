import { IUser } from "@/database/user.model";
import { Schema } from "mongoose";

export interface CreateUserParams {
  username: string;
  email: string;
  name: string;
  clerkId: string;
  avatar: string;
}

export interface GetUserById {
  id: Schema.Types.ObjectId | string | undefined;
}

export interface GetUserByClerkId {
  clerkId: string | null;
}

export interface UpdateUserParams {
  clerkId: string;
  updateData: Partial<IUser>;
  path: string;
}

export interface GetSuggestedUsers {
  userId: string | null;
}

export interface CreatePostParams {
  content: string;
  tags: string[];
  author: string;
  imageUrl: string;
  path: string;
}

export interface GetUserPostParams {
  userId: Schema.Types.ObjectId;
  limit?: number;
  page?: number;
}

export interface GetUserFeedParams {
  userId: Schema.Types.ObjectId;
  limit?: number;
  page?: number;
}

export interface GetPostByIdParams {
  postId: string | Schema.Types.ObjectId;
}

export interface GetLikesAndCommentsByPostIdParams {
  postId: string | Schema.Types.ObjectId;
  page?: number;
  limit?: number;
}

export interface FollowRequestParams {
  userId: Schema.Types.ObjectId;
  potentialUserId: Schema.Types.ObjectId;
  pathname: string;
}
