import React, { useMemo, useRef } from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated from "react-native-reanimated";
import Feather from "@expo/vector-icons/Feather";

import { Button } from "@components/atoms";
import { FormTemplate } from "@components/templates";
import { useAppTheme } from "@theme/ThemeContext";
import { theme } from "@theme";

import { StepOneBasicInfo } from "./components/StepOneBasicInfo";
import { StepTwoCategories } from "./components/StepTwoCategories";
import { StepThreePrizes } from "./components/StepThreePrizes";

import { StepRef } from "./types";
import { strings } from "./strings";
import { createStyles } from "./styles";
import { useCreateTournament, TOTAL_STEPS } from "./hooks";

type StepComponent = React.ForwardRefExoticComponent<
  React.RefAttributes<StepRef>
>;

const STEPS: Record<number, StepComponent> = {
  1: StepOneBasicInfo,
  2: StepTwoCategories,
  3: StepThreePrizes,
};

export function CreateTournament() {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const stepRef = useRef<StepRef>(null);
  const insets = useSafeAreaInsets();

  const { step, isSubmitting, handleBack, animatedFillStyle, setTrackWidth } =
    useCreateTournament();

  const { spacing } = theme;

  const StepComponent = STEPS[step];

  const buttonLabel =
    step < TOTAL_STEPS ? strings.nextButton : strings.submitButton;

  return (
    <FormTemplate>
      <View
        style={[
          styles.container,
          { paddingBottom: Math.max(insets.bottom, spacing.m) },
        ]}
      >
        <View style={styles.header}>
          <Pressable onPress={handleBack} hitSlop={8} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color={colors.textPrimary} />
          </Pressable>

          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>{strings.stepTitles[step]}</Text>
            <Text style={styles.stepIndicator}>
              {strings.stepIndicator(step, TOTAL_STEPS)}
            </Text>
          </View>

          <View style={styles.backButton} />
        </View>

        <View
          style={styles.progressTrack}
          onLayout={(e) => setTrackWidth(e.nativeEvent.layout.width)}
        >
          <Animated.View style={[styles.progressFill, animatedFillStyle]} />
        </View>

        <View style={styles.content}>
          <StepComponent ref={stepRef} />
        </View>

        <View style={styles.footer}>
          <Button
            label={buttonLabel}
            onPress={() => stepRef.current?.submit()}
            loading={isSubmitting}
          />
        </View>
      </View>
    </FormTemplate>
  );
}
