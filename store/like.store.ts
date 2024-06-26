import { Schema } from "mongoose";
import { create } from "zustand";

interface LikesState {
  likes: Record<string, boolean>;

  setLike: (postId: Schema.Types.ObjectId, value: boolean) => void;
}

export const useLikesStore = create<LikesState>((set) => ({
  likes: {},

  setLike: (postId: Schema.Types.ObjectId, value: boolean) =>
    set((state) => ({
      likes: {
        ...state.likes,
        [postId.toString()]: value,
      },
    })),
}));
