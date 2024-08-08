import { Schema } from "mongoose";
import { create } from "zustand";

interface ChatState {
  activeChat: {
    user: any;
    lastMessage: string;
    lastMessageTime: Date;
    chatId: Schema.Types.ObjectId;
  } | null;
  setActiveChat: (chat: {
    user: any;
    lastMessage: string;
    lastMessageTime: Date;
    chatId: Schema.Types.ObjectId;
  }) => void;
}

const useChatStore = create<ChatState>((set) => ({
  activeChat: null,
  setActiveChat: (chat) => set({ activeChat: chat }),
}));

export default useChatStore;
