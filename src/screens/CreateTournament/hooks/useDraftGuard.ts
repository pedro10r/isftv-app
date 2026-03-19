import { useCallback, useEffect } from "react";
import { Alert, BackHandler } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { useCreateTournamentStore } from "@store/createTournamentStore";
import { strings } from "../strings";

export function useDraftGuard() {
  const navigation = useNavigation();

  const isFormDirty = (): boolean => {
    const state = useCreateTournamentStore.getState();

    return (
      state.name.trim().length > 0 ||
      state.posterUri.length > 0 ||
      state.venue_name.trim().length > 0 ||
      state.city.trim().length > 0 ||
      state.start_date.length > 0 ||
      state.end_date.length > 0 ||
      state.contact_whatsapp.length > 0 ||
      state.baseFee.length > 0 ||
      state.categories.length > 0
    );
  };

  // Disable swipe-back gesture so it can't bypass the guard
  useEffect(() => {
    navigation.setOptions({ gestureEnabled: false });
  }, [navigation]);

  const showAlert = useCallback((onProceed: () => void) => {
    Alert.alert(strings.draftGuard.title, strings.draftGuard.message, [
      { text: strings.draftGuard.cancel, style: "cancel" },
      {
        text: strings.draftGuard.discard,
        style: "destructive",
        onPress: () => {
          useCreateTournamentStore.getState().resetForm();
          onProceed();
        },
      },
      {
        text: strings.draftGuard.keepDraft,
        style: "default",
        onPress: onProceed,
      },
    ]);
  }, []);

  // Android hardware back button
  useFocusEffect(
    useCallback(() => {
      const sub = BackHandler.addEventListener("hardwareBackPress", () => {
        const state = useCreateTournamentStore.getState();
        if (state.isPublishedSuccess || !isFormDirty()) return false;

        showAlert(() => navigation.goBack());
        return true; // prevent default back
      });

      return () => sub.remove();
    }, [navigation, showAlert]),
  );

  const guardedGoBack = useCallback(() => {
    const state = useCreateTournamentStore.getState();
    if (state.isPublishedSuccess || !isFormDirty()) {
      navigation.goBack();
      return;
    }

    showAlert(() => navigation.goBack());
  }, [navigation, showAlert]);

  return { guardedGoBack };
}
