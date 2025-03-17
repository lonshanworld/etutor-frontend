import { create } from "zustand";
import { User } from "@/model/user";
import { Profile } from "@/model/profile";

type State = {
  user: Profile | null;
  showOption: boolean;
  showDetail: boolean;
};

type Action = {
  login: (user: Profile) => void;
  logout: () => void;
  setShowDetail: (value: boolean) => void;
};

export const useUserStore = create<State & Action>((set) => ({
  user: null,
  showOption: false,
  showDetail: false,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
  setShowDetail: (value) => {
    set({ showDetail: value });
  },
}));
