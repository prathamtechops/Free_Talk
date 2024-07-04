import { Schema } from "mongoose";
import { create } from "zustand";

interface SavedState {
  saved: Record<string, boolean>;
  setSaved: (postId: Schema.Types.ObjectId, value: boolean) => void;
}

export const useSavedStore = create<SavedState>((set) => ({
  saved: {},

  setSaved: (postId: Schema.Types.ObjectId, value: boolean) =>
    set((state) => ({
      saved: {
        ...state.saved,
        [postId.toString()]: value,
      },
    })),
}));
