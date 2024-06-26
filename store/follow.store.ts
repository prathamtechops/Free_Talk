import { Schema } from "mongoose";
import { create } from "zustand";

interface FollowsState {
  follows: Record<string, "follow" | "unfollow" | "requested">;
  setFollow: (
    personId: Schema.Types.ObjectId,
    value: "follow" | "unfollow" | "requested"
  ) => void;
}

export const useFollowsStore = create<FollowsState>((set) => ({
  follows: {},

  setFollow: (
    personId: Schema.Types.ObjectId,
    value: "follow" | "unfollow" | "requested"
  ) =>
    set((state) => ({
      follows: {
        ...state.follows,
        [personId.toString()]: value,
      },
    })),
}));
