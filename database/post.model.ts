import { Document, Schema, model, models } from "mongoose";

export interface PostInterface {
  _id: Schema.Types.ObjectId;
  author: Schema.Types.ObjectId;
  imageUrl: string;
  tags: Schema.Types.ObjectId[];
  content: string;
  likes: Schema.Types.ObjectId[];
  comments: Schema.Types.ObjectId[];
  shares: Schema.Types.ObjectId[];
  saved: Schema.Types.ObjectId[];
  createdAt: Date;
}

export interface IPost extends Document, Omit<PostInterface, "_id"> {}

export const PostSchema = new Schema<IPost>({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: "User", required: false }],
  imageUrl: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag", required: false }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment", required: false }],
  shares: [{ type: Schema.Types.ObjectId, ref: "User", required: false }],
  saved: [{ type: Schema.Types.ObjectId, ref: "User", required: false }],
  createdAt: { type: Date, default: Date.now },
});

const Post = models?.Post || model<IPost>("Post", PostSchema);

export default Post;
