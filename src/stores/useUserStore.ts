import { create } from "zustand";
import { Profile } from "@/model/profile";

type State = {
  user: Profile | null;
};

type Action = {
  logout: () => void;
  setUser: (user: Profile | null) => void;
};

export const useUserStore = create<State & Action>((set) => ({
  user: null,
  logout: () => set({ user: null }),
  setUser: (user) => set({ user }),
}));
