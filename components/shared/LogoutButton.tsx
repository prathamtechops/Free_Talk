import { LogoutIcon } from "../icons";

export const LogoutButton = ({
  isChatPage = false,
}: {
  isChatPage?: boolean;
}) => {
  return (
    <div className="px-6">
      <form
        action={async () => {
          "use server";
        }}
      >
        <button type="submit" className="flex gap-2">
          <LogoutIcon className="size-6" />
          {!isChatPage && <span className="hidden lg:block">Sign Out</span>}
        </button>
      </form>
    </div>
  );
};
