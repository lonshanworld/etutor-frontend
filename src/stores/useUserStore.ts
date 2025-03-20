import { create } from "zustand";
import { User } from "@/model/user";
import { Profile } from "@/model/profile";

type State = {
  user: Profile | null;
  showOption: boolean;
  showDetail: boolean;
  profilePopup: boolean;
  profileDetailPopup: boolean;
  isProfileClicked: boolean;
};

type Action = {
  logout: () => void;
  setUser: (user: Profile | null) => void;
  setShowDetail: (value: boolean) => void;
  setProfilePopup: (value: boolean) => void;
  setProfileDetailPopup: (value: boolean) => void;
  setIsProfileClicked: (value: boolean) => void;
};

export const useUserStore = create<State & Action>((set) => ({
  user: null,
  showOption: false,
  showDetail: false,
  profilePopup: false,
  profileDetailPopup: false,
  isProfileClicked: false,
  logout: () => set({ user: null }),
  setUser: (user) => set({ user }),
  setShowDetail: (value) => {
    set({ showDetail: value });
  },
  setProfilePopup: (value) => {
    set({ profilePopup: value });
  },
  setProfileDetailPopup: (value) => {
    set({ profileDetailPopup: value });
  },
  setIsProfileClicked: (value) => {
    set({ isProfileClicked: value });
  },
}));
