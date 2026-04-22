import { forwardRef, useImperativeHandle, useMemo } from "react";
import { ScrollView, Text } from "react-native";

import { EmptyListState } from "@components/molecules";
import { CategoryAccordion } from "@components/organisms";
import { useAppTheme } from "@theme/ThemeContext";

import { StepRef } from "../../types";
import { createStyles } from "./styles";
import { useStepThreePrizes } from "./hooks";
import { strings } from "./strings";

export const StepThreePrizes = forwardRef<StepRef, {}>((_, ref) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const {
    categories,
    expandedCategory,
    toggleExpand,
    handlePrizeChange,
    handleFourthPlaceChange,
    onSubmit,
  } = useStepThreePrizes();

  useImperativeHandle(ref, () => ({ submit: onSubmit }));

  if (categories.length === 0) {
    return <EmptyListState icon="inbox" message={strings.emptyState} />;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.description}>{strings.description}</Text>

      {categories.map((category) => (
        <CategoryAccordion
          key={category.id}
          category={category}
          isExpanded={expandedCategory === category.id}
          onToggle={() => toggleExpand(category.id)}
          onPrizeChange={(place, field, value) =>
            handlePrizeChange(category.id, place, field, value)
          }
          onFourthPlaceChange={(field, value) =>
            handleFourthPlaceChange(category.id, field, value)
          }
        />
      ))}
    </ScrollView>
  );
});
