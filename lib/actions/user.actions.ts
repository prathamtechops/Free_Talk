"use server";

import User, { IUser } from "@/database/user.model";
import { UserInterface } from "@/types";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoConnect";
import { CreateUserParams, GetUserById } from "./shared.types";

export async function createUser(params: CreateUserParams) {
  try {
    connectToDatabase();
    const user = await User.create(params);
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserById(params: GetUserById) {
  try {
    connectToDatabase();
    const { id } = params;
    const user = await User.findById({
      _id: id,
    });
    return user as UserInterface;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export interface UpdateUserParams {
  username?: string;
  bio?: string;
  id: string;
  pathname: string;
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();
    const { username, id, bio, pathname } = params;

    const user: IUser | null = await User.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        username,
        bio,
      }
    );

    if (!user) throw new Error("User not found");

    revalidatePath(pathname);

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
