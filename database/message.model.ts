import { Document, Schema, model, models } from "mongoose";

export interface IMessage extends Document {
  sender: Schema.Types.ObjectId;
  chat: Schema.Types.ObjectId;
  content: string;
  createdAt: Date;
}

export const MessageSchema = new Schema<IMessage>({
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  chat: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Message = models?.Message || model<IMessage>("Message", MessageSchema);

export default Message;
