import { UserInterface } from "@/database/user.model";
import UserMessageCard from "./UserMessageCard";

const MessagesBox = ({
  result,
  myUser,
}: {
  result: any[];
  myUser: UserInterface;
}) => {
  return (
    <div className="grid gap-3">
      {result.length > 0 ? (
        result.map((chat: any) => (
          <UserMessageCard
            key={chat._id}
            myUserId={JSON.parse(JSON.stringify(myUser._id))}
            lastMessageTime={chat.lastMessageTime}
            lastMessage={chat.lastMessage}
            potentialUser={chat.user}
          />
        ))
      ) : (
        <p className="text-center">No messages found</p>
      )}
    </div>
  );
};

export default MessagesBox;
