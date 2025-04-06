import { create } from "zustand";
import { Profile } from "@/model/profile";

type State = {
  user: Profile | null;
  viewUser: Profile | null;
  isReadOnly: boolean;
};

type Action = {
  logout: () => void;
  setUser: (user: Profile | null) => void;
  setViewUser: (user: Profile | null) => void;
  getUserId: () => number | null;
  setReadOnly: (readOnly: boolean) => void;
};

export const useUserStore = create<State & Action>((set, get) => ({
  user: null,
  viewUser: null,
  isReadOnly: false, // Set to true for staff
  logout: () => set({ user: null }),
  setUser: (user) => set({ user }),
  setViewUser: (user) => set({ viewUser: user }),
  getUserId: () => get().user?.id ?? null,
  setReadOnly: (readOnly: boolean) => set({ isReadOnly: readOnly }),
}));
