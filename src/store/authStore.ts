import { Session } from "@supabase/supabase-js";
import { create } from "zustand";

import { supabase } from "@services/supabase";

interface AuthState {
  session: Session | null;
  isLoading: boolean;
  isRecoveringPassword: boolean;
  setSession: (session: Session | null) => void;
  setIsRecoveringPassword: (value: boolean) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set) => ({
  session: null,
  isLoading: true,
  isRecoveringPassword: false,
  setSession: (session) => set({ session, isLoading: false }),
  setIsRecoveringPassword: (value) => set({ isRecoveringPassword: value }),
  signOut: async () => {
    // scope: 'local' signs out only this device, keeping other sessions active
    await supabase.auth.signOut({ scope: "local" });
  },
}));
