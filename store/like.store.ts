import { Schema } from "mongoose";
import { create } from "zustand";

interface LikesState {
  likes: Record<string, boolean>;
  toggleLike: (postId: Schema.Types.ObjectId, value?: boolean) => void;
  setLike: (postId: Schema.Types.ObjectId, value: boolean) => void;
}

export const useLikesStore = create<LikesState>((set) => ({
  likes: {},
  toggleLike: (postId: Schema.Types.ObjectId, value?: boolean) =>
    set((state) => ({
      likes: {
        ...state.likes,
        [postId.toString()]: value ?? !state.likes[postId.toString()],
      },
    })),
  setLike: (postId: Schema.Types.ObjectId, value: boolean) =>
    set((state) => ({
      likes: {
        ...state.likes,
        [postId.toString()]: value,
      },
    })),
}));
