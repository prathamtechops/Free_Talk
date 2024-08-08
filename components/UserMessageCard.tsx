import { UserInterface } from "@/database/user.model";
import { Schema } from "mongoose";
import Link from "next/link";
import UsersAvatar from "./shared/UsersAvatar";

interface UserMessageCardProps {
  myUserId: Schema.Types.ObjectId;
  potentialUser: UserInterface;
  lastMessageTime: Date;
  lastMessage: string;
}
const UserMessageCard = ({
  myUserId,
  potentialUser,
  lastMessage,
}: UserMessageCardProps) => {
  return (
    <Link href={`/chat?id=${potentialUser.clerkId}`}>
      <UsersAvatar
        avatar={potentialUser.avatar}
        name={potentialUser.username}
        subText={lastMessage}
      />
    </Link>
  );
};

export default UserMessageCard;
