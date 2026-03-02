import { useState } from "react";
import { ScrollView } from "react-native";

import { ScreenTemplate } from "@components/templates";
import {
  ProfileHeader,
  AthleteStatsCard,
  ProfileMenu,
} from "@components/organisms";
import { useAuthStore } from "@store/authStore";
import { styles } from "./styles";

export function Profile() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);

  const handleAvatarChange = (uri: string) => {
    setAvatarUrl(uri);
  };

  return (
    <ScreenTemplate>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader
          name={user?.name || ""}
          username={user?.email || ""}
          avatarUrl={avatarUrl}
          playingPosition="Direita"
          onAvatarChange={handleAvatarChange}
        />

        <AthleteStatsCard />

        <ProfileMenu onLogout={logout} />
      </ScrollView>
    </ScreenTemplate>
  );
}
