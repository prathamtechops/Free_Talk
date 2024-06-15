import { Document, Schema, model, models } from "mongoose";

export interface TagInterface {
  _id: Schema.Types.ObjectId;
  name: string;
  createdAt: Date;
  posts: Schema.Types.ObjectId[];
}

export interface ITag extends Document, Omit<TagInterface, "_id"> {}

export const TagSchema = new Schema<ITag>({
  name: { type: String, required: true },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post", required: false }],
  createdAt: { type: Date, default: Date.now },
});

const Tag = models?.Tag || model<ITag>("Tag", TagSchema);

export default Tag;
