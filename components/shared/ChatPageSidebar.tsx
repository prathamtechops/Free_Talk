import { cn } from "@/lib/utils";
import { LogoutButton } from "./LogoutButton";
import { SidebarContent } from "./SidebarContent";

export const ChatSidebar = async () => {
  return (
    <nav
      className={cn(
        "hidden h-full flex-col justify-between bg-background py-10 sm:flex w-[70px] "
      )}
    >
      <div className="flex  flex-col justify-between">
        {/* <UsersAvatar
          className="mx-auto mb-10  items-start justify-start rounded-lg"
          avatarSize="size-9"
          avatar={userData.avatar}
        /> */}
        <SidebarContent userId={""} />
      </div>
      <LogoutButton isChatPage={true} />
    </nav>
  );
};
