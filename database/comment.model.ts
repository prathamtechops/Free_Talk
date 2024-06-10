import { Document, Schema, model, models } from "mongoose";

export interface IComment extends Document {
  author: Schema.Types.ObjectId;
  post: Schema.Types.ObjectId;
  content: string;
  createdAt: Date;
}

export const CommentSchema = new Schema<IComment>({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Comment = models?.Comment || model<IComment>("Comment", CommentSchema);

export default Comment;
