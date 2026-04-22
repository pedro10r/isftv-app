import { Session } from "@supabase/supabase-js";
import { create } from "zustand";

import { supabase } from "@services/supabase";
import { UserRole } from "@features/profile/types";

interface AuthState {
  session: Session | null;
  role: UserRole | null;
  isLoading: boolean;
  isRecoveringPassword: boolean;
  setSession: (session: Session | null) => void;
  setRole: (role: UserRole | null) => void;
  setIsRecoveringPassword: (value: boolean) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set) => ({
  session: null,
  role: null,
  isLoading: true,
  isRecoveringPassword: false,
  setSession: (session) => set({ session, isLoading: false }),
  setRole: (role) => set({ role }),
  setIsRecoveringPassword: (value) => set({ isRecoveringPassword: value }),
  signOut: async () => {
    // scope: 'local' signs out only this device, keeping other sessions active
    await supabase.auth.signOut({ scope: "local" });
  },
}));
