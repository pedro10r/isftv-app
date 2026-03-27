import { useState } from "react";
import { Alert } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { PlayingPosition } from "@models/profile";
import { useProfileNavigation } from "@navigation/appNavigation";
import { useAuthStore } from "@store/authStore";
import { useProfile, useUpdateProfile } from "@hooks/queries/useProfileQueries";
import { maskHeight, parseNumber } from "@utils";

import { EditProfileFormValues, editProfileSchema } from "./schemas";
import { strings } from "./strings";

export const useEditProfile = () => {
  const { goBack } = useProfileNavigation();

  const session = useAuthStore((state) => state.session);
  const userId = session?.user.id;

  const { data: profile } = useProfile(userId);
  const { mutateAsync: updateProfile, isPending: isUpdatingProfile } =
    useUpdateProfile();

  const [playingPosition, setPlayingPosition] =
    useState<PlayingPosition | null>(profile?.playing_position ?? null);

  const { control, handleSubmit } = useForm<EditProfileFormValues>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      full_name: profile?.full_name ?? "",
      bio: profile?.bio ?? "",
      height: profile?.height != null ? maskHeight(String(profile.height)) : "",
      city: profile?.city ?? "",
      uf: profile?.uf ?? "",
      whatsapp: profile?.whatsapp ?? "",
    },
  });

  const onSubmit = async (data: EditProfileFormValues) => {
    if (!userId) return;

    try {
      await updateProfile({
        userId,
        updates: {
          full_name: data.full_name,
          bio: data.bio || null,
          playing_position: playingPosition,
          height: parseNumber(data.height),
          city: data.city || null,
          uf: data.uf?.toUpperCase() || null,
          whatsapp: data.whatsapp || null,
        },
      });
      Alert.alert(
        strings.messages.successTitle,
        strings.messages.successMessage,
        [{ text: "OK", onPress: () => goBack() }],
      );
    } catch {
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
