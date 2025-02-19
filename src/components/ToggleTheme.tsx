"use client"
import { useThemeStore } from "@/stores/useThemeStore";

export default function ToggleTheme() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md border transition duration-300 bg-white text-black"
    >
      {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
