"use server";

import Notification from "@/database/notification.model";
import User from "@/database/user.model";
import { Schema } from "mongoose";
import { connectToDatabase } from "../mongoConnect";

interface GetUserNotification {
  userId: Schema.Types.ObjectId;
}

export async function getUserNotifications(params: GetUserNotification) {
  try {
    await connectToDatabase();

    const { userId } = params;
    const user = await User.findById(userId).populate({
      path: "notification",
      select: "senderId content read createdAt type",
      populate: { path: "senderId", select: "_id clerkId username avatar" },
      match: { expiresAt: { $gte: new Date() } },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const unreadNotifications = user.notification.filter(
      (notification: any) => !notification.read
    );

    return {
      success: true,
      notifications: JSON.parse(JSON.stringify(user.notification)),
      unreadCount: unreadNotifications.length,
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}

interface MarkNotificationAsRead {
  userId: Schema.Types.ObjectId;
}

export async function readAllNotifications(params: MarkNotificationAsRead) {
  try {
    await connectToDatabase();

    const { userId } = params;

    await Notification.updateMany(
      { receiverId: userId, read: false },
      { $set: { read: true } }
    );

    return { success: true };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}
