import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createTournament,
  CreateTournamentPayload,
  getTournamentById,
  getTournaments,
} from "@features/tournaments/services";
import { tournamentsQueryKey } from "@shared/queryKeys";

export const TOURNAMENTS_QUERY_KEY = tournamentsQueryKey;

export function useTournaments() {
  return useQuery({
    queryKey: tournamentsQueryKey,
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
      queryClient.invalidateQueries({ queryKey: tournamentsQueryKey });
    },
  });
}
