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

export const getTimestamp = (createdAt: Date | null | undefined): string => {
  if (!createdAt) return "";

  const currentDate = new Date();
  const createdDate = new Date(createdAt);
  const timeDiff = currentDate.getTime() - createdDate.getTime();

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return years === 1 ? "1 year ago" : `${years} years ago`;
  } else if (months > 0) {
    return months === 1 ? "1 month ago" : `${months} months ago`;
  } else if (days > 0) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  } else if (hours > 0) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else if (minutes > 0) {
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  } else {
    return seconds <= 1 ? "just now" : `${seconds} seconds ago`;
  }
};
