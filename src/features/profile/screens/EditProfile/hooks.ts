import { useState } from "react";
import { Alert } from "react-native";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { PlayingPosition } from "@features/profile/types";
import { useProfileNavigation } from "@navigation/appNavigation";
import { useAuthStore } from "@features/auth/store";
import { useProfile, useUpdateProfile } from "@features/profile/queries";
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

  const isOrganizer = profile?.role === "organizer";

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
      organizer_type: profile?.organizer_type ?? "person",
    },
  });

  const watchedOrganizerType = useWatch({ control, name: "organizer_type" });
  const isArena = isOrganizer && watchedOrganizerType === "arena";

  const onSubmit = async (data: EditProfileFormValues) => {
    if (!userId) return;

    try {
      await updateProfile({
        userId,
        updates: {
          full_name: data.full_name,
          bio: data.bio || null,
          organizer_type: isOrganizer
            ? (data.organizer_type ?? "person")
            : null,
          playing_position: isArena ? null : playingPosition,
          height: isArena ? null : parseNumber(data.height),
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
    isOrganizer,
    isArena,
  };
};
