import { Schema } from "mongoose";
import { Button } from "../ui/button";

interface FollowButtonProps {
  userId: Schema.Types.ObjectId | undefined;
  potentialUserId: Schema.Types.ObjectId | undefined;
  isFollowing: boolean | undefined;
  isRequestSent: boolean | undefined;
}
const FollowButton = (params: FollowButtonProps) => {
  return (
    <Button
      variant={`${params.isRequestSent ? "outline" : "default"}`}
      size="sm"
    >
      {params.isRequestSent
        ? "Request Sent"
        : params.isFollowing
          ? "Following"
          : "Follow"}
    </Button>
  );
};

export default FollowButton;
