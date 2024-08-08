"use client";

import { UserInterface } from "@/database/user.model";
import { sendMessage } from "@/lib/actions/chat.action";
import { Schema } from "mongoose";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SmileIcon } from "./icons";
import UsersAvatar from "./shared/UsersAvatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface ChatSectionProps {
  user: UserInterface;
  myUser: UserInterface;
  chats: {
    _id: Schema.Types.ObjectId;
    participants: {
      _id: Schema.Types.ObjectId;
      name: string;
      username: string;
      avatar: string;
      clerkId: string;
    }[];
    messages: {
      _id: Schema.Types.ObjectId | string;
      sender: Schema.Types.ObjectId;
      content: string;
      createdAt: Date;
    }[];
    lastMessage: string;
  };
}

function ChatSection({ user, chats, myUser }: ChatSectionProps) {
  const [chatMessages, setChatMessages] = useState(chats.messages);
  const [message, setMessage] = useState("");

  const path = usePathname();

  useEffect(() => {
    setChatMessages(chats.messages);
  }, [chats]);

  const handleSendMessage = async () => {
    if (message.trim() === "") {
      return;
    }

    if (!chats._id) return;

    const newMessage = {
      _id: crypto.randomUUID(),
      sender: myUser._id,
      content: message,
      createdAt: new Date(),
    };

    setMessage("");

    setChatMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      await sendMessage({
        chatId: chats._id,
        senderId: myUser._id,
        content: message,
        path,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="flex w-full flex-col">
      <header className="border-b p-4 dark:border-zinc-700">
        <UsersAvatar
          name={user?.name}
          avatar={user?.avatar}
          textClassName="text-lg"
          subTextClassName="text-xs"
          subText={user?.username}
          avatarSize="size-10"
        />
      </header>
      <main className="flex-1 overflow-auto p-4">
        <div className="space-y-4">
          {chatMessages.map((message) => {
            const isCurrentUser =
              message.sender.toString() === myUser._id.toString();

            return (
              <div
                key={message._id.toString()}
                className={`flex items-end gap-2 ${isCurrentUser ? "justify-end" : ""}`}
              >
                <div
                  className={`rounded-lg p-2 ${
                    isCurrentUser
                      ? "bg-blue-500 text-white"
                      : "bg-zinc-200 dark:bg-zinc-700"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <footer className="border-t p-4 dark:border-zinc-700">
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost">
            <SmileIcon className="size-6" />
          </Button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1"
            placeholder="Type a message..."
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </footer>
    </section>
  );
}

export default ChatSection;
