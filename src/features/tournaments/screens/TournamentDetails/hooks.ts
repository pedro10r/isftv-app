import { useCallback } from "react";
import { Linking } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";

import { useTournamentsNavigation } from "@navigation/appNavigation";
import { NAV } from "@navigation/routes";
import { TournamentsStackParamList } from "@navigation/types";
import { useTournamentDetails as useTournamentDetailsQuery } from "@features/tournaments/queries";

type TournamentDetailsRouteProp = RouteProp<
  TournamentsStackParamList,
  typeof NAV.TOURNAMENTS_STACK.TOURNAMENT_DETAILS
>;

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

  return {
    tournament,
    isLoading,
    isError,
    handleGoBack,
    handleContactOrganizer,
  };
};
