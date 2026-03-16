import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createTournament,
  CreateTournamentPayload,
  getTournamentById,
  getTournaments,
} from "@services/tournamentService";

export const TOURNAMENTS_QUERY_KEY = ["tournaments"] as const;

export function useTournaments() {
  return useQuery({
    queryKey: TOURNAMENTS_QUERY_KEY,
    queryFn: getTournaments,
  });
}

export function useTournamentDetails(id: string) {
  return useQuery({
    queryKey: ["tournament", id],
    queryFn: () => getTournamentById(id),
    enabled: !!id,
  });
}

export function useCreateTournamentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTournamentPayload) => createTournament(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TOURNAMENTS_QUERY_KEY });
    },
  });
}
