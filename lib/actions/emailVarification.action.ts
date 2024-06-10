import EmailVerification from "@/database/emailVerification.model";
import { connectToDatabase } from "../mongoConnect";
import {
  CreateVerificationToken,
  GetVerificationTokenByEmail,
  GetVerificationTokenByToken,
  VerificationTokenId,
} from "./shared.types";

export async function getVerificationTokenByMail(
  params: GetVerificationTokenByEmail
) {
  try {
    connectToDatabase();
    const { email } = params;

    const verifiedToken = await EmailVerification.findOne({ email });

    if (!verifiedToken) {
      return null;
    }

    return verifiedToken;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getVerificationTokenByToken(
  params: GetVerificationTokenByToken
) {
  try {
    connectToDatabase();
    const { token } = params;
    const verifiedToken = await EmailVerification.findOne({ token }).sort({
      createdAt: -1,
    });

    if (!verifiedToken) {
      return null;
    }

    return verifiedToken;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteVerificationToken(params: VerificationTokenId) {
  try {
    connectToDatabase();
    const { id } = params;
    await EmailVerification.deleteOne({ _id: id });
  } catch (error) {
    console.log(error);
  }
}

export async function createVerificationToken(params: CreateVerificationToken) {
  try {
    connectToDatabase();
    const { email, token, expires } = params;
    await EmailVerification.create({ email, token, expires });
  } catch (error) {
    console.log(error);
  }
}
