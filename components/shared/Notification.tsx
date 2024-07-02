import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserInterface } from "@/database/user.model";
import {
  getUserNotifications,
  readAllNotifications,
} from "@/lib/actions/notification.action";
import { cn } from "@/lib/utils";
import { useNotificationStore } from "@/store/notification.store";
import { DialogParams } from "@/types";
import { Schema } from "mongoose";
import { useEffect, useState } from "react";
import FollowButton from "../actionButtons/FollowButton";
import UsersAvatar from "./UsersAvatar";

interface Notifications {
  _id: Schema.Types.ObjectId;
  senderId: {
    _id: Schema.Types.ObjectId;
    clerkId: string;
    username: string;
    avatar: string;
  };
  type: "followRequest" | "post" | "comment" | "acceptFollowRequest";
  content: string;
  read: boolean;
  createdAt: Date;
}

function Notification({ trigger, user = {} as string }: DialogParams) {
  const paredUser = JSON.parse(user) as UserInterface;

  const [notifications, setNotifications] = useState<Notifications[]>([]);
  const setNotificationCount = useNotificationStore(
    (state) => state.setNotificationCount
  );

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await getUserNotifications({
          userId: paredUser._id,
        });

        if (res.success) {
          setNotifications(res.notifications);
          setNotificationCount(res.unreadCount);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchNotifications();
  }, [paredUser._id, setNotificationCount]);

  const handleRead = async () => {
    await readAllNotifications({
      userId: paredUser._id,
    });

    setNotificationCount(0);
  };

  return (
    <Sheet onOpenChange={handleRead}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="p-0">
        <SheetHeader className="p-6">
          <SheetTitle>Notificaton</SheetTitle>
        </SheetHeader>
        <div className="w-full space-y-3 ">
          {notifications.map((notification) => {
            const isFollowing = !!paredUser?.followers.includes(
              notification.senderId._id
            );

            return (
              <div key={notification._id.toString()} className="w-full">
                <UsersAvatar
                  name={notification.senderId.username}
                  subText={notification.content}
                  avatar={notification.senderId.avatar}
                  className={cn("w-full p-3", {
                    "bg-dark800_light100": !notification.read,
                  })}
                >
                  {notification.type === "followRequest" && (
                    <div className="flex items-center gap-2">
                      <FollowButton
                        userId={JSON.parse(JSON.stringify(paredUser._id))}
                        potentialUserId={notification.senderId._id}
                        type={isFollowing ? "remove" : "accept"}
                        notificationId={notification._id}
                      />
                      {!isFollowing && (
                        <FollowButton
                          userId={JSON.parse(JSON.stringify(paredUser._id))}
                          potentialUserId={notification.senderId._id}
                          type={"reject"}
                          notificationId={notification._id}
                        />
                      )}
                    </div>
                  )}
                </UsersAvatar>
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default Notification;
