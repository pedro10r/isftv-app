import { useMemo } from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Skeleton } from "@components/atoms";
import { useAppTheme } from "@theme/ThemeContext";
import { theme } from "@theme";
import { TAB_BAR_OFFSET } from "@constants/layout";

import { createStyles } from "./styles";

const { spacing, radii } = theme;

const COVER_HEIGHT = 180;
const AVATAR_SIZE = spacing.xxl * 2.3;

export function ProfileTemplateLoading() {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <SafeAreaView style={styles.container} edges={["left"]}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: TAB_BAR_OFFSET }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      >
        <Skeleton width="100%" height={COVER_HEIGHT} borderRadius={0} />

        <View style={styles.avatarWrapper}>
          <Skeleton
            width={AVATAR_SIZE}
            height={AVATAR_SIZE}
            borderRadius={999}
          />
        </View>

        <View style={styles.infoContainer}>
          <Skeleton width={180} height={22} borderRadius={radii.s} />
          <Skeleton width="80%" height={16} borderRadius={radii.s} />
          <Skeleton width="60%" height={16} borderRadius={radii.s} />
        </View>

        <View style={styles.pillsRow}>
          <Skeleton width={100} height={14} borderRadius={radii.s} />
          <Skeleton width={80} height={14} borderRadius={radii.s} />
        </View>

        <View style={styles.actionsRow}>
          <Skeleton width="48%" height={36} borderRadius={radii.m} />
          <Skeleton width="48%" height={36} borderRadius={radii.m} />
        </View>

        <View style={styles.mediaGrid}>
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} width="32%" height={110} borderRadius={radii.s} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
