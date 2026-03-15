import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { useShallow } from "zustand/shallow";

import { useHomeNavigation } from "@navigation/appNavigation";
import { NAV } from "@navigation/routes";
import { useFeedStore } from "@store/feedStore";
import { AuthorType, FeedItemType, Post, UserPost } from "@models/feed";

export const useHome = () => {
  const { navigate } = useHomeNavigation();

  const { posts, isLoading, fetchFeed } = useFeedStore(
    useShallow((state) => ({
      posts: state.posts,
      isLoading: state.isLoading,
      fetchFeed: state.fetchFeed,
    })),
  );

  useFocusEffect(
    useCallback(() => {
      fetchFeed();
    }, [fetchFeed]),
  );

  const mapPostToUserPost = (post: Post): UserPost => {
    return {
      id: post.id,
      type: FeedItemType.UserPost,
      createdAt: post.created_at,
      author: {
        id: post.author_id,
        name: post.profiles?.full_name ?? post.profiles?.username ?? "Usuário",
        avatarUrl: post.profiles?.avatar_url ?? "",
        type: AuthorType.Player,
      },
      content: post.content ?? "",
      mediaUrl: post.media_url ?? undefined,
      isVideo: post.is_video ?? false,
      likes: 0,
      comments: 0,
    };
  };

  const handleCreatePostPress = () => navigate(NAV.HOME_STACK.CREATE_POST);

  return { posts, isLoading, mapPostToUserPost, handleCreatePostPress };
};
