import { useCallback } from "react";
import { Linking } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";

import { useTournamentsNavigation } from "@navigation/appNavigation";
import { NAV } from "@navigation/routes";
import { TournamentsStackParamList } from "@navigation/types";
import { useTournamentDetails as useTournamentDetailsQuery } from "@hooks/queries/useTournamentQueries";
import { Colors } from "@theme";
import { Prizes } from "@models/tournament";
import { formatCurrency } from "@utils";

type TournamentDetailsRouteProp = RouteProp<
  TournamentsStackParamList,
  typeof NAV.TOURNAMENTS_STACK.TOURNAMENT_DETAILS
>;

export interface FormattedPrizeLine {
  label: string;
  value: string;
}

export function formatPrizes(prizes: Prizes): FormattedPrizeLine[] {
  const PLACE_LABELS: Record<keyof Prizes, string> = {
    first_place: "1º Lugar",
    second_place: "2º Lugar",
    third_place: "3º Lugar",
  };

  return (Object.keys(PLACE_LABELS) as (keyof Prizes)[])
    .filter((key) => prizes[key])
    .map((key) => {
      const tier = prizes[key]!;
      const parts: string[] = [];

      if (tier.cash) parts.push(formatCurrency(tier.cash));
      if (tier.trophy) parts.push("Troféu");
      if (tier.medal) parts.push("Medalha");
      return { label: PLACE_LABELS[key], value: parts.join(" + ") || "-" };
    });
}

export const useTournamentDetails = () => {
  const { goBack } = useTournamentsNavigation();
  const route = useRoute<TournamentDetailsRouteProp>();
  const tournamentId = route.params.tournamentId;

  const {
    data: tournament,
    isLoading,
    isError,
  } = useTournamentDetailsQuery(tournamentId);

  const handleGoBack = useCallback(() => goBack(), [goBack]);

  const handleContactOrganizer = useCallback(() => {
    if (!tournament?.contact_whatsapp) return;
    const phone = tournament.contact_whatsapp.replace(/\D/g, "");
    Linking.openURL(`https://wa.me/55${phone}`);
  }, [tournament?.contact_whatsapp]);

  const getPrizeColors = (colors: Colors) =>
    ({
      first_place: { bg: `${colors.prizeGold}22`, icon: colors.prizeGold },
      second_place: { bg: `${colors.prizeSilver}22`, icon: colors.prizeSilver },
      third_place: { bg: `${colors.prizeBronze}22`, icon: colors.prizeBronze },
    }) as const;

  return {
    tournament,
    isLoading,
    isError,
    handleGoBack,
    handleContactOrganizer,
    getPrizeColors,
  };
};
