import { create } from "zustand";

import { Category, Tournament } from "@models/tournament";
import { CreateTournamentFormData } from "@screens/CreateTournament/schemas";

interface TournamentState {
  tournaments: Tournament[];
  addTournament: (data: CreateTournamentFormData) => void;
}

function toISO(ddmmyyyy: string): string {
  const [dd, mm, yyyy] = ddmmyyyy.split("/");
  return `${yyyy}-${mm}-${dd}`;
}

export const useTournamentStore = create<TournamentState>()((set) => ({
  tournaments: [],
  addTournament: (data) =>
    set((state) => ({
      tournaments: [
        {
          id: Date.now().toString(),
          name: data.name,
          venueName: data.arena,
          city: data.city,
          posterUrl: data.imageUri ?? "",
          startDate: toISO(data.startDate),
          endDate: toISO(data.endDate),
          registrationFee: parseInt(data.price.replace(/\D/g, ""), 10) / 100,
          status: "Inscrições Abertas",
          categories: data.categories as Category[],
          prizeFirst: data.prizeFirst,
          prizeSecond: data.prizeSecond,
          prizeThird: data.prizeThird,
          prizeFourth: data.prizeFourth,
        },
        ...state.tournaments,
      ],
    })),
}));
