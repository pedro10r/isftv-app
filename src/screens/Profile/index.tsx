import { useMemo } from "react";
import { ActivityIndicator, View } from "react-native";

import { ProfileTemplate } from "@components/templates";
import { ProfileMediaGrid } from "@components/organisms";
import { useAppTheme } from "@theme/ThemeContext";

import { useProfile } from "./hooks";
import { createStyles } from "./styles";

export function Profile() {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const {
    userId,
    profile,
    isLoadingProfile,
    isUploadingMedia,
    isRefreshing,
    avatarUrl,
    coverUrl,
    labels,
    handleRefresh,
    handlePickAvatar,
    handlePickCover,
    handleNavigateEditProfile,
    handleNavigateSettings,
  } = useProfile();

  if (isLoadingProfile && !profile) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ProfileTemplate
      isMe
      isRefreshing={isRefreshing}
      onRefresh={handleRefresh}
      fullName={labels.displayName}
      bio={labels.displayBio}
      avatarUrl={avatarUrl}
      coverUrl={coverUrl}
      stats={{
        position: labels.displayPosition,
        city: labels.displayCity,
      }}
      details={{
        height: labels.displayHeight,
        location: labels.displayLocation,
        whatsapp: labels.displayWhatsApp,
      }}
      isUploadingMedia={isUploadingMedia}
      onPickAvatar={handlePickAvatar}
      onPickCover={handlePickCover}
      onEditProfile={handleNavigateEditProfile}
      onSettings={handleNavigateSettings}
      renderMediaGrid={
        userId ? () => <ProfileMediaGrid userId={userId} /> : undefined
      }
    />
  );
}
