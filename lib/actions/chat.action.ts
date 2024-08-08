"use server";

import Chat, { IChat } from "@/database/chat.model";
import Message from "@/database/message.model";
import User from "@/database/user.model";
import { Schema } from "mongoose";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoConnect";

export interface CreateChatParams {
  participants: Schema.Types.ObjectId[];
}

export async function createChat(params: CreateChatParams) {
  try {
    await connectToDatabase();

    const { participants } = params;
    const getUsers = await User.find({
      _id: {
        $in: participants,
      },
    });

    if (getUsers.length !== participants.length) {
      throw new Error("User not found");
    }

    const existingChat = await Chat.findOne({
      participants: { $all: participants, $size: participants.length },
    });

    if (existingChat) {
      return existingChat;
    }

    const newChat = await Chat.create({
      participants,
      messages: [],
      lastMessage: "",
      lastMessageTime: new Date(),
    });

    await User.updateMany(
      {
        _id: {
          $in: participants,
        },
      },
      {
        $push: {
          chats: newChat._id,
        },
      }
    );

    revalidatePath("/chat");
  } catch (error) {
    console.error(error);
  }
}
export const getAllChats = async (userId: Schema.Types.ObjectId) => {
  try {
    await connectToDatabase();

    const chats: IChat[] = await Chat.find({
      participants: {
        $in: [userId],
      },
    })
      .populate("participants", "name avatar clerkId username")
      .sort({
        lastMessageTime: -1,
      });

    const usersWithLastMessages = chats
      .map((chat) => {
        const otherParticipants = chat.participants.filter(
          (participant: any) => !participant._id.equals(userId)
        );

        return otherParticipants.map((participant) => ({
          user: participant,
          lastMessage: chat.lastMessage
            ? chat.lastMessage
            : "Start a conversation",
          lastMessageTime: chat.lastMessageTime,
        }));
      })
      .flat();

    return JSON.parse(JSON.stringify(usersWithLastMessages));
  } catch (error) {
    console.error(error);
  }
};

export const getChat = async (
  userId: Schema.Types.ObjectId,
  potentialUserId: Schema.Types.ObjectId
) => {
  try {
    await connectToDatabase();

    const chat = await Chat.findOne({
      participants: {
        $all: [userId, potentialUserId],
      },
    })
      .populate("participants", "name avatar clerkId username")
      .populate("messages", "sender content createdAt")
      .sort({
        lastMessageTime: -1,
      });

    return JSON.parse(JSON.stringify(chat));
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export interface SendMessageParams {
  chatId: Schema.Types.ObjectId;
  senderId: Schema.Types.ObjectId;
  content: string;
  path: string;
}

export async function sendMessage(params: SendMessageParams) {
  try {
    await connectToDatabase();

    const { chatId, senderId, content, path } = params;

    // Create a new message
    const newMessage = await Message.create({
      sender: senderId,
      chat: chatId,
      content,
      createdAt: new Date(),
    });

    await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { messages: newMessage._id },
        lastMessage: content,
        lastMessageTime: new Date(),
      },
      { new: true }
    ).populate("participants", "name avatar clerkId username");

    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
