import { ReactNode, useCallback, useMemo, useRef } from "react";
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
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";

import { DetailRow, EmptyListState } from "@components/molecules";
import { OutlineButton } from "@components/atoms";
import { useAppTheme } from "@theme/ThemeContext";
import { getInitials } from "@utils/getInitials";

import { createStyles } from "./styles";
import { strings } from "./strings";

interface ProfileStats {
  position: string;
  city: string;
}

interface ProfileDetails {
  height: string;
  location: string;
  whatsapp: string;
}

interface ProfileTemplateProps {
  fullName: string;
  bio: string;
  avatarUrl?: string;
  coverUrl?: string;
  stats: ProfileStats;
  details: ProfileDetails;
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
  bio,
  avatarUrl,
  coverUrl,
  stats,
  details,
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
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentDetails = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  const sheetItems = [
    {
      label: strings.details.name,
      value: fullName || strings.details.notInformed,
    },
    { label: strings.details.bio, value: bio || strings.details.notInformed },
    {
      label: strings.details.position,
      value:
        stats.position !== "-" ? stats.position : strings.details.notInformed,
    },
    { label: strings.details.height, value: details.height },
    { label: strings.details.location, value: details.location },
    { label: strings.details.whatsapp, value: details.whatsapp },
  ];

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
          <Text style={styles.profileBio}>{bio}</Text>
        </View>

        <View style={styles.profileInfoContent}>
          {stats.city !== "-" && (
            <View style={styles.profileInfo}>
              <Feather name="map-pin" size={12} color={colors.textSecondary} />
              <Text style={styles.profileInfoText}>{stats.city}</Text>
            </View>
          )}

          {stats.position !== "-" && (
            <View style={styles.profileInfo}>
              <Feather name="activity" size={12} color={colors.textSecondary} />
              <Text style={styles.profileInfoText}>{stats.position}</Text>
            </View>
          )}
        </View>

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
            <>
              <OutlineButton
                label={strings.actions.seeDetails}
                onPress={handlePresentDetails}
              />
              <OutlineButton
                label={strings.actions.callWhatsApp}
                onPress={onCallWhatsApp!}
                color={colors.whatsapp_green}
              />
            </>
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

      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={["85%"]}
        backdropComponent={renderBackdrop}
        backgroundStyle={styles.sheetBackground}
        handleIndicatorStyle={styles.sheetHandleIndicator}
      >
        <Text style={styles.sheetTitle}>{strings.details.title}</Text>

        <BottomSheetScrollView contentContainerStyle={styles.sheetContent}>
          {sheetItems.map((item, index) => (
            <View key={item.label}>
              {index > 0 && <View style={styles.sheetDivider} />}
              <DetailRow label={item.label} value={item.value} />
            </View>
          ))}
        </BottomSheetScrollView>
      </BottomSheetModal>
    </SafeAreaView>
  );
}
