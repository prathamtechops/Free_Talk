"use client";
import { UserInterface } from "@/database/user.model";
import { Schema } from "mongoose";
import FollowButton from "../actionButtons/FollowButton";
import UsersAvatar from "../shared/UsersAvatar";

function SuggestedUsers({
  myUser,
  users,
}: {
  myUser: UserInterface;
  users: UserInterface[];
}) {
  return (
    <div className="w-full">
      {users.map((user) => {
        const isRequestSent = !!myUser?.followRequestSent?.includes(user._id);
        const isFollowing = !!myUser?.following.includes(user._id);

        return (
          <div className="mb-4 w-full" key={user.name}>
            <UsersAvatar
              name={user.username}
              avatar={user.avatar}
              subText={user.name}
              className="w-full"
            >
              <FollowButton
                type={
                  isRequestSent
                    ? "request"
                    : isFollowing
                      ? "unfollow"
                      : "follow"
                }
                userId={myUser?._id ?? ({} as Schema.Types.ObjectId)}
                potentialUserId={user._id ?? ({} as Schema.Types.ObjectId)}
              />
            </UsersAvatar>
          </div>
        );
      })}
    </div>
  );
}

export default SuggestedUsers;
