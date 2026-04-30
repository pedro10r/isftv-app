import { useEffect, useMemo, useRef } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";

import { FeedUserPost } from "@components/organisms";
import { UserPost } from "@features/feed/types";
import { useAppTheme } from "@theme/ThemeContext";

import { useProfilePosts } from "./hooks";
import { createStyles } from "./styles";
import { strings } from "./strings";

export function ProfilePosts() {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const insets = useSafeAreaInsets();
  const listRef = useRef<FlatList<UserPost>>(null);

  const { posts, goBack, initialIndex } = useProfilePosts();

  useEffect(() => {
    if (initialIndex > 0 && posts.length > initialIndex) {
      listRef.current?.scrollToIndex({ index: initialIndex, animated: false });
    }
  }, [initialIndex, posts.length]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={goBack} hitSlop={8}>
          <Feather name="chevron-left" size={24} color={colors.textPrimary} />
        </Pressable>

        <View style={styles.headerInfo}>
          <Text style={styles.title}>{strings.header.title}</Text>
        </View>

        <View style={styles.spacer} />
      </View>

      <FlatList
        ref={listRef}
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FeedUserPost data={item} />}
        showsVerticalScrollIndicator={false}
        onScrollToIndexFailed={() => {}}
      />
    </View>
  );
}
