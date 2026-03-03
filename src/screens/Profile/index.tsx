import { useState } from "react";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { ScreenTemplate } from "@components/templates";
import {
  ProfileHeader,
  AthleteStatsCard,
  ProfileMenu,
} from "@components/organisms";
import { useAuthStore } from "@store/authStore";
import { useProfileStore } from "@store/profileStore";
import { ProfileStackParamList } from "@navigation/types";
import { NAV } from "@navigation/routes";

import { styles } from "./styles";

type NavigationProp = NativeStackNavigationProp<ProfileStackParamList>;

export function Profile() {
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const { navigate } = useNavigation<NavigationProp>();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const profile = useProfileStore();

  const handleAvatarChange = (uri: string) => {
    setAvatarUrl(uri);
  };

  const handleEditProfile = () => {
    navigate(NAV.PROFILE_STACK.EDIT_PROFILE);
  };

  return (
    <ScreenTemplate>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader
          name={user?.name || ""}
          username={profile.username || ""}
          avatarUrl={avatarUrl}
          playingPosition={profile.playingPosition}
          onAvatarChange={handleAvatarChange}
        />

        <AthleteStatsCard
          height={profile.height}
          weight={profile.weight}
          playingPosition={profile.playingPosition}
        />

        <ProfileMenu onLogout={logout} onEditProfile={handleEditProfile} />
      </ScrollView>
    </ScreenTemplate>
  );
}
