"use client";

import { createChat } from "@/lib/actions/chat.action";
import { Schema } from "mongoose";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface CreateChatButtonInterface {
  myUserId: Schema.Types.ObjectId;
  potentialUser: Schema.Types.ObjectId;
  potentialUserClerkId: string;
}

const CreateChatButton = ({
  myUserId,
  potentialUser,
  potentialUserClerkId,
}: CreateChatButtonInterface) => {
  const router = useRouter();

  const handleConversation = async () => {
    try {
      await createChat({
        participants: [myUserId, potentialUser],
      });
    } catch (error) {
      console.error(error);
    } finally {
      router.push(`/chat?id=${potentialUserClerkId}`);
    }
  };

  return (
    <Button className="w-full" onClick={handleConversation}>
      Message
    </Button>
  );
};

export default CreateChatButton;
