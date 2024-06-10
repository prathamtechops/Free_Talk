import { cn } from "@/lib/utils";

import { getUserByClerkId } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { LogoutButton } from "./LogoutButton";
import { SidebarContent } from "./SidebarContent";
import UsersAvatar from "./UsersAvatar";

export const ChatSidebar = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const userData = await getUserByClerkId({ clerkId: userId });
  return (
    <nav
      className={cn(
        "hidden h-full flex-col justify-between bg-background py-10 sm:flex w-[70px] "
      )}
    >
      <div className="flex  flex-col justify-between">
        <UsersAvatar
          className="mx-auto mb-10  items-start justify-start rounded-lg"
          avatarSize="size-9"
          avatar={userData.avatar}
        />
        <SidebarContent userId={""} />
      </div>
      <LogoutButton isChatPage={true} />
    </nav>
  );
};
