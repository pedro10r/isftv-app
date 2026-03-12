import { useMemo } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import Feather from "@expo/vector-icons/Feather";

import { EmptyListState } from "@components/molecules";
import { useAppTheme } from "@theme/ThemeContext";
import { getInitials } from "@utils/getInitials";

import { useProfile } from "./hooks";
import { createStyles } from "./styles";
import { strings } from "./strings";
import { SafeAreaView } from "react-native-safe-area-context";

export function Profile() {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const {
    user,
    profile,
    avatarUrl,
    coverUrl,
    handlePickAvatar,
    handlePickCover,
    handleEditProfile,
    handleSettings,
  } = useProfile();

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
          >
            <Feather name="image" size={18} color={colors.textPrimary} />
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
                    {getInitials(user?.name ?? "")}
                  </Text>
                </View>
              )}
            </View>

            <TouchableOpacity
              style={styles.avatarEditButton}
              onPress={handlePickAvatar}
              activeOpacity={0.7}
            >
              <Feather name="camera" size={16} color={colors.surface} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.profileInfoContainer}>
          <Text style={styles.profileName}>{user?.name ?? ""}</Text>
          <Text style={styles.profileUsername}>{profile.username}</Text>
          <Text style={styles.profileBio}>{strings.profile.bio}</Text>
        </View>

        <View style={styles.statsCard}>
          <View style={[styles.statItem, styles.statItemWithBorder]}>
            <Text style={styles.statValue}>
              {profile.playingPosition || "-"}
            </Text>
            <Text style={styles.statLabel}>{strings.stats.positionLabel}</Text>
          </View>
          <View style={[styles.statItem, styles.statItemWithBorder]}>
            <Text style={styles.statValue}>{profile?.height || "-"}</Text>
            <Text style={styles.statLabel}>{strings.stats.heightLabel}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile.weight || "-"}</Text>
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
