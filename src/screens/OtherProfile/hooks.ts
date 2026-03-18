import { Alert, Linking } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";

import { HomeStackParamList } from "@navigation/types";
import { useProfile } from "@hooks/queries/useProfileQueries";

import { strings } from "./strings";

export const useOtherProfile = () => {
  const { params } = useRoute<RouteProp<HomeStackParamList, "OtherProfile">>();
  const { userId } = params;

  const { data: profile, isLoading } = useProfile(userId);

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
    displayUsername: profile?.username ?? strings.profile.noUsername,
    displayBio: profile?.bio ?? strings.profile.noBio,
    displayPosition: profile?.playing_position ?? "-",
    displayHeight: profile?.height ? `${profile.height}m` : "-",
    displayWeight: profile?.weight ? `${profile.weight}kg` : "-",
  };

  return {
    profile,
    isLoading,
    labels,
    avatarUrl: profile?.avatar_url ?? undefined,
    coverUrl: profile?.cover_url ?? undefined,
    handleCallWhatsApp,
  };
};
