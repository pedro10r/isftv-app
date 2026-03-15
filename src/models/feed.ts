export enum FeedItemType {
  UserPost = "USER_POST",
  TournamentPromo = "TOURNAMENT_PROMO",
}

export enum AuthorType {
  Player = "PLAYER",
  Arena = "ARENA",
}

export interface Author {
  id: string;
  name: string;
  avatarUrl: string;
  type: AuthorType;
}

export interface FeedItem {
  id: string;
  type: FeedItemType;
  createdAt: string; // ISO 8601
}

export interface UserPost extends FeedItem {
  type: FeedItemType.UserPost;
  author: Author;
  content: string;
  mediaUrl?: string;
  isVideo?: boolean;
  likes: number;
  comments: number;
}

export interface TournamentPromo extends FeedItem {
  type: FeedItemType.TournamentPromo;
  title: string;
  message: string;
  tournamentId: string;
  bannerUrl: string;
}

export interface Post {
  id: string;
  author_id: string;
  content: string | null;
  media_url: string | null;
  is_video: boolean | null;
  type: FeedItemType | null;
  reference_id: string | null;
  created_at: string;
  profiles: {
    full_name: string | null;
    username: string | null;
    avatar_url: string | null;
  } | null;
}
