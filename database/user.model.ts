import { Document, Schema, model, models } from "mongoose";

export interface UserInterface {
  _id: Schema.Types.ObjectId;
  clerkId: string;
  name: string;
  username: string;
  bio: string;
  email: string;
  avatar: string;
  chats: Schema.Types.ObjectId[];
  posts: Schema.Types.ObjectId[];
  likes: Schema.Types.ObjectId[];
  saved: Schema.Types.ObjectId[];
  shares: Schema.Types.ObjectId[];
  followers: Schema.Types.ObjectId[];
  following: Schema.Types.ObjectId[];
  notification: Schema.Types.ObjectId[];
  followRequests: Schema.Types.ObjectId[];
  blocked: Schema.Types.ObjectId[];
  followRequestSent: Schema.Types.ObjectId[];
  createdAt: Date;
}

// TODO: Add Notifcation Schema

export interface IUser extends Document, Omit<UserInterface, "_id"> {}

export const UserSchema = new Schema<IUser>({
  clerkId: { type: String, required: true },
  username: { type: String, required: true },
  name: { type: String, required: true },
  bio: { type: String, required: false },
  email: { type: String, unique: true, required: true },
  avatar: { type: String, required: false },
  chats: [{ type: Schema.Types.ObjectId, ref: "Chat", required: false }],
  likes: [{ type: Schema.Types.ObjectId, ref: "Post", required: false }],
  posts: [{ type: Schema.Types.ObjectId, ref: "Post", required: false }],
  saved: [{ type: Schema.Types.ObjectId, ref: "Post", required: false }],
  shares: [{ type: Schema.Types.ObjectId, ref: "Post", required: false }],
  notification: [
    { type: Schema.Types.ObjectId, ref: "Notification", required: false },
  ],
  followers: [{ type: Schema.Types.ObjectId, ref: "User", required: false }],
  following: [{ type: Schema.Types.ObjectId, ref: "User", required: false }],
  followRequests: [
    { type: Schema.Types.ObjectId, ref: "User", required: false },
  ],
  blocked: [{ type: Schema.Types.ObjectId, ref: "User", required: false }],
  followRequestSent: [
    { type: Schema.Types.ObjectId, ref: "User", required: false },
  ],
  createdAt: { type: Date, required: false },
});

const User = models?.User || model<IUser>("User", UserSchema);

export default User;
