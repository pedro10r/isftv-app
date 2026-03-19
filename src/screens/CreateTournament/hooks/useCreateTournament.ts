import { useShallow } from "zustand/react/shallow";

import { useTournamentsNavigation } from "@navigation/appNavigation";
import { useCreateTournamentStore } from "@store/createTournamentStore";

export const TOTAL_STEPS = 3;

export const useCreateTournament = () => {
  const { goBack } = useTournamentsNavigation();

  const { step, prevStep, isSubmitting, isPublishedSuccess } =
    useCreateTournamentStore(
      useShallow((state) => ({
        step: state.step,
        prevStep: state.prevStep,
        isSubmitting: state.isSubmitting,
        isPublishedSuccess: state.isPublishedSuccess,
      })),
    );

  const handleBack = () => {
    if (step > 1) return prevStep();

    return goBack();
  };

  return {
    step,
    isSubmitting,
    isPublishedSuccess,
    handleBack,
  };
};
