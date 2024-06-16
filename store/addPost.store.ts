import { create } from "zustand";

export type AddPostModalState = {
  isOpen: boolean;
  toggleDialog: () => void;
};
export const useAddPostModal = create<AddPostModalState>((set) => ({
  isOpen: false,
  toggleDialog: () => set((state) => ({ isOpen: !state.isOpen })),
}));
