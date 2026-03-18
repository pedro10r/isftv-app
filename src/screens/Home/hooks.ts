import { useMemo, useState, useCallback } from "react";

import { useHomeNavigation, useTabNavigation } from "@navigation/appNavigation";
import { NAV } from "@navigation/routes";
import { AuthorType, FeedItemType, Post, UserPost } from "@models/feed";
import { useAuthStore } from "@store/authStore";
import { useFeed, useToggleLike } from "@hooks/queries/useFeedQueries";

export const useHome = () => {
  const { navigate } = useHomeNavigation();
  const { navigate: navigateTab } = useTabNavigation();

  const userId = useAuthStore((s) => s.session?.user.id);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useFeed();

  const { mutate: toggleLike } = useToggleLike();

  const [isManualRefreshing, setIsManualRefreshing] = useState(false);

  const posts = useMemo(() => data?.pages.flat() ?? [], [data]);

  const fetchMorePosts = () => {
    if (hasNextPage) fetchNextPage();
  };

  const handleRefresh = useCallback(async () => {
    setIsManualRefreshing(true);
    try {
      await refetch();
    } finally {
      setIsManualRefreshing(false);
    }
  }, [refetch]);

  const mapPostToUserPost = (post: Post): UserPost => {
    const isLiked = post.likes?.some((l) => l.user_id === userId) ?? false;

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
      likes: post.likes?.length ?? 0,
      isLiked,
      onLikePress: () => {
        if (!userId) return;
        toggleLike({ postId: post.id, userId, isCurrentlyLiked: isLiked });
      },
      comments: 0,
    };
  };

  const handleCreatePostPress = () => navigate(NAV.HOME_STACK.CREATE_POST);

  const handleNavigateToAuthorProfile = (authorId: string) => {
    if (authorId === userId) {
      navigateTab({
        name: NAV.TABS.PROFILE_STACK,
        params: { screen: NAV.PROFILE_STACK.PROFILE },
      });
      return;
    }

    navigate(NAV.HOME_STACK.OTHER_PROFILE, { userId: authorId });
  };

  return {
    posts,
    isLoading,
    isFetchingNextPage,
    isManualRefreshing,
    fetchMorePosts,
    handleRefresh,
    mapPostToUserPost,
    handleCreatePostPress,
    handleNavigateToAuthorProfile,
  };
};
