import { create } from "zustand";

import { FeedData, UserPost } from "@models/feed";
import { CreatePostFormValues } from "@screens/CreatePost/schemas";

interface FeedState {
  feed: FeedData[];
  addPost: (data: CreatePostFormValues) => void;
}

export const useFeedStore = create<FeedState>()((set) => ({
  feed: [],
  addPost: (data) => {
    const newPost: UserPost = {
      id: Date.now().toString(),
      type: "USER_POST",
      createdAt: new Date().toISOString(),
      author: {
        id: "user-1",
        name: "Pedro",
        avatarUrl: "https://i.pravatar.cc/150?u=pedro",
        type: "PLAYER",
      },
      content: data.content,
      mediaUrl: data.mediaUrl,
      isVideo: data.isVideo,
      likes: 0,
      comments: 0,
    };
    set((state) => ({ feed: [newPost, ...state.feed] }));
  },
}));
