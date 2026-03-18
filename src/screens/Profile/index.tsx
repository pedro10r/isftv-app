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

import { EmptyListState, StatsCard } from "@components/molecules";
import { OutlineButton } from "@components/atoms";
import { useAppTheme } from "@theme/ThemeContext";
import { getInitials } from "@utils/getInitials";

import { useProfile } from "./hooks";
import { createStyles } from "./styles";
import { strings } from "./strings";

export function Profile() {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const {
    profile,
    isLoadingProfile,
    isUploadingMedia,
    avatarUrl,
    coverUrl,
    labels,
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
                    {getInitials(labels.displayName)}
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
          <Text style={styles.profileName}>{labels.displayName}</Text>
          <Text style={styles.profileUsername}>{labels.displayUsername}</Text>
          <Text style={styles.profileBio}>{labels.displayBio}</Text>
        </View>

        <StatsCard
          items={[
            {
              value: labels.displayPosition,
              label: strings.stats.positionLabel,
            },
            { value: labels.displayHeight, label: strings.stats.heightLabel },
            { value: labels.displayWeight, label: strings.stats.physicalLabel },
          ]}
        />

        <View style={styles.actionsRow}>
          <OutlineButton
            label={strings.actions.editProfile}
            onPress={handleNavigateEditProfile}
          />
          <OutlineButton
            label={strings.actions.settings}
            onPress={handleNavigateSettings}
          />
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
