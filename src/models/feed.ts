export type FeedItemType = "USER_POST" | "TOURNAMENT_PROMO";

export interface Author {
  id: string;
  name: string;
  avatarUrl: string;
  type: "PLAYER" | "ARENA";
}

export interface FeedItem {
  id: string;
  type: FeedItemType;
  createdAt: string; // ISO 8601
}

export interface UserPost extends FeedItem {
  type: "USER_POST";
  author: Author;
  content: string;
  mediaUrl?: string;
  isVideo?: boolean;
  likes: number;
  comments: number;
}

export interface TournamentPromo extends FeedItem {
  type: "TOURNAMENT_PROMO";
  title: string;
  message: string;
  tournamentId: string;
  bannerUrl: string;
}

export type FeedData = UserPost | TournamentPromo;
