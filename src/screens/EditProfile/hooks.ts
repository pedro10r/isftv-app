import { useState } from "react";
import { Alert } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useShallow } from "zustand/shallow";

import { PlayingPosition } from "@models/profile";
import { useProfileNavigation } from "@navigation/appNavigation";
import { useAuthStore } from "@store/authStore";
import { useProfileStore } from "@store/profileStore";
import { maskHeight, maskWeight, parseNumber } from "@utils";

import { EditProfileFormValues, editProfileSchema } from "./schemas";
import { strings } from "./strings";

export const useEditProfile = () => {
  const { goBack } = useProfileNavigation();

  const session = useAuthStore((state) => state.session);

  const { profile, isUpdatingProfile, updateProfile } = useProfileStore(
    useShallow((state) => ({
      profile: state.profile,
      isUpdatingProfile: state.isUpdatingProfile,
      updateProfile: state.updateProfile,
    })),
  );

  const [playingPosition, setPlayingPosition] =
    useState<PlayingPosition | null>(profile?.playing_position ?? null);

  const { control, handleSubmit } = useForm<EditProfileFormValues>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      full_name: profile?.full_name ?? "",
      username: profile?.username ?? "",
      bio: profile?.bio ?? "",
      height: profile?.height != null ? maskHeight(String(profile.height)) : "",
      weight: profile?.weight != null ? maskWeight(String(profile.weight)) : "",
    },
  });

  const onSubmit = async (data: EditProfileFormValues) => {
    if (!session?.user.id) return;

    const success = await updateProfile(session.user.id, {
      full_name: data.full_name,
      username: data.username || null,
      bio: data.bio || null,
      playing_position: playingPosition,
      height: parseNumber(data.height),
      weight: parseNumber(data.weight),
    });

    if (success) {
      Alert.alert(
        strings.messages.successTitle,
        strings.messages.successMessage,
        [{ text: "OK", onPress: () => goBack() }],
      );
    } else {
      Alert.alert(strings.messages.errorTitle, strings.messages.errorMessage);
    }
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    goBack,
    playingPosition,
    setPlayingPosition,
    isUpdatingProfile,
  };
};
