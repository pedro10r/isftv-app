import { useTournamentsNavigation } from "@navigation/appNavigation";

import { useCreateTournamentStore } from "@store/createTournamentStore";

export const TOTAL_STEPS = 3;

export const useCreateTournament = () => {
  const { goBack } = useTournamentsNavigation();

  const step = useCreateTournamentStore((s) => s.step);
  const prevStep = useCreateTournamentStore((s) => s.prevStep);
  const isSubmitting = useCreateTournamentStore((s) => s.isSubmitting);

  const handleBack = () => {
    if (step > 1) return prevStep();

    return goBack();
  };

  return {
    step,
    isSubmitting,
    handleBack,
  };
};
