import { useEffect, useState } from "react";
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useShallow } from "zustand/react/shallow";

import { useCreateTournamentStore } from "@store/createTournamentStore";
import { useDraftGuard } from "./useDraftGuard";

export const TOTAL_STEPS = 3;

export const useCreateTournament = () => {
  const [trackWidth, setTrackWidth] = useState(0);
  const progressAnimation = useSharedValue(0);

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

  useEffect(() => {
    if (trackWidth === 0) return;

    progressAnimation.value = withTiming((step / TOTAL_STEPS) * trackWidth, {
      duration: 350,
      easing: Easing.out(Easing.ease),
    });
  }, [step, trackWidth]);

  const animatedFillStyle = useAnimatedStyle(() => ({
    width: progressAnimation.value,
  }));

  const handleBack = () => {
    if (step > 1) return prevStep();

    return guardedGoBack();
  };

  return {
    step,
    isSubmitting,
    isPublishedSuccess,
    animatedFillStyle,
    trackWidth,
    setTrackWidth,
    handleBack,
  };
};
