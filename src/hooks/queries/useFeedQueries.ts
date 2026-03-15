import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  InfiniteData,
} from "@tanstack/react-query";

import { Post, FeedItemType } from "@models/feed";
import { getFeedPosts, createFeedPost } from "@services/feedService";
import { useProfileStore } from "@store/profileStore";

export const FEED_QUERY_KEY = ["posts"] as const;

const FEED_LIMIT = 10;

type CreatePostVariables = {
  authorId: string;
  content: string;
  imageUri?: string;
};

export function useFeed() {
  return useInfiniteQuery({
    queryKey: FEED_QUERY_KEY,
    queryFn: ({ pageParam }) => getFeedPosts(pageParam, FEED_LIMIT),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === FEED_LIMIT ? allPages.length : undefined,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ authorId, content, imageUri }: CreatePostVariables) =>
      createFeedPost(authorId, content, imageUri ?? null),

    onMutate: async ({ authorId, content, imageUri }) => {
      await queryClient.cancelQueries({ queryKey: FEED_QUERY_KEY });

      const previousData =
        queryClient.getQueryData<InfiniteData<Post[]>>(FEED_QUERY_KEY);

      const profile = useProfileStore.getState().profile;

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
      };

      queryClient.setQueryData<InfiniteData<Post[]>>(FEED_QUERY_KEY, (old) => {
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
        queryClient.setQueryData(FEED_QUERY_KEY, context.previousData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: FEED_QUERY_KEY });
    },
  });
}
