import { useShallow } from "zustand/react/shallow";

import { useCreateTournamentStore } from "@store/createTournamentStore";
import { useDraftGuard } from "./useDraftGuard";

export const TOTAL_STEPS = 3;

export const useCreateTournament = () => {
  const { guardedGoBack } = useDraftGuard();

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

    return guardedGoBack();
  };

  return {
    step,
    isSubmitting,
    isPublishedSuccess,
    handleBack,
  };
};
