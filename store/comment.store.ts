import { create } from "zustand";

interface CommentStore {
  commentCounts: Record<string, number>;
  setCommentCount: (commentId: string, value: number) => void;
}

export const useCommentStore = create<CommentStore>((set) => ({
  commentCounts: {},

  setCommentCount: (commentId: string, value: number) => {
    set((state) => {
      console.log("Updating comment count:", commentId, value); // Log updates
      return {
        commentCounts: {
          ...state.commentCounts,
          [commentId]: value,
        },
      };
    });
  },
}));
