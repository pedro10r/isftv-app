import { useState } from "react";
import { Alert } from "react-native";
import { useForm } from "react-hook-form";

import { useAuthNavigation } from "@navigation/appNavigation";
import { useAuthStore } from "@store/authStore";
import { PlayingPosition, useProfileStore } from "@store/profileStore";

import { strings } from "./strings";

interface FormValues {
  username: string;
  height: string;
  weight: string;
}

export const useProfile = () => {
  const { goBack } = useAuthNavigation();

  const user = useAuthStore((state) => state.user);
  const profile = useProfileStore();

  const [playingPosition, setPlayingPosition] = useState<PlayingPosition>(
    profile.playingPosition,
  );

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      username: profile.username,
      height: profile.height,
      weight: profile.weight,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      profile.updateProfile({
        ...data,
        playingPosition,
      });
      Alert.alert(
        strings.messages.successTitle,
        strings.messages.successMessage,
        [
          {
            text: "OK",
            onPress: () => goBack(),
          },
        ],
      );
    } catch {
      Alert.alert(strings.messages.errorTitle, strings.messages.errorMessage);
    }
  };

  return {
    user,
    control,
    playingPosition,
    setPlayingPosition,
    handleSubmit,
    onSubmit,
    isSubmitting,
  };
};
