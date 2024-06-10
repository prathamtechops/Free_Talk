import { Document, Schema, model, models } from "mongoose";

export interface IUser extends Document {
  username: string;
  bio: string;
  password: string;
  email: string;
  avatar: string;
  emailVerified: boolean;
  chats: Schema.Types.ObjectId[];
  posts: Schema.Types.ObjectId[];
  likes: Schema.Types.ObjectId[];
  saved: Schema.Types.ObjectId[];
  shares: Schema.Types.ObjectId[];
  followers: Schema.Types.ObjectId[];
  following: Schema.Types.ObjectId[];
  createdAt: Date;
}

export const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  bio: { type: String, required: false },
  password: { type: String },
  email: { type: String, unique: true, required: true },
  avatar: { type: String, required: false },
  emailVerified: { type: Boolean, required: false, default: false },
  chats: [{ type: Schema.Types.ObjectId, ref: "Chat", required: false }],
  likes: [{ type: Schema.Types.ObjectId, ref: "Post", required: false }],
  posts: [{ type: Schema.Types.ObjectId, ref: "Post", required: false }],
  saved: [{ type: Schema.Types.ObjectId, ref: "Post", required: false }],
  shares: [{ type: Schema.Types.ObjectId, ref: "Post", required: false }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User", required: false }],
  following: [{ type: Schema.Types.ObjectId, ref: "User", required: false }],
  createdAt: { type: Date, required: false },
});

const User = models?.User || model<IUser>("User", UserSchema);

export default User;
