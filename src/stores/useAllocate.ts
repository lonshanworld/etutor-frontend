import { User } from "@/model/user";
import { create } from "zustand";

export enum Tabs {
  tutor = "tutor",
  student = "student",
}
type State = {
  tab: Tabs;
  activeUser: User | null;
  userList: User[] | null;
};

type Action = {
  setTab: (tab: Tabs) => void;
  setActiveUser: (user: User) => void;
  setUserList: (useList: User[]) => void;
};

export const useAllocate = create<State & Action>((set) => ({
  tab: Tabs.tutor,
  activeUser: null,
  userList: null,
  setTab: (tab) => set({ tab }),
  setActiveUser: (user) => set({ activeUser: user }),
  setUserList: (userList) => set({ userList }),
}));
