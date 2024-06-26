"use client";

import {
  removeFollowRequest,
  sendFollowRequest,
} from "@/lib/actions/follow.action";
import { useFollowsStore } from "@/store/follow.store";
import { Schema } from "mongoose";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

interface FollowButtonProps {
  userId: Schema.Types.ObjectId;
  potentialUserId: Schema.Types.ObjectId;
  isFollowing: boolean;
  isRequestSent: boolean;
}
const FollowButton = ({
  userId,
  potentialUserId,
  isFollowing,
  isRequestSent,
}: FollowButtonProps) => {
  const followers = useFollowsStore((state) => state.follows);
  const setFollow = useFollowsStore((state) => state.setFollow);
  const [follow] = useState(
    followers[potentialUserId?.toString()] || isFollowing
      ? "unfollow"
      : isRequestSent
        ? "request"
        : "follow"
  );

  const pathname = usePathname();
  const { toast } = useToast();

  useEffect(() => {
    if (follow === "unfollow") {
      setFollow(potentialUserId, "follow");
    }
    if (follow === "follow") {
      setFollow(potentialUserId, "unfollow");
    }
    if (follow === "request") {
      setFollow(potentialUserId, "requested");
    }
  }, [follow, potentialUserId, setFollow]);

  const handleFollow = async () => {
    const currentValue = followers[potentialUserId?.toString()];

    if (currentValue === "requested") {
      setFollow(potentialUserId, "unfollow");

      try {
        const res = await removeFollowRequest({
          userId,
          potentialUserId,
          pathname,
        });

        toast({
          description: res?.message,
          variant: "success",
        });
      } catch (error) {
        console.log(error);
        setFollow(potentialUserId, currentValue);

        toast({
          description: error instanceof Error ? error.message : "Unknown error",
          variant: "destructive",
        });
      }
    }

    if (currentValue === "unfollow") {
      setFollow(potentialUserId, "requested");

      try {
        const res = await sendFollowRequest({
          userId,
          potentialUserId,
          pathname,
        });

        toast({
          description: res?.message,
          variant: "success",
        });
      } catch (error) {
        console.log(error);
        setFollow(potentialUserId, currentValue);

        toast({
          description: error instanceof Error ? error.message : "Unknown error",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Button
      onClick={handleFollow}
      variant={`${followers[potentialUserId?.toString()] === "requested" ? "outline" : "default"}`}
      size="sm"
    >
      {followers[potentialUserId?.toString()] === "requested"
        ? "Request Sent"
        : followers[potentialUserId?.toString()] === "follow"
          ? "Following"
          : followers[potentialUserId?.toString()] === "unfollow"
            ? "Follow"
            : "Follow"}
    </Button>
  );
};

export default FollowButton;
