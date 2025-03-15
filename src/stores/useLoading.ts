import { create } from "zustand";

type State = {
  isLoading: boolean;
};

type Action = {
  setLoading: (value: boolean) => void;
};

export const useLoading = create<State & Action>((set) => ({
  isLoading: false,
  setLoading: (value) => {
    set((state) => ({
      isLoading: state.isLoading,
    }));
  },
}));
