"use server";

import User, { IUser } from "@/database/user.model";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoConnect";
import { FollowRequestParams } from "./shared.types";

export async function sendFollowRequest(params: FollowRequestParams) {
  try {
    await connectToDatabase();

    const { userId, potentialUserId, pathname } = params;

    const user: IUser | null = await User.findById(userId);
    const potentialUser: IUser | null = await User.findById(potentialUserId);

    if (!user) {
      throw new Error("User not found");
    }

    if (!potentialUser) {
      throw new Error("Potential user not found");
    }

    if (user.followRequestSent.includes(potentialUserId)) {
      throw new Error("Follow request already sent");
    }

    // TODO: Send notification

    await Promise.all([
      User.findByIdAndUpdate(userId, {
        $addToSet: { followRequestSent: potentialUserId },
      }),
      User.findByIdAndUpdate(potentialUserId, {
        $addToSet: { followRequests: userId },
      }),
    ]);

    revalidatePath(pathname);

    return {
      success: true,
      message: "Follow request sent successfully",
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}

export async function acceptFollowRequest(params: FollowRequestParams) {
  try {
    await connectToDatabase();

    const { userId, potentialUserId, pathname } = params;

    const user: IUser | null = await User.findById(userId);
    const potentialUser: IUser | null = await User.findById(potentialUserId);

    if (!user) {
      throw new Error("User not found");
    }

    if (!potentialUser) {
      throw new Error("Potential user not found");
    }

    if (!user.followRequests.includes(potentialUserId)) {
      throw new Error("Follow request not found");
    }

    // TODO: Send notification

    await Promise.all([
      User.findByIdAndUpdate(userId, {
        $pull: { followRequests: potentialUserId },
        $addToSet: { followers: potentialUserId },
      }),
      User.findByIdAndUpdate(potentialUserId, {
        $pull: { followRequestSent: userId },
        $addToSet: { following: userId },
      }),
    ]);

    revalidatePath(pathname);

    return {
      success: true,
      message: "Follow request accepted successfully",
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}

export async function rejectFollowRequest(params: FollowRequestParams) {
  try {
    await connectToDatabase();

    const { userId, potentialUserId, pathname } = params;

    const user: IUser | null = await User.findById(userId);
    const potentialUser: IUser | null = await User.findById(potentialUserId);

    if (!user) {
      throw new Error("User not found");
    }

    if (!potentialUser) {
      throw new Error("Potential user not found");
    }

    if (!user.followRequests.includes(potentialUserId)) {
      throw new Error("Follow request not found");
    }

    await Promise.all([
      User.findByIdAndUpdate(userId, {
        $pull: { followRequests: potentialUserId },
      }),
      User.findByIdAndUpdate(potentialUserId, {
        $pull: { followRequestSent: userId },
      }),
    ]);

    revalidatePath(pathname);

    return {
      success: true,
      message: "Follow request rejected successfully",
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}

export async function removeFollowRequest(params: FollowRequestParams) {
  try {
    await connectToDatabase();

    const { userId, potentialUserId, pathname } = params;

    const user: IUser | null = await User.findById(userId);
    const potentialUser: IUser | null = await User.findById(potentialUserId);

    if (!user) {
      throw new Error("User not found");
    }

    if (!potentialUser) {
      throw new Error("Potential user not found");
    }

    if (!user.followRequestSent.includes(potentialUserId)) {
      throw new Error("Follow request not found");
    }

    if (!potentialUser.followRequests.includes(userId)) {
      throw new Error("Follow request not found");
    }

    await Promise.all([
      User.findByIdAndUpdate(userId, {
        $pull: { followRequestSent: potentialUserId },
      }),
      User.findByIdAndUpdate(potentialUserId, {
        $pull: { followRequests: userId },
      }),
    ]);

    revalidatePath(pathname);

    return {
      success: true,
      message: "Follow request removed successfully",
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}

export async function removeFollowing(params: FollowRequestParams) {
  try {
    await connectToDatabase();

    const { userId, potentialUserId, pathname } = params;

    const user: IUser | null = await User.findById(userId);
    const potentialUser: IUser | null = await User.findById(potentialUserId);

    if (!user) {
      throw new Error("User not found");
    }

    if (!potentialUser) {
      throw new Error("Potential user not found");
    }

    if (!user.following.includes(potentialUserId)) {
      throw new Error("Following not found");
    }

    if (!potentialUser.followers.includes(userId)) {
      throw new Error("Follower not found");
    }

    await Promise.all([
      User.findByIdAndUpdate(userId, {
        $pull: { following: potentialUserId },
      }),
      User.findByIdAndUpdate(potentialUserId, {
        $pull: { followers: userId },
      }),
    ]);

    revalidatePath(pathname);

    return {
      success: true,
      message: "Following removed successfully",
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}

export async function removeFollower(params: FollowRequestParams) {
  try {
    await connectToDatabase();

    const { userId, potentialUserId, pathname } = params;

    const user: IUser | null = await User.findById(userId);
    const potentialUser: IUser | null = await User.findById(potentialUserId);

    if (!user) {
      throw new Error("User not found");
    }

    if (!potentialUser) {
      throw new Error("Potential user not found");
    }

    if (!user.followers.includes(potentialUserId)) {
      throw new Error("Follower not found");
    }

    if (!potentialUser.following.includes(userId)) {
      throw new Error("Following not found");
    }

    await Promise.all([
      User.findByIdAndUpdate(userId, {
        $pull: { followers: potentialUserId },
      }),
      User.findByIdAndUpdate(potentialUserId, {
        $pull: { following: userId },
      }),
    ]);

    revalidatePath(pathname);

    return {
      success: true,
      message: "Following removed successfully",
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}
