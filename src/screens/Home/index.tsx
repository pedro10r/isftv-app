import { useMemo } from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Feather } from "@expo/vector-icons";

import { Post } from "@models/feed";
import { FeedUserPost, ScreenTemplate, EmptyListState } from "@components";
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
    isFetchingNextPage,
    isRefetching,
    fetchMorePosts,
    handleRefresh,
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

      {isLoading ? (
        <ActivityIndicator
          color={colors.textPrimary}
          style={styles.flexContainer}
        />
      ) : (
        <FlashList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          onEndReached={fetchMorePosts}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={handleRefresh}
              tintColor={colors.textPrimary}
            />
          }
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
            isFetchingNextPage && posts.length > 0 ? (
              <ActivityIndicator
                color={colors.textPrimary}
                style={styles.footerPage}
              />
            ) : null
          }
        />
      )}
    </ScreenTemplate>
  );
}
