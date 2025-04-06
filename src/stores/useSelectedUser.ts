import { create } from "zustand";
import { User } from "@/model/user";

type State = {
  selectedUser: User | null;
  lastSelectedUserId: number | null;
};

type Action = {
  setSelectedUser: (user: User | null) => void;
  setLastSelectedUserId: (id: number) => void;
};

export const useSelectedUser = create<State & Action>((set) => ({
  selectedUser: null,
  lastSelectedUserId: null,
  setSelectedUser: (user) => set({ selectedUser: user }),
  setLastSelectedUserId: (id) => set({ lastSelectedUserId: id }),
}));
