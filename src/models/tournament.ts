export type Category =
  | "Iniciante"
  | "Amador C"
  | "Amador B"
  | "Amador A"
  | "Open"
  | "Misto";

export type TournamentStatus =
  | "Inscrições Abertas"
  | "Em Andamento"
  | "Finalizado";

export interface Tournament {
  id: string;
  name: string;
  venueName: string;
  posterUrl: string;
  startDate: string; // ISO 8601 (YYYY-MM-DD)
  endDate: string; // ISO 8601 (YYYY-MM-DD)
  registrationFee: number;
  status: TournamentStatus;
  categories: Category[];
  prizeFirst?: string;
  prizeSecond?: string;
  prizeThird?: string;
  prizeFourth?: string;
}
