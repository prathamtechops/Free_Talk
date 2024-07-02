import { getAuthenticatedUser } from "@/lib/getAuthUser";
import { cn } from "@/lib/utils";
import { SidebarContent } from "./SidebarContent";
import UsersAvatar from "./UsersAvatar";

export const Sidebar = async () => {
  const { user: userData, userId } = await getAuthenticatedUser();

  return (
    <nav
      className={cn(
        "hidden h-full flex-col justify-between bg-background py-10 sm:flex sm:w-[70px] lg:w-[230px]"
      )}
    >
      <div className="flex flex-col  justify-between gap-5">
        <UsersAvatar
          name={userData?.username}
          avatar={userData?.avatar}
          subText={userData?.name}
          className="lg:bg-dark800_light100 mx-auto items-start justify-start rounded-lg lg:mx-4  lg:border  lg:p-2 "
          avatarSize="size-9"
          textClassName="lg:block hidden"
        />

        <SidebarContent user={JSON.stringify(userData)} clerkId={userId} />
      </div>
      {/* <LogoutButton /> */}
    </nav>
  );
};
