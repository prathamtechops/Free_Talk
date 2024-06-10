import { IUser } from "@/database/user.model";
import { Schema } from "mongoose";

export interface CreateUserParams {
  username: string;
  email: string;
  name: string;
  clerkId: string;
  avatar: string;
}

export interface GetVerificationTokenByEmail {
  email: string;
}

export interface GetVerificationTokenByToken {
  token: string;
}

export interface VerificationTokenId {
  id: Schema.Types.ObjectId;
}

export interface CreateVerificationToken {
  email: string;
  token: string;
  expires: Date;
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
