import { create } from "zustand";

import { Post } from "@models/feed";
import { getFeedPosts, createFeedPost } from "@services/feedService";

const FEED_LIMIT = 2;

interface FeedState {
  posts: Post[];
  page: number;
  hasMore: boolean;
  isLoading: boolean;
  isFetchingMore: boolean;
  isCreatingPost: boolean;
  error: string | null;
  fetchFeed: () => Promise<void>;
  fetchMorePosts: () => Promise<void>;
  addPost: (
    userId: string,
    content: string,
    imageUri?: string,
  ) => Promise<void>;
}

export const useFeedStore = create<FeedState>()((set, get) => ({
  posts: [],
  page: 0,
  hasMore: true,
  isLoading: false,
  isFetchingMore: false,
  isCreatingPost: false,
  error: null,

  fetchFeed: async () => {
    set({ isLoading: true, error: null, page: 0, hasMore: true });
    try {
      const posts = await getFeedPosts(0, FEED_LIMIT);
      set({ posts, hasMore: posts.length === FEED_LIMIT });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Erro ao carregar feed",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMorePosts: async () => {
    if (get().isFetchingMore || !get().hasMore) return;

    set({ isFetchingMore: true });
    try {
      const nextPage = get().page + 1;
      const newPosts = await getFeedPosts(nextPage, FEED_LIMIT);

      set((state) => ({
        posts: [...state.posts, ...newPosts],
        page: nextPage,
        hasMore: newPosts.length === FEED_LIMIT,
      }));
    } catch (err) {
      set({
        error:
          err instanceof Error ? err.message : "Erro ao carregar mais posts",
      });
    } finally {
      set({ isFetchingMore: false });
    }
  },

  addPost: async (userId, content, imageUri) => {
    set({ isCreatingPost: true, error: null });
    try {
      const newPost = await createFeedPost(userId, content, imageUri ?? null);
      set((state) => ({ posts: [newPost, ...state.posts] }));
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Erro ao publicar post",
      });
      throw err;
    } finally {
      set({ isCreatingPost: false });
    }
  },
}));
