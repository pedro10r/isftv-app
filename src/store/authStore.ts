import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { mmkvStorageAdapter } from "@lib/storage";

interface User {
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isBiometricEnabled: boolean;
  skipBiometricPrompt: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
  setBiometricEnabled: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isBiometricEnabled: false,
      skipBiometricPrompt: false,
      login: (user, token) => set({ user, token, skipBiometricPrompt: false }),
      logout: () => set({ user: null, token: null, skipBiometricPrompt: true }),
      setBiometricEnabled: (value) => set({ isBiometricEnabled: value }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => mmkvStorageAdapter),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isBiometricEnabled: state.isBiometricEnabled,
      }),
    },
  ),
);
