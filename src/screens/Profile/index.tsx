import { useMemo } from "react";
import { ScrollView } from "react-native";

import { ScreenTemplate } from "@components/templates";
import {
  ProfileHeader,
  AthleteStatsCard,
  ProfileMenu,
} from "@components/organisms";
import { useAppTheme } from "@theme/ThemeContext";

import { useProfile } from "./hooks";
import { createStyles } from "./styles";

export function Profile() {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const {
    user,
    profile,
    avatarUrl,
    handleAvatarChange,
    logout,
    handleEditProfile,
    handleSettings,
  } = useProfile();

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
          city={profile.city}
          height={profile.height}
          weight={profile.weight}
          playingPosition={profile.playingPosition}
        />

        <ProfileMenu onLogout={logout} onEditProfile={handleEditProfile} onSettings={handleSettings} />
      </ScrollView>
    </ScreenTemplate>
  );
}
