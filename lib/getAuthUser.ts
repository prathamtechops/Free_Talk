// src/lib/utils/getAuthenticatedUser.js

import { UserInterface } from "@/database/user.model";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserByClerkId } from "./actions/user.actions";

// src/lib/utils/authCache.js

export const getAuthenticatedUser = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("sign-in");
  }

  const user: UserInterface = await getUserByClerkId({ clerkId: userId });
  return {
    user,
    userId,
  };
};

export const getUserClerkId = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("sign-in");
  }

  return userId;
};
