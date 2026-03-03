import { ScrollView } from "react-native";

import { ScreenTemplate } from "@components/templates";
import {
  ProfileHeader,
  AthleteStatsCard,
  ProfileMenu,
} from "@components/organisms";

import { useProfile } from "./hooks";
import { styles } from "./styles";

export function Profile() {
  const {
    user,
    profile,
    avatarUrl,
    handleAvatarChange,
    logout,
    handleEditProfile,
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
          height={profile.height}
          weight={profile.weight}
          playingPosition={profile.playingPosition}
        />

        <ProfileMenu onLogout={logout} onEditProfile={handleEditProfile} />
      </ScrollView>
    </ScreenTemplate>
  );
}
