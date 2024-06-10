import { SearchInput } from "./SearchInput";
import { ModeToggle } from "./mode-toggle";

export const Navbar = async () => {
  return (
    <nav className="flex w-full items-center justify-between border-b-2 p-4 ">
      <div className="flex w-1/2 items-center justify-between ">
        <h1 className="h1_bold">
          <span className="text-primary">Free</span>Talk
        </h1>
        <SearchInput
          className="w-1/2"
          inputClassName="rounded-xl bg-dark800_light100"
          iconDirection="left"
        />
      </div>
      <div className="flex gap-4">
        <ModeToggle />
        {/* <UsersAvatar avatar={avatar} /> */}
      </div>
    </nav>
  );
};
