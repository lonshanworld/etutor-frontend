import { create } from "zustand";

type State = {
  isError: boolean;
  message: string;
};

type Action = {
  setError: (message?: string) => void;
  clearError: () => void;
};

export const errorStore = create<State & Action>((set) => ({
  isError: false,
  message: "",

  setError: (message) =>
    set({ isError: true, message: message || "Error occurred!" }),

  clearError: () => set({ isError: false, message: "" }),
}));
