import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { mmkvStorageAdapter } from "@lib/storage";

interface ThemeState {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      setIsDarkMode: (isDarkMode) => set({ isDarkMode }),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => mmkvStorageAdapter),
    },
  ),
);
