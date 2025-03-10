import { create } from "zustand";

type State = {
  theme: "light" | "dark";
};

type Action = {
  toggleTheme: () => void;
};

export const useThemeStore = create<State & Action>((set) => ({
  theme: "light",
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      return { theme: newTheme };
    }),
}));
