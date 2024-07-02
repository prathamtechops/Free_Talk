import { Document, Schema, model, models } from "mongoose";

// Define the Notification Interface
export interface NotificationInterface {
  _id: Schema.Types.ObjectId;
  senderId: Schema.Types.ObjectId;
  receiverId: Schema.Types.ObjectId;
  type: "followRequest" | "post" | "comment" | "acceptFollowRequest";
  content: string;
  read: boolean;
  createdAt: Date;
  expiresAt: Date;
}

// Define the Notification Document Interface
export interface INotification
  extends Document,
    Omit<NotificationInterface, "_id"> {}

// Define the Notification Schema
const NotificationSchema = new Schema<INotification>({
  senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  type: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  expiresAt: {
    type: Date,
    default: () => Date.now() + 30 * 24 * 60 * 60 * 1000,
    expires: 0,
  },
});

// Create the Notification Model
const Notification =
  models?.Notification ||
  model<INotification>("Notification", NotificationSchema);

export default Notification;
