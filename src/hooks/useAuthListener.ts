import { useEffect } from "react";

import { supabase } from "@services/supabase";
import { useAuthStore } from "@store/authStore";
import { getUserRole } from "@services/authService";

export function useAuthListener() {
  const setSession = useAuthStore((state) => state.setSession);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "TOKEN_REFRESHED" && !session) {
        supabase.auth.signOut();
        return;
      }

      const { isRecoveringPassword, setIsRecoveringPassword, setRole } =
        useAuthStore.getState();

      if (isRecoveringPassword) {
        if (event === "SIGNED_OUT") {
          setIsRecoveringPassword(false);
          setSession(null);
        }
        return;
      }

      setSession(session);

      if (!session?.user.id) {
        setRole(null);
        return;
      }

      getUserRole(session.user.id).then(setRole);
    });

    return () => subscription.unsubscribe();
  }, [setSession]);
}
