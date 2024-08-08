import ChatSection from "@/components/ChatSection";
import { PencilIcon, SearchIcon } from "@/components/icons";
import MessagesBox from "@/components/MessagesBos";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserInterface } from "@/database/user.model";
import { getAllChats, getChat } from "@/lib/actions/chat.action";
import { getUserByClerkId } from "@/lib/actions/user.actions";
import { getAuthenticatedUser } from "@/lib/getAuthUser";
import { SearchParamsProps } from "@/types";

export default async function Chat({ searchParams }: SearchParamsProps) {
  let user: UserInterface | null = null;
  let chats: any | null = null;

  const myUser = await getAuthenticatedUser();

  if (searchParams && searchParams.id) {
    user = await getUserByClerkId({ clerkId: searchParams.id });
    chats = await getChat(myUser.user._id, user?._id);
  }

  const result = await getAllChats(myUser.user._id);

  return (
    <div className="flex h-full bg-white dark:bg-zinc-800">
      <aside className="w-80 border-r dark:border-zinc-700">
        <div className="space-y-4 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Messages</h2>
            <Button size="icon" variant="ghost">
              <PencilIcon className="size-6" />
            </Button>
          </div>
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-3 size-4 text-zinc-500 dark:text-zinc-400" />
            <Input
              className="pl-8"
              placeholder="Search messages..."
              type="search"
            />
            <Button
              className="absolute right-2.5 top-3"
              size="icon"
              variant="ghost"
            />
          </div>
          <MessagesBox result={result} myUser={myUser.user} />
        </div>
      </aside>

      {user === null ? (
        <section>
          <h1 className="text-3xl font-bold">User not found</h1>
        </section>
      ) : (
        <ChatSection
          user={user}
          chats={chats}
          myUser={JSON.parse(JSON.stringify(myUser.user))}
        />
      )}
    </div>
  );
}
