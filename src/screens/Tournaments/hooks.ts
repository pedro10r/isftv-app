import { useCallback, useMemo, useState } from "react";

import { TOURNAMENTS_MOCK } from "@mocks/tournaments";
import { Category } from "@models/tournament";
import { NAV } from "@navigation/routes";
import { useTournamentsNavigation } from "@navigation/appNavigation";

export const useTournaments = () => {
  const { navigate } = useTournamentsNavigation();
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filteredTournaments = useMemo(() => {
    if (activeFilter === "Todos") return TOURNAMENTS_MOCK;

    return TOURNAMENTS_MOCK.filter((t) =>
      t.categories.includes(activeFilter as Category),
    );
  }, [activeFilter]);

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
