import { useCallback, useMemo, useState } from "react";

import { NAV } from "@navigation/routes";
import { useTournamentsNavigation } from "@navigation/appNavigation";
import { useTournaments as useTournamentsQuery } from "@hooks/queries/useTournamentQueries";
import { useAuthStore } from "@store/authStore";

export const useTournaments = () => {
  const { navigate } = useTournamentsNavigation();
  const { data: tournaments = [], isLoading, refetch } = useTournamentsQuery();
  const canCreateTournament = useAuthStore(
    (s) => s.role === "organizer" || s.role === "admin",
  );

  const [isManualRefreshing, setIsManualRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setIsManualRefreshing(true);

    try {
      await refetch();
    } finally {
      setIsManualRefreshing(false);
    }
  }, [refetch]);
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filteredTournaments = useMemo(() => {
    if (activeFilter === "Todos") return tournaments;

    return tournaments.filter((t) =>
      t.tournament_categories.some((c) => c.name === activeFilter),
    );
  }, [activeFilter, tournaments]);

  const handleFilterPress = useCallback((filter: string) => {
    setActiveFilter(filter);
  }, []);

  const handleCardPress = useCallback(
    (id: string) => {
      navigate(NAV.TOURNAMENTS_STACK.TOURNAMENT_DETAILS, {
        tournamentId: id,
      });
    },
    [navigate],
  );

  const handleAddPress = useCallback(() => {
    navigate(NAV.TOURNAMENTS_STACK.CREATE_TOURNAMENT);
  }, [navigate]);

  return {
    isLoading,
    isManualRefreshing,
    canCreateTournament,
    activeFilter,
    filteredTournaments,
    handleFilterPress,
    handleCardPress,
    handleAddPress,
    handleRefresh,
  };
};
