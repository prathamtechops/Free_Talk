"use client";

import {
  acceptFollowRequest,
  removeFollowRequest,
  sendFollowRequest,
} from "@/lib/actions/follow.action";
import { Schema } from "mongoose";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

interface FollowButtonProps {
  userId: Schema.Types.ObjectId;
  potentialUserId: Schema.Types.ObjectId;
  type: "follow" | "unfollow" | "request" | "accept" | "remove" | "reject";
  notificationId?: Schema.Types.ObjectId;
}

const FollowButton = ({
  userId,
  potentialUserId,
  type,
  notificationId,
}: FollowButtonProps) => {
  const [followState, setFollowState] = useState<
    | "follow"
    | "unfollow"
    | "request"
    | "accept"
    | "accepted"
    | "remove"
    | "reject"
  >(type);

  const pathname = usePathname();
  const { toast } = useToast();

  const handleFollow = async () => {
    const currentValue = followState;
    let action;
    let newState: typeof followState;
    let successMessage: string;

    switch (currentValue) {
      case "request":
        newState = "follow";
        action = removeFollowRequest;
        successMessage = "Request removed successfully";
        break;
      case "follow":
        newState = "request";
        action = sendFollowRequest;
        successMessage = "Follow request sent successfully";
        break;
      case "accept":
        newState = "accepted";
        action = acceptFollowRequest;
        successMessage = "Follow request accepted successfully";
        break;
      default:
        return;
    }

    setFollowState(newState);

    try {
      const res = await action({
        userId,
        potentialUserId,
        pathname,
        notificationId,
      });

      toast({
        description: res?.message || successMessage,
        variant: "success",
      });
    } catch (error) {
      console.error(error);

      setFollowState(currentValue);

      toast({
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  };

  const getButtonText = () => {
    switch (followState) {
      case "request":
        return "Request Sent";
      case "follow":
        return "Follow";
      case "accept":
        return "Accept";
      case "accepted":
        return "Accepted";
      case "remove":
        return "Remove";
      case "reject":
        return "Reject";
      case "unfollow":
      default:
        return "Unfollow";
    }
  };

  const getButtonVariant = () => {
    return followState === "request" || followState === "reject"
      ? "outline"
      : "default";
  };

  return (
    <Button onClick={handleFollow} variant={getButtonVariant()} size="sm">
      {getButtonText()}
    </Button>
  );
};

export default FollowButton;
