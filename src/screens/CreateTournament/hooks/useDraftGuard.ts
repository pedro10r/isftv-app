import { useEffect } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useCreateTournamentStore } from "@store/createTournamentStore";
import { strings } from "../strings";

export function useDraftGuard() {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      const state = useCreateTournamentStore.getState();

      if (state.isPublishedSuccess) return;

      const isDirty =
        state.name.trim().length > 0 || state.categories.length > 0;

      if (!isDirty) return;

      e.preventDefault();

      Alert.alert(strings.draftGuard.title, strings.draftGuard.message, [
        { text: strings.draftGuard.cancel, style: "cancel" },
        {
          text: strings.draftGuard.discard,
          style: "destructive",
          onPress: () => {
            state.resetForm();
            navigation.dispatch(e.data.action);
          },
        },
        {
          text: strings.draftGuard.keepDraft,
          style: "default",
          onPress: () => navigation.dispatch(e.data.action),
        },
      ]);
    });

    return unsubscribe;
  }, [navigation]);
}
