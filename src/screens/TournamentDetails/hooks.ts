import { useCallback } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";

import { useTournamentsNavigation } from "@navigation/appNavigation";
import { NAV } from "@navigation/routes";
import { TournamentsStackParamList } from "@navigation/types";
import { useTournamentStore } from "@store/tournamentStore";
import { Colors } from "@theme";

type TournamentDetailsRouteProp = RouteProp<
  TournamentsStackParamList,
  typeof NAV.TOURNAMENTS_STACK.TOURNAMENT_DETAILS
>;

export const useTournamentDetails = () => {
  const { goBack } = useTournamentsNavigation();
  const route = useRoute<TournamentDetailsRouteProp>();

  const tournamentId = route.params.tournamentId;
  const tournament = useTournamentStore((s) =>
    s.tournaments.find((t) => t.id === tournamentId),
  );

  const prizes = tournament
    ? [
        { place: 1, value: tournament.prizeFirst },
        { place: 2, value: tournament.prizeSecond },
        { place: 3, value: tournament.prizeThird },
        { place: 4, value: tournament.prizeFourth },
      ].filter((p) => p.value != null)
    : [];

  const handleGoBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleEnroll = useCallback(() => {
    if (!tournament) return;
    console.log("Inscrever dupla:", tournament.id);
  }, [tournament]);

  const getPrizeColors = (colors: Colors) =>
    ({
      1: { bg: `${colors.prizeGold}22`, icon: colors.prizeGold },
      2: { bg: `${colors.prizeSilver}22`, icon: colors.prizeSilver },
      3: { bg: `${colors.prizeBronze}22`, icon: colors.prizeBronze },
      4: { bg: colors.surfaceDarkVariant, icon: colors.textSecondary },
    }) as const;

  return {
    tournament,
    prizes,
    handleGoBack,
    handleEnroll,
    getPrizeColors,
  };
};
