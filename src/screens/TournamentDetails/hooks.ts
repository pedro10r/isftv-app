import { useCallback } from "react";
import { Linking } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";

import { useTournamentsNavigation } from "@navigation/appNavigation";
import { NAV } from "@navigation/routes";
import { TournamentsStackParamList } from "@navigation/types";
import { useTournamentDetails as useTournamentDetailsQuery } from "@hooks/queries/useTournamentQueries";
import { Prizes } from "@models/tournament";
import { formatCurrency } from "@utils";

import { strings } from "./strings";

type TournamentDetailsRouteProp = RouteProp<
  TournamentsStackParamList,
  typeof NAV.TOURNAMENTS_STACK.TOURNAMENT_DETAILS
>;

export interface FormattedPrizeLine {
  label: string;
  value: string;
}

export function formatPrizes(prizes: Prizes): FormattedPrizeLine[] {
  const TIER_LABELS = {
    first_place: strings.prizes.places.first,
    second_place: strings.prizes.places.second,
    third_place: strings.prizes.places.third,
  };

  type TierKey = keyof typeof TIER_LABELS;

  const tierLines = (Object.keys(TIER_LABELS) as TierKey[])
    .filter((key) => prizes[key])
    .map((key) => {
      const tier = prizes[key]!;
      const parts: string[] = [];
      if (tier.cash) parts.push(formatCurrency(tier.cash));
      if (tier.trophy) parts.push(strings.prizes.trophy);

      return {
        label: TIER_LABELS[key],
        value: parts.join(" + ") || strings.prizes.empty,
      };
    });

  if (prizes.fourth_place) {
    const parts: string[] = [];
    if (prizes.fourth_place.text) parts.push(prizes.fourth_place.text);
    if (prizes.fourth_place.trophy) parts.push(strings.prizes.trophy);

    tierLines.push({
      label: strings.prizes.places.fourth,
      value: parts.join(" + ") || strings.prizes.empty,
    });
  }

  return tierLines;
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

    Linking.openURL(`https://wa.me/55${phone}`); // TODO: Open in Whatsapp App
  }, [tournament?.contact_whatsapp]);

  return {
    tournament,
    isLoading,
    isError,
    handleGoBack,
    handleContactOrganizer,
  };
};
