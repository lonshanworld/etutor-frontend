import { create } from "zustand";

type Toast = {
  message: string;
  type: string;
};

type State = {
  toast: Toast | null;
};

type Action = {
  showToast: (message: string, type: string) => void;
};

export const useToast = create<State & Action>((set) => ({
  toast: null,
  showToast: (message, type) => {
    set({
      toast: {
        message,
        type,
      },
    });
    setTimeout(() => set({ toast: null }), 3000);
  },
}));
