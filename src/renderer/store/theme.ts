// libraries
import { create } from "zustand";

export type Theme = "dark" | "light";

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const STORAGE_KEY = "time-sync-theme";

const getInitialTheme = (): Theme => {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved === "dark" || saved === "light") return saved;

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
};

export const useTheme = create<ThemeState>((set, get) => ({
  theme: getInitialTheme(),
  toggleTheme: () => {
    const next = get().theme === "dark" ? "light" : "dark";

    localStorage.setItem(STORAGE_KEY, next);
    set({ theme: next });
  },
  setTheme: (theme) => {
    localStorage.setItem(STORAGE_KEY, theme);
    set({ theme });
  },
}));
