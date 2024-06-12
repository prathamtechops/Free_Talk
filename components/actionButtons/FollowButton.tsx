import { Schema } from "mongoose";
import { Button } from "../ui/button";

interface FollowButtonProps {
  userId: Schema.Types.ObjectId | undefined;
  potentialUserId: Schema.Types.ObjectId | undefined;
  isFollowing: boolean | undefined;
}
const FollowButton = (params: FollowButtonProps) => {
  return (
    <Button size="sm">{params.isFollowing ? "Following" : "Follow"}</Button>
  );
};

export default FollowButton;
