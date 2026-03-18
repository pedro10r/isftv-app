import { ReactNode, useMemo } from "react";
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

import { createStyles } from "./styles";
import { strings } from "./strings";

interface ProfileStats {
  position: string;
  height: string;
  weight: string;
}

interface ProfileTemplateProps {
  fullName: string;
  username: string;
  bio: string;
  avatarUrl?: string;
  coverUrl?: string;
  stats: ProfileStats;
  isMe: boolean;
  isUploadingMedia?: boolean;
  onEditProfile?: () => void;
  onSettings?: () => void;
  onCallWhatsApp?: () => void;
  onPickAvatar?: () => void;
  onPickCover?: () => void;
  renderMediaGrid?: () => ReactNode;
}

export function ProfileTemplate({
  fullName,
  username,
  bio,
  avatarUrl,
  coverUrl,
  stats,
  isMe,
  isUploadingMedia = false,
  onEditProfile,
  onSettings,
  onCallWhatsApp,
  onPickAvatar,
  onPickCover,
  renderMediaGrid,
}: ProfileTemplateProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

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

          {isMe && (
            <TouchableOpacity
              style={styles.coverActionButton}
              onPress={onPickCover}
              activeOpacity={0.7}
              disabled={isUploadingMedia}
            >
              {isUploadingMedia ? (
                <ActivityIndicator size="small" color={colors.textPrimary} />
              ) : (
                <Feather name="image" size={18} color={colors.textPrimary} />
              )}
            </TouchableOpacity>
          )}
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
                    {getInitials(fullName)}
                  </Text>
                </View>
              )}
            </View>

            {isMe && (
              <TouchableOpacity
                style={styles.avatarEditButton}
                onPress={onPickAvatar}
                activeOpacity={0.7}
                disabled={isUploadingMedia}
              >
                {isUploadingMedia ? (
                  <ActivityIndicator size="small" color={colors.surface} />
                ) : (
                  <Feather name="camera" size={16} color={colors.surface} />
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.profileInfoContainer}>
          <Text style={styles.profileName}>{fullName}</Text>
          <Text style={styles.profileUsername}>{username}</Text>
          <Text style={styles.profileBio}>{bio}</Text>
        </View>

        <StatsCard
          items={[
            { value: stats.position, label: strings.stats.positionLabel },
            { value: stats.height, label: strings.stats.heightLabel },
            { value: stats.weight, label: strings.stats.weightLabel },
          ]}
        />

        <View style={styles.actionsRow}>
          {isMe ? (
            <>
              <OutlineButton
                label={strings.actions.editProfile}
                onPress={onEditProfile!}
              />
              <OutlineButton
                label={strings.actions.settings}
                onPress={onSettings!}
              />
            </>
          ) : (
            <OutlineButton
              label={strings.actions.callWhatsApp}
              onPress={onCallWhatsApp!}
              color={colors.whatsapp_green}
            />
          )}
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{strings.sections.media}</Text>
          {renderMediaGrid ? (
            renderMediaGrid()
          ) : (
            <View style={styles.emptyStateWrapper}>
              <EmptyListState
                icon="camera"
                message={strings.emptyState.message}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
