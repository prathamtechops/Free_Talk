import { cn } from "@/lib/utils";

import { getAuthenticatedUser } from "@/lib/getAuthUser";
import { LogoutButton } from "./LogoutButton";
import { SidebarContent } from "./SidebarContent";
import UsersAvatar from "./UsersAvatar";

export const ChatSidebar = async () => {
  const { user: userData, userId } = await getAuthenticatedUser();

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
          avatar={userData?.avatar}
        />
        <SidebarContent clerkId={userId} />
      </div>
      <LogoutButton isChatPage={true} />
    </nav>
  );
};
