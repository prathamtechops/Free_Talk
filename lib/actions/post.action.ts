"use server";

import Post, { IPost } from "@/database/post.model";
import Tag from "@/database/tag.model";
import User, { IUser } from "@/database/user.model";
import { Schema } from "mongoose";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoConnect";
import {
  CreatePostParams,
  GetUserFeedParams,
  GetUserPostParams,
} from "./shared.types";

export async function createPost(params: CreatePostParams) {
  try {
    await connectToDatabase();

    const { content, tags, author, imageUrl, path } = params;

    const user: IUser | null = await User.findOne({ clerkId: author });

    if (!user) {
      throw new Error("User not found");
    }

    const newPost: IPost | null = await Post.create({
      content,
      author: user._id,
      imageUrl,
    });

    if (!newPost) {
      throw new Error("Post not created");
    }

    const tagDocuments: Schema.Types.ObjectId[] = [];

    for (const tag of tags) {
      const tagDocument = await Tag.findOneAndUpdate(
        {
          name: {
            $regex: new RegExp(`^${tag}$`, "i"),
          },
        },
        {
          $setOnInsert: {
            name: tag,
            createdAt: new Date(),
          },
          $push: {
            posts: newPost._id,
          },
        },
        { upsert: true, new: true }
      );

      tagDocuments.push(tagDocument._id);
    }

    await Post.findByIdAndUpdate(newPost._id, {
      $push: {
        tags: {
          $each: tagDocuments,
        },
      },
    });

    await User.findByIdAndUpdate(user._id, {
      $push: {
        posts: newPost._id,
      },
    });

    revalidatePath(path);

    return {
      success: true,
      message: "Post created successfully",
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}

export async function getUserPosts(params: GetUserPostParams) {
  try {
    await connectToDatabase();

    const { userId, page = 1, limit = 10 } = params;

    const user: IUser | null = await User.findById(userId)
      .populate({
        path: "posts",
        select: "content imageUrl likes comments",
        options: {
          sort: { createdAt: -1 },
          skip: (page - 1) * limit,
          limit,
        },
      })
      .exec();

    if (!user) {
      throw new Error("User not found");
    }

    const totalPosts = await Post.countDocuments({ author: userId });

    return {
      posts: JSON.parse(JSON.stringify(user.posts)),
      totalPages: Math.ceil(totalPosts / limit),
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}

export async function getUserFeed(params: GetUserFeedParams) {
  try {
    await connectToDatabase();

    const { userId, page = 1, limit = 5 } = params;

    const user: IUser | null = await User.findById(userId)
      .select("following")
      .exec();

    if (!user) {
      throw new Error("User not found");
    }

    const userAndFollowingIds = [user._id, ...user.following];

    const post = await Post.find({ author: { $in: userAndFollowingIds } })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({
        path: "author",
        select: "_id username name avatar",
      })
      .populate({
        path: "tags",
        select: "_id username name",
      })
      .populate({
        path: "comment",
        select: "content author",
        populate: {
          path: "author",
          select: "name avatar",
        },
        options: {
          sort: { createdAt: -1 },
        },
      })
      .exec();

    const totalPosts = await Post.countDocuments({
      author: { $in: userAndFollowingIds },
    });

    return {
      posts: JSON.parse(JSON.stringify(post)),
      totalPages: Math.ceil(totalPosts / limit),
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}
