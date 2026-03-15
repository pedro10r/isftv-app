import { useMemo } from "react";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Feather } from "@expo/vector-icons";

import { Post } from "@models/feed";
import { FeedUserPost } from "@components";
import { ScreenTemplate } from "@components/templates";
import { EmptyListState } from "@components/molecules/EmptyListState";
import { useAppTheme } from "@theme/ThemeContext";

import { createStyles } from "./styles";
import { useHome } from "./hooks";
import { strings } from "./strings";

export function Home() {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const {
    posts,
    isLoading,
    isFetchingMore,
    fetchMorePosts,
    mapPostToUserPost,
    handleCreatePostPress,
  } = useHome();

  const renderItem = ({ item }: { item: Post }) => (
    <FeedUserPost data={mapPostToUserPost(item)} />
  );

  return (
    <ScreenTemplate>
      <View style={styles.header}>
        <Text style={styles.title}>{strings.title}</Text>
        <Pressable onPress={handleCreatePostPress} hitSlop={8}>
          <Feather name="plus" size={24} color={colors.textPrimary} />
        </Pressable>
      </View>

      {isLoading && (
        <ActivityIndicator
          color={colors.textPrimary}
          style={{ marginVertical: 20 }}
        />
      )}

      <FlashList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        onEndReached={fetchMorePosts}
        onEndReachedThreshold={0.5}
        contentContainerStyle={[
          styles.listContent,
          !posts.length && styles.listContentEmpty,
        ]}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <EmptyListState
            icon="message-square"
            message={strings.emptyState.message}
          />
        }
        ListFooterComponent={
          isFetchingMore && posts.length > 0 ? (
            <ActivityIndicator
              color={colors.textPrimary}
              style={{ paddingVertical: 16 }}
            />
          ) : null
        }
      />
    </ScreenTemplate>
  );
}
