import { Document, Schema, model, models } from "mongoose";

export interface ChatInterface {
  _id: Schema.Types.ObjectId;
  participants: Schema.Types.ObjectId[];
  messages: Schema.Types.ObjectId[];
  createdAt: Date;
}

export interface IChat extends Document, Omit<ChatInterface, "_id"> {}

export const ChatSchema = new Schema<IChat>({
  participants: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  messages: [{ type: Schema.Types.ObjectId, ref: "Message", required: false }],
  createdAt: { type: Date, default: Date.now },
});

const Chat = models?.Chat || model<IChat>("Chat", ChatSchema);

export default Chat;
