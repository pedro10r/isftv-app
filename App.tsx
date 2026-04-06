import "react-native-url-polyfill/auto";

import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
  Inter_500Medium,
  Inter_300Light,
} from "@expo-google-fonts/inter";

const queryClient = new QueryClient();

import { RootNavigation } from "./src/navigation";
import { ThemeProvider } from "./src/theme/ThemeContext";
import { supabase } from "./src/services/supabase";
import { useAuthStore } from "./src/store/authStore";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Inter_500Medium,
    Inter_300Light,
  });

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

      supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single()
        .then(({ data }) => {
          setRole(data?.role ?? "player");
        });
    });

    return () => subscription.unsubscribe();
  }, [setSession]);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <SafeAreaProvider>
            <BottomSheetModalProvider>
              <RootNavigation />
            </BottomSheetModalProvider>
          </SafeAreaProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
