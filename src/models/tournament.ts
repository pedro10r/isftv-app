export interface PrizeTier {
  cash: number;
  trophy?: boolean;
}

export interface FourthPlaceTier {
  text?: string;
  trophy?: boolean;
}

export interface Prizes {
  first_place?: PrizeTier;
  second_place?: PrizeTier;
  third_place?: PrizeTier;
  fourth_place?: FourthPlaceTier;
}

export interface TournamentCategory {
  id: string;
  tournament_id: string;
  name: string;
  registration_fee: number;
  prizes: Prizes;
}

export interface TournamentOrganizer {
  full_name: string | null;
  avatar_url: string | null;
}

export type TournamentStatus =
  | "Inscrições Abertas"
  | "Em Andamento"
  | "Finalizado";

export interface Tournament {
  id: string;
  name: string;
  venue_name: string;
  poster_url: string | null;
  start_date: string; // ISO 8601 (YYYY-MM-DD)
  end_date: string; // ISO 8601 (YYYY-MM-DD)
  contact_whatsapp: string;
  organizer_id: string;
  city: string;
  status?: TournamentStatus;
  profiles: TournamentOrganizer | null;
  tournament_categories: TournamentCategory[];
}
