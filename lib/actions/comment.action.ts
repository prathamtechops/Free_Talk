"use server";

import Comment, { IComment } from "@/database/comment.model";
import Post, { IPost } from "@/database/post.model";
import User, { IUser } from "@/database/user.model";
import { Schema } from "mongoose";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoConnect";

interface AddCommentParams {
  postId: Schema.Types.ObjectId;
  authorId: Schema.Types.ObjectId;
  content: string;
  path: string;
}

export async function addComment(params: AddCommentParams) {
  try {
    await connectToDatabase();

    const { postId, authorId, content } = params;

    const [author, post]: [IUser | null, IPost | null] = await Promise.all([
      User.findById(authorId).exec(),
      Post.findById(postId).exec(),
    ]);

    if (!author) {
      throw new Error("Author not found");
    }

    if (!post) {
      throw new Error("Post not found");
    }

    const comment: IComment = await Comment.create({
      author: authorId,
      post: postId,
      content,
    });

    await Post.findByIdAndUpdate(postId, {
      $push: { comments: comment._id },
    });

    revalidatePath(params.path);

    return {
      success: true,
      message: "Comment added successfully",
      comment,
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}
