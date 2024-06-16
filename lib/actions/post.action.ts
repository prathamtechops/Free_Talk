"use server";

import Post, { IPost } from "@/database/post.model";
import Tag from "@/database/tag.model";
import User, { IUser } from "@/database/user.model";
import { Schema } from "mongoose";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoConnect";
import { CreatePostParams, GetUserPostParams } from "./shared.types";

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

export async function getUserPost(params: GetUserPostParams) {
  try {
    connectToDatabase();

    const { userId, limit, page } = params;

    const posts: IPost[] | null = await Post.find({ author: userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .populate("author tags likes comments shares")
      .exec();

    const totalPosts = await Post.countDocuments({ author: userId });

    const hasMore = totalPosts > (page - 1) * limit + posts.length;

    return {
      posts,
      totalPosts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      hasMore,
    };
  } catch (error) {}
}
