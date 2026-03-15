import { useMemo } from "react";

import { useHomeNavigation } from "@navigation/appNavigation";
import { NAV } from "@navigation/routes";
import { AuthorType, FeedItemType, Post, UserPost } from "@models/feed";
import { useFeed } from "@hooks/queries/useFeedQueries";

export const useHome = () => {
  const { navigate } = useHomeNavigation();

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching,
  } = useFeed();

  const posts = useMemo(() => data?.pages.flat() ?? [], [data]);

  const fetchMorePosts = () => {
    if (hasNextPage) fetchNextPage();
  };

  const handleRefresh = () => refetch();

  const mapPostToUserPost = (post: Post): UserPost => ({
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
  });

  const handleCreatePostPress = () => navigate(NAV.HOME_STACK.CREATE_POST);

  return {
    posts,
    isLoading,
    isFetchingNextPage,
    isRefetching,
    fetchMorePosts,
    handleRefresh,
    mapPostToUserPost,
    handleCreatePostPress,
  };
};
