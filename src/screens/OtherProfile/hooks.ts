import { useState } from "react";
import { Alert, Linking } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";

import { HomeStackParamList } from "@navigation/types";
import { useHomeNavigation } from "@navigation/appNavigation";
import { useProfile } from "@hooks/queries/useProfileQueries";

import { strings } from "./strings";

export const useOtherProfile = () => {
  const { params } = useRoute<RouteProp<HomeStackParamList, "OtherProfile">>();
  const { userId } = params;
  const { goBack } = useHomeNavigation();
  const queryClient = useQueryClient();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const { data: profile, isLoading, refetch } = useProfile(userId);

  const handleGoBack = () => goBack();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([
      refetch(),
      queryClient.invalidateQueries({ queryKey: ["user-posts", userId] }),
    ]);
    setIsRefreshing(false);
  };

  const handleCallWhatsApp = async () => {
    if (!profile?.whatsapp) {
      Alert.alert(
        strings.whatsapp.noNumberTitle,
        strings.whatsapp.noNumberMessage,
      );
      return;
    }

    const url = `whatsapp://send?phone=${profile.whatsapp}`;
    const canOpen = await Linking.canOpenURL(url);

    if (!canOpen) {
      Alert.alert(strings.whatsapp.errorTitle, strings.whatsapp.errorMessage);
      return;
    }

    await Linking.openURL(url);
  };

  const labels = {
    displayName: profile?.full_name ?? strings.profile.defaultName,
    displayBio: profile?.bio ?? strings.profile.noBio,
    displayPosition: profile?.playing_position ?? "-",
    displayCity: profile?.city ?? "-",
    displayHeight: profile?.height ? `${profile.height} m` : "-",
    displayLocation:
      profile?.city && profile?.uf
        ? `${profile.city}, ${profile.uf}`
        : (profile?.city ?? "-"),
    displayWhatsApp: profile?.whatsapp ?? "-",
  };

  return {
    userId,
    profile,
    isLoading,
    isRefreshing,
    labels,
    avatarUrl: profile?.avatar_url ?? undefined,
    coverUrl: profile?.cover_url ?? undefined,
    handleGoBack,
    handleRefresh,
    handleCallWhatsApp,
  };
};
