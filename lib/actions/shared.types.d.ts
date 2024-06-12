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
