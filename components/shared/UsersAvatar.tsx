import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { UserAvatarTypes } from "@/types";
import { Schema } from "mongoose";
import FollowButton from "../actionButtons/FollowButton";

export default function UsersAvatar({
  currentUser,
  name,
  avatar,
  subText,
  className,
  avatarSize = "size-9",
  textClassName,
  userId,
  showFollowButton = false,
}: UserAvatarTypes) {
  return (
    <div className={cn("flex gap-3", className)}>
      <Avatar className={`${avatarSize}`}>
        <AvatarImage src={avatar} alt={name ? name[0] : ""} />
        <AvatarFallback>
          <span>{name ? name[0] : ""}</span>
        </AvatarFallback>
      </Avatar>
      {name && (
        <div
          className={cn("flex flex-col min-w-0 overflow-hidden", textClassName)}
        >
          <p className="truncate text-sm font-bold">{name}</p>
          <p className="truncate text-xs text-muted-foreground">{subText}</p>
        </div>
      )}
      <div className="ml-auto">
        {showFollowButton && userId && (
          <FollowButton
            isRequestSent={!!currentUser?.followRequestSent?.includes(userId)}
            isFollowing={!!currentUser?.following.includes(userId)}
            userId={currentUser?._id ?? ({} as Schema.Types.ObjectId)}
            potentialUserId={userId ?? ({} as Schema.Types.ObjectId)}
          />
        )}
      </div>
    </div>
  );
}
