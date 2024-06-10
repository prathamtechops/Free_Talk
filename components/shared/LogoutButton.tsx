import { SignOutButton } from "@clerk/nextjs";
import { LogoutIcon } from "../icons";

export const LogoutButton = ({
  isChatPage = false,
}: {
  isChatPage?: boolean;
}) => {
  return (
    <SignOutButton>
      <button type="submit" className="flex gap-2 px-6">
        <LogoutIcon className="size-6" />
        {!isChatPage && <span className="hidden lg:block">Sign Out</span>}
      </button>
    </SignOutButton>
  );
};
