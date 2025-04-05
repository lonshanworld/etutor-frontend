import { create } from "zustand";
import { Profile } from "@/model/profile";

type State = {
  user: Profile | null;
};

type Action = {
  logout: () => void;
  setUser: (user: Profile | null) => void;
  getUserId: () => number | null;
};

export const useUserStore = create<State & Action>((set, get) => ({
  user: null,
  logout: () => set({ user: null }),
  setUser: (user) => set({ user }),
  getUserId: () => get().user?.id ?? null,
}));
