export type PlayingPosition = "Direita" | "Esquerda" | "Ambos";

export interface Profile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  cover_url: string | null;
  bio: string | null;
  playing_position: PlayingPosition | null;
  height: number | null;
  weight: number | null;
  whatsapp: string | null;
}
