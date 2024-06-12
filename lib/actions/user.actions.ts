"use server";

import User, { IUser, UserInterface } from "@/database/user.model";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoConnect";
import {
  CreateUserParams,
  GetUserByClerkId,
  GetUserById,
  UpdateUserParams,
} from "./shared.types";

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

export async function getUserByClerkId(params: GetUserByClerkId) {
  try {
    connectToDatabase();
    const { clerkId } = params;
    const user: IUser | null = await User.findOne({
      clerkId,
    });

    return user as UserInterface;
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
    return user as IUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();

    const { clerkId, updateData, path } = params;
    await User.findOneAndUpdate({ clerkId }, updateData);

    revalidatePath(path);
  } catch (e) {
    console.log(e);
  }
}

export async function deleteUser(params: GetUserByClerkId) {
  try {
    connectToDatabase();
    const { clerkId } = params;
    const user = await User.findOneAndDelete({ clerkId });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
