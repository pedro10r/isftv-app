import { create } from "zustand";

import { Post } from "@models/feed";
import { getFeedPosts, createFeedPost } from "@services/feedService";

interface FeedState {
  posts: Post[];
  isLoading: boolean;
  isCreatingPost: boolean;
  error: string | null;
  fetchFeed: () => Promise<void>;
  addPost: (
    userId: string,
    content: string,
    imageUri?: string,
  ) => Promise<void>;
}

export const useFeedStore = create<FeedState>()((set) => ({
  posts: [],
  isLoading: false,
  isCreatingPost: false,
  error: null,

  fetchFeed: async () => {
    set({ isLoading: true, error: null });
    try {
      const posts = await getFeedPosts();
      set({ posts });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Erro ao carregar feed",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  addPost: async (userId, content, imageUri) => {
    set({ isCreatingPost: true, error: null });
    try {
      const newPost = await createFeedPost(userId, content, imageUri ?? null); // userId = authorId
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
