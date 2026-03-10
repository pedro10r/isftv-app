import { useState } from "react";
import { Alert } from "react-native";
import { useForm } from "react-hook-form";

import { useProfileNavigation } from "@navigation/appNavigation";
import { useAuthStore } from "@store/authStore";
import { PlayingPosition, useProfileStore } from "@store/profileStore";

import { strings } from "./strings";

interface FormValues {
  username: string;
  city: string;
  height: string;
  weight: string;
}

export const useProfile = () => {
  const { goBack } = useProfileNavigation();

  const user = useAuthStore((state) => state.user);
  const profile = useProfileStore();

  const [playingPosition, setPlayingPosition] =
    useState<PlayingPosition | null>(profile.playingPosition);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      username: profile.username,
      city: profile.city,
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
    goBack,
    isSubmitting,
  };
};
