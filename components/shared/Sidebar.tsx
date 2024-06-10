import { cn } from "@/lib/utils";
import { LogoutButton } from "./LogoutButton";
import { SidebarContent } from "./SidebarContent";

export const Sidebar = async () => {
  return (
    <nav
      className={cn(
        "hidden h-full flex-col justify-between bg-background py-10 sm:flex sm:w-[70px] lg:w-[230px]"
      )}
    >
      <div className="flex  flex-col justify-between">
        {/* <UsersAvatar
          name={userData.username}
          avatar={userData.avatar}
          subText={userData.email}
          className="lg:bg-dark800_light100 mx-auto mb-10 items-start justify-start rounded-lg lg:mx-4  lg:border  lg:p-2 "
          avatarSize="size-9"
          textClassName="lg:block hidden"
        /> */}
        <SidebarContent userId={""} />
      </div>
      <LogoutButton />
    </nav>
  );
};
