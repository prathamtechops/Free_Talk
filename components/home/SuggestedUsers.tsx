"use client";
import { UserInterface } from "@/database/user.model";
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
      {users.map((user) => (
        <div className="mb-4 w-full" key={user.name}>
          <UsersAvatar
            currentUser={myUser}
            name={user.username}
            avatar={user.avatar}
            subText={user.name}
            userId={user._id}
            showFollowButton={true}
            className="w-full"
          />
        </div>
      ))}
    </div>
  );
}

export default SuggestedUsers;
