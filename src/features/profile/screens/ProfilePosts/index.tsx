import { useEffect, useRef } from "react";
import { FlatList } from "react-native";

import { ScreenTemplate } from "@components/templates";
import { FeedUserPost } from "@components/organisms";
import { UserPost } from "@features/feed/types";

import { useProfilePosts } from "./hooks";
import { strings } from "./strings";

export function ProfilePosts() {
  const listRef = useRef<FlatList<UserPost>>(null);

  const { posts, goBack, initialIndex } = useProfilePosts();

  useEffect(() => {
    if (initialIndex > 0 && posts.length > initialIndex) {
      listRef.current?.scrollToIndex({ index: initialIndex, animated: false });
    }
  }, [initialIndex, posts.length]);

  return (
    <ScreenTemplate showBackButton onBack={goBack} title={strings.header.title}>
      <FlatList
        ref={listRef}
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FeedUserPost data={item} />}
        showsVerticalScrollIndicator={false}
        onScrollToIndexFailed={() => {}}
      />
    </ScreenTemplate>
  );
}
