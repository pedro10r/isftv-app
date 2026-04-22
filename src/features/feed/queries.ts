import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  InfiniteData,
} from "@tanstack/react-query";

import { Post, FeedItemType } from "@features/feed/types";
import { Profile } from "@features/profile/types";
import {
  getFeedPosts,
  getUserPosts,
  createFeedPost,
  toggleFeedLike,
} from "@features/feed/services";
import { feedQueryKey, profileQueryKey } from "@shared/queryKeys";

export const FEED_QUERY_KEY = feedQueryKey;

const FEED_LIMIT = 10;

type CreatePostVariables = {
  authorId: string;
  content: string;
  imageUri?: string;
};

export function useFeed() {
  return useInfiniteQuery({
    queryKey: feedQueryKey,
    queryFn: ({ pageParam }) => getFeedPosts(pageParam, FEED_LIMIT),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === FEED_LIMIT ? allPages.length : undefined,
  });
}

export function useUserPosts(userId: string | undefined) {
  return useQuery({
    queryKey: ["user-posts", userId],
    queryFn: () => getUserPosts(userId!),
    enabled: !!userId,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ authorId, content, imageUri }: CreatePostVariables) =>
      createFeedPost(authorId, content, imageUri ?? null),

    onMutate: async ({ authorId, content, imageUri }) => {
      await queryClient.cancelQueries({ queryKey: feedQueryKey });

      const previousData =
        queryClient.getQueryData<InfiniteData<Post[]>>(feedQueryKey);

      const profile = queryClient.getQueryData<Profile>(
        profileQueryKey(authorId),
      );

      const optimisticPost: Post = {
        id: `optimistic-${Date.now()}`,
        author_id: authorId,
        content,
        media_url: imageUri ?? null,
        is_video: false,
        type: FeedItemType.UserPost,
        reference_id: null,
        created_at: new Date().toISOString(),
        profiles: {
          full_name: profile?.full_name ?? null,
          username: profile?.username ?? null,
          avatar_url: profile?.avatar_url ?? null,
        },
        likes: [],
      };

      queryClient.setQueryData<InfiniteData<Post[]>>(feedQueryKey, (old) => {
        if (!old) return old;

        return {
          ...old,
          pages: [[optimisticPost, ...old.pages[0]], ...old.pages.slice(1)],
        };
      });

      return { previousData };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(feedQueryKey, context.previousData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: feedQueryKey });
    },
  });
}

type ToggleLikeVariables = {
  postId: string;
  userId: string;
  isCurrentlyLiked: boolean;
};

export function useToggleLike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, userId, isCurrentlyLiked }: ToggleLikeVariables) =>
      toggleFeedLike(postId, userId, isCurrentlyLiked),

    onMutate: async ({ postId, userId, isCurrentlyLiked }) => {
      await queryClient.cancelQueries({ queryKey: feedQueryKey });

      const previousData =
        queryClient.getQueryData<InfiniteData<Post[]>>(feedQueryKey);

      queryClient.setQueryData<InfiniteData<Post[]>>(feedQueryKey, (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) =>
            page.map((post) => {
              if (post.id !== postId) return post;
              return {
                ...post,
                likes: isCurrentlyLiked
                  ? post.likes.filter((l) => l.user_id !== userId)
                  : [...post.likes, { user_id: userId }],
              };
            }),
          ),
        };
      });

      return { previousData };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(feedQueryKey, context.previousData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: feedQueryKey });
    },
  });
}
