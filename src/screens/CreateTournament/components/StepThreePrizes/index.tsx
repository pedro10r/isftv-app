import { forwardRef, useImperativeHandle, useMemo } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";

import { Switch } from "@components/atoms";
import { useAppTheme } from "@theme/ThemeContext";
import { Prizes } from "@models/tournament";

import { StepRef } from "../../types";
import { createStyles } from "./styles";
import { useStepThreePrizes } from "./hooks";
import { strings } from "./strings";

type PlaceConfig = {
  key: keyof Prizes;
  label: string;
  hasTrophy: boolean;
};

const PLACES: PlaceConfig[] = [
  { key: "first_place", label: strings.places.first, hasTrophy: true },
  { key: "second_place", label: strings.places.second, hasTrophy: false },
  { key: "third_place", label: strings.places.third, hasTrophy: false },
];

export const StepThreePrizes = forwardRef<StepRef, {}>((_, ref) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const {
    categories,
    expandedCategory,
    toggleExpand,
    handlePrizeChange,
    onSubmit,
  } = useStepThreePrizes();

  useImperativeHandle(ref, () => ({ submit: onSubmit }));

  if (categories.length === 0) {
    return (
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.emptyState}>{strings.emptyState}</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.description}>{strings.description}</Text>

      {categories.map((category) => {
        const isExpanded = expandedCategory === category.id;

        return (
          <View key={category.id} style={styles.card}>
            <Pressable
              style={[styles.cardHeader, isExpanded && styles.cardHeaderActive]}
              onPress={() => toggleExpand(category.id)}
            >
              <Text style={styles.cardHeaderName}>{category.name}</Text>
              <Feather
                name={isExpanded ? "chevron-up" : "chevron-down"}
                size={18}
                color={colors.textSecondary}
              />
            </Pressable>

            {isExpanded && (
              <View style={styles.cardBody}>
                {PLACES.map((place, index) => {
                  const tier = category.prizes[place.key];
                  const cashValue = tier?.cash ? String(tier.cash) : "";
                  const trophyValue = tier?.trophy ?? false;
                  const medalValue = tier?.medal ?? false;

                  return (
                    <View key={place.key}>
                      {index > 0 && <View style={styles.divider} />}

                      <View style={styles.placeBlock}>
                        <Text style={styles.placeLabel}>{place.label}</Text>

                        <View style={styles.placeRow}>
                          <TextInput
                            style={styles.cashInput}
                            value={cashValue}
                            onChangeText={(text) =>
                              handlePrizeChange(
                                category.id,
                                place.key,
                                "cash",
                                Number(text.replace(/\D/g, "")),
                              )
                            }
                            placeholder={strings.fields.cashPlaceholder}
                            placeholderTextColor={colors.placeholder}
                            keyboardType="numeric"
                          />

                          <View style={styles.toggleGroup}>
                            {place.hasTrophy ? (
                              <View style={styles.toggleItem}>
                                <Text style={styles.toggleLabel}>
                                  {strings.fields.trophy}
                                </Text>
                                <Switch
                                  value={trophyValue}
                                  onValueChange={(val) =>
                                    handlePrizeChange(
                                      category.id,
                                      place.key,
                                      "trophy",
                                      val,
                                    )
                                  }
                                />
                              </View>
                            ) : (
                              <View style={styles.toggleItem}>
                                <Text style={styles.toggleLabel}>
                                  {strings.fields.medal}
                                </Text>
                                <Switch
                                  value={medalValue}
                                  onValueChange={(val) =>
                                    handlePrizeChange(
                                      category.id,
                                      place.key,
                                      "medal",
                                      val,
                                    )
                                  }
                                />
                              </View>
                            )}
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
});
