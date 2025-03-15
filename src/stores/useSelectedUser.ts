import { create } from "zustand";
import { User } from "@/model/user";

type State = {
  selectedUser: User | null;
};

type Action = {
  setSelectedUser: (user: User | null) => void;
};

export const useSelectedUser = create<State & Action>((set) => ({
  selectedUser: null,
  setSelectedUser: (user) => set({ selectedUser: user }),
}));
