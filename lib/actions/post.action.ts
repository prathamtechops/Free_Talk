"use server";

import Comment, { CommentInterface, IComment } from "@/database/comment.model";
import Post, { IPost } from "@/database/post.model";
import Tag from "@/database/tag.model";
import User, { IUser, UserInterface } from "@/database/user.model";
import { PostPage } from "@/types";
import { Schema } from "mongoose";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoConnect";
import {
  CreatePostParams,
  GetLikesAndCommentsByPostIdParams,
  GetPostByIdParams,
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

export async function getPostById(params: GetPostByIdParams) {
  try {
    await connectToDatabase();

    const { postId } = params;

    const post: IPost | null = await Post.findById(postId).populate({
      path: "author",
      select: "_id username name avatar clerkId",
    });

    if (!post) {
      throw new Error("Post not found");
    }

    return JSON.parse(JSON.stringify(post)) as PostPage;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}

export async function getCommentsByPostId(
  params: GetLikesAndCommentsByPostIdParams
) {
  try {
    await connectToDatabase();

    const { postId, page = 1, limit = 20 } = params;

    const comments: IComment[] = await Comment.find({ post: postId })
      .populate({
        path: "author",
        select: "_id username name avatar clerkId",
      })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const totalComments = await Comment.countDocuments({ post: postId });

    const resultComments = {
      comments: JSON.parse(JSON.stringify(comments)) as CommentInterface[],
      totalPages: Math.ceil(totalComments / limit),
    };

    return resultComments;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}

export async function getLikesByPostId(
  params: GetLikesAndCommentsByPostIdParams
) {
  try {
    await connectToDatabase();

    const { postId, page = 1, limit = 20 } = params;

    // Find the post to get the likes array
    const post: IPost | null = await Post.findById(postId)
      .select("likes")
      .lean();

    if (!post) {
      throw new Error("Post not found");
    }

    // Get the total count of likes
    const totalLikes = post.likes.length;

    // Paginate the likes array
    const paginatedLikes = post.likes.slice((page - 1) * limit, page * limit);

    // Populate the user data for the paginated likes
    const users: IUser[] = await User.find({ _id: { $in: paginatedLikes } })
      .select("_id username name avatar clerkId")
      .lean();

    const resultLikes = {
      likes: users as UserInterface[],
      totalPages: Math.ceil(totalLikes / limit),
    };

    return resultLikes;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}
