import { create } from "zustand";

type ToastType = "success" | "error" | "info";

type Toast = {
  message: string;
  type: ToastType;
} | null;

type State = {
  toast: Toast;
  timeoutId: ReturnType<typeof setTimeout> | null;
};

type Action = {
  showToast: (message: string, type: ToastType) => void;
};

export const useToast = create<State & Action>((set, get) => ({
  toast: null,
  timeoutId: null,

  showToast: (message, type) => {
    // If a toast is already showing, ignore the new one
    if (get().toast) return;

    // Set the toast
    set({ toast: { message, type } });

    // Set a timeout to remove it after 4s
    const timeoutId = setTimeout(() => {
      set({ toast: null, timeoutId: null });
    }, 4000);

    set({ timeoutId });
  },
}));
