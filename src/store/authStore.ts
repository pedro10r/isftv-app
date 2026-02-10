import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { mmkvStorageAdapter, storage } from "@lib/storage";
import { AUTH_STORAGE_KEYS } from "@constants/auth";

interface User {
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (user, token) => set({ user, token }),
      logout: () => {
        storage.delete(AUTH_STORAGE_KEYS.USER_SESSION);
        set({ user: null, token: null });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => mmkvStorageAdapter),
    },
  ),
);
