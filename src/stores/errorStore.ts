import { create } from "zustand";

type State = {
  isError: boolean;
  message: string;
};

type Action = {
  setError: (message?: string) => void;
};

export const errorStore = create<State & Action>((set) => ({
  isError: false,
  message: "",
  setError: (message) =>
    set((state) =>
      state.isError
        ? { isError: false, message: "" }
        : { isError: true, message: message || "Error occurred!" }
    ),
}));
