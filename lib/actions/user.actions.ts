"use server";

import { signIn } from "@/auth";
import User, { IUser } from "@/database/user.model";
import { UserInterface } from "@/types";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { connectToDatabase } from "../mongoConnect";
import { loginSchema, registerSchema } from "../validation";
import { GetUserById } from "./shared.types";

export async function login(params: z.infer<typeof loginSchema>) {
  try {
    connectToDatabase();
    const validate = loginSchema.safeParse(params);
    if (!validate.success) throw new Error(validate.error.message);

    const { email, password } = params;

    const existingUser: UserInterface | null = await User.findOne({ email });

    if (!existingUser || !existingUser.email || !existingUser.password) {
      throw new Error("Email not found");
    }

    // TODO: Add email verification

    // if (!existingUser.emailVerified) {
    //   throw new Error("Email not verified");
    // }

    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          throw new Error("Invalid email or password");
        default:
          throw new Error("Something went wrong");
      }
    }
    throw error;
  }
}

export const loginWithGoogle = async () => {
  try {
    connectToDatabase();
    await signIn("google", {
      callbackUrl: "/",
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export async function register(params: z.infer<typeof registerSchema>) {
  try {
    connectToDatabase();

    const validate = registerSchema.safeParse(params);
    if (!validate.success) throw new Error(validate.error.message);

    const { username, email, password } = params;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("You are already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // const varificationToken = await generateVerificationToken(email);

    return {
      succes: "Confirmation Email Sent",
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserById(params: GetUserById) {
  try {
    connectToDatabase();
    const { id } = params;
    const user = await User.findById({
      _id: id,
    });
    return user as UserInterface;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export interface UpdateUserParams {
  username?: string;
  bio?: string;
  id: string;
  pathname: string;
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();
    const { username, id, bio, pathname } = params;

    const user: IUser | null = await User.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        username,
        bio,
      }
    );

    if (!user) throw new Error("User not found");

    revalidatePath(pathname);

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
