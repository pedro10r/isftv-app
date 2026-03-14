import { useMemo } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import Feather from "@expo/vector-icons/Feather";

import { EmptyListState } from "@components/molecules";
import { useAppTheme } from "@theme/ThemeContext";
import { getInitials } from "@utils/getInitials";

import { useProfile } from "./hooks";
import { createStyles } from "./styles";
import { strings } from "./strings";

export function Profile() {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const {
    session,
    profile,
    isLoadingProfile,
    isUploadingMedia,
    avatarUrl,
    coverUrl,
    handlePickAvatar,
    handlePickCover,
    handleEditProfile,
    handleSettings,
  } = useProfile();

  const displayName =
    profile?.full_name ?? session?.user?.user_metadata?.full_name ?? "";
  const displayUsername = profile?.username ?? strings.profile.noUsername;
  const displayBio = profile?.bio ?? strings.profile.noBio;
  const displayPosition = profile?.playing_position ?? "-";
  const displayHeight = profile?.height ? `${profile.height}m` : "-";
  const displayWeight = profile?.weight ? `${profile.weight}kg` : "-";

  if (isLoadingProfile && !profile) {
    return (
      <SafeAreaView style={styles.container} edges={["bottom"]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.coverWrapper}>
          {coverUrl ? (
            <Image
              source={{ uri: coverUrl }}
              style={styles.coverImage}
              contentFit="cover"
            />
          ) : (
            <View style={styles.coverImage} />
          )}
          <TouchableOpacity
            style={styles.coverActionButton}
            onPress={handlePickCover}
            activeOpacity={0.7}
            disabled={isUploadingMedia}
          >
            {isUploadingMedia ? (
              <ActivityIndicator size="small" color={colors.textPrimary} />
            ) : (
              <Feather name="image" size={18} color={colors.textPrimary} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.avatarWrapper}>
          <View style={styles.avatarRelative}>
            <View style={styles.avatarOuter}>
              {avatarUrl ? (
                <Image
                  source={{ uri: avatarUrl }}
                  style={styles.avatarImage}
                  contentFit="cover"
                />
              ) : (
                <View style={styles.avatarInitials}>
                  <Text style={styles.avatarInitialsText}>
                    {getInitials(displayName)}
                  </Text>
                </View>
              )}
            </View>

            <TouchableOpacity
              style={styles.avatarEditButton}
              onPress={handlePickAvatar}
              activeOpacity={0.7}
              disabled={isUploadingMedia}
            >
              {isUploadingMedia ? (
                <ActivityIndicator size="small" color={colors.surface} />
              ) : (
                <Feather name="camera" size={16} color={colors.surface} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.profileInfoContainer}>
          <Text style={styles.profileName}>{displayName}</Text>
          <Text style={styles.profileUsername}>{displayUsername}</Text>
          <Text style={styles.profileBio}>{displayBio}</Text>
        </View>

        <View style={styles.statsCard}>
          <View style={[styles.statItem, styles.statItemWithBorder]}>
            <Text style={styles.statValue}>{displayPosition}</Text>
            <Text style={styles.statLabel}>{strings.stats.positionLabel}</Text>
          </View>
          <View style={[styles.statItem, styles.statItemWithBorder]}>
            <Text style={styles.statValue}>{displayHeight}</Text>
            <Text style={styles.statLabel}>{strings.stats.heightLabel}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{displayWeight}</Text>
            <Text style={styles.statLabel}>{strings.stats.physicalLabel}</Text>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonOutline]}
            onPress={handleEditProfile}
            activeOpacity={0.7}
          >
            <Text style={styles.actionButtonText}>
              {strings.actions.editProfile}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonOutline]}
            onPress={handleSettings}
            activeOpacity={0.7}
          >
            <Text style={styles.actionButtonText}>
              {strings.actions.settings}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{strings.sections.myMedia}</Text>
          <View style={styles.emptyStateWrapper}>
            <EmptyListState icon="camera" message={strings.emptyStateMessage} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
