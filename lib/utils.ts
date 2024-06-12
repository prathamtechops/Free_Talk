import User from "@/database/user.model";
import { clsx, type ClassValue } from "clsx";
import { Schema } from "mongoose";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getMutualFollowersCount = async (
  userId: string,
  potentialUserId: string
) => {
  const user = await User.findById(userId).select("following");
  const potentialUser =
    await User.findById(potentialUserId).select("followers");

  if (!user || !potentialUser) return 0;

  const mutualFollowers = user.following.filter(
    (followingId: Schema.Types.ObjectId) =>
      potentialUser.followers.includes(followingId)
  );

  return mutualFollowers.length;
};
