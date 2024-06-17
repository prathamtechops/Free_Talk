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

export async function getUserPosts(params: GetUserPostParams) {
  try {
    await connectToDatabase();

    const { userId, page = 1, limit = 10 } = params;

    const user: IUser | null = await User.findById(userId)
      .populate({
        path: "posts",
        options: {
          sort: { createdAt: -1 },
          skip: (page - 1) * limit,
          limit,
        },
        populate: { path: "author tags likes comment shares" },
      })
      .exec();

    if (!user) {
      throw new Error("User not found");
    }

    const totalPosts = await Post.countDocuments({ author: userId });
    const fetchedPostsCount = (page - 1) * limit + user.posts.length;
    const hasMore = fetchedPostsCount < totalPosts;

    return {
      posts: JSON.parse(JSON.stringify(user.posts)),
      totalPosts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      hasMore,
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}
