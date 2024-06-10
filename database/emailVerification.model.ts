import { Document, Schema, model, models } from "mongoose";

export interface IEmailVerification extends Document {
  email: string;
  token: string;
  createdAt: Date;
  expiresAt: Date;
}

const EmailVerificationSchema = new Schema<IEmailVerification>({
  email: { type: String, required: true, unique: true },
  token: { type: String, required: true, unique: true },
  createdAt: { type: Date, required: true },
  expiresAt: { type: Date, required: true },
});

const EmailVerification =
  models?.EmailVerification ||
  model<IEmailVerification>("EmailVerification", EmailVerificationSchema);

export default EmailVerification;
