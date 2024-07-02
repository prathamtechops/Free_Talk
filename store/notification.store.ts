import { create } from "zustand";

interface NotificationStore {
  notificatonCount: number;

  setNotificationCount: (value: number) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notificatonCount: 0,

  setNotificationCount: (value: number) =>
    set((state) => ({ notificatonCount: value })),
}));
