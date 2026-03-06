import { useCallback, useMemo, useState } from "react";

import { Category } from "@models/tournament";
import { NAV } from "@navigation/routes";
import { useTournamentsNavigation } from "@navigation/appNavigation";
import { useTournamentStore } from "@store/useTournamentStore";

export const useTournaments = () => {
  const { navigate } = useTournamentsNavigation();
  const tournaments = useTournamentStore((s) => s.tournaments);
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filteredTournaments = useMemo(() => {
    if (activeFilter === "Todos") return tournaments;

    return tournaments.filter((t) =>
      t.categories.includes(activeFilter as Category),
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
    activeFilter,
    filteredTournaments,
    handleFilterPress,
    handleCardPress,
    handleAddPress,
  };
};
