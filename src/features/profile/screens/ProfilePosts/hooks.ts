import { useNavigation, useRoute } from "@react-navigation/native";

import { useAuthStore } from "@features/auth/store";
import { useProfile } from "@features/profile/queries";
import { useUserPosts, useToggleLike } from "@features/feed/queries";
import { AuthorType, FeedItemType, UserPost } from "@features/feed/types";

type ProfilePostsParams = { userId: string; initialIndex: number };

export const useProfilePosts = () => {
  const route = useRoute();
  const { userId, initialIndex } = route.params as ProfilePostsParams;

  const { goBack } = useNavigation();
  const session = useAuthStore((s) => s.session);
  const currentUserId = session?.user.id;

  const { data: profile } = useProfile(userId);
  const { data: rawPosts = [] } = useUserPosts(userId);
  const { mutate: toggleLike } = useToggleLike();

  const posts: UserPost[] = rawPosts.map((post) => {
    const isLiked =
      post.likes?.some((l) => l.user_id === currentUserId) ?? false;

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
        if (!currentUserId) return;
        toggleLike({
          postId: post.id,
          userId: currentUserId,
          isCurrentlyLiked: isLiked,
        });
      },
      comments: 0,
    };
  });

  const displayUsername = profile?.username
    ? `@${profile.username}`
    : (profile?.full_name ?? "");

  return { posts, goBack, initialIndex, displayUsername };
};
