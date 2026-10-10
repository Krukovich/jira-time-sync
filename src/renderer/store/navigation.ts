// libraries
import { create } from "zustand";

export type View = "dashboard" | "tasks" | "stats" | "settings" | "profile";

interface NavState {
  view: View;
  setView: (view: View) => void;
}

export const useNavigation = create<NavState>((set) => ({
  view: "dashboard",
  setView: (view) => set({ view }),
}));
