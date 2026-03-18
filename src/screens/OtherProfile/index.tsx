import { useMemo } from "react";
import { ActivityIndicator, View } from "react-native";

import { ProfileTemplate } from "@components/templates";
import { useAppTheme } from "@theme/ThemeContext";

import { useOtherProfile } from "./hooks";
import { createStyles } from "./styles";

export function OtherProfile() {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const {
    profile,
    isLoading,
    labels,
    avatarUrl,
    coverUrl,
    handleCallWhatsApp,
  } = useOtherProfile();

  if (isLoading && !profile) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ProfileTemplate
      isMe={false}
      fullName={labels.displayName}
      username={labels.displayUsername}
      bio={labels.displayBio}
      avatarUrl={avatarUrl}
      coverUrl={coverUrl}
      onCallWhatsApp={handleCallWhatsApp}
      stats={{
        position: labels.displayPosition,
        height: labels.displayHeight,
        weight: labels.displayWeight,
      }}
    />
  );
}
