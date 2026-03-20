import { Session } from "@supabase/supabase-js";
import { create } from "zustand";

import { supabase } from "@services/supabase";

interface AuthState {
  session: Session | null;
  isLoading: boolean;
  setSession: (session: Session | null) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set) => ({
  session: null,
  isLoading: true,
  setSession: (session) => set({ session, isLoading: false }),
  signOut: async () => {
    // scope: 'local' signs out only this device, keeping other sessions active
    await supabase.auth.signOut({ scope: "local" });
  },
}));
