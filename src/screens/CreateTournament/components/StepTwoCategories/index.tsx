import { forwardRef, useImperativeHandle, useMemo } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { FilterPill } from "@components/atoms";
import { DraftCategoryCard } from "@components/molecules";
import { useAppTheme } from "@theme/ThemeContext";

import { StepRef } from "../../types";
import { createStyles } from "./styles";
import { useStepTwoCategories, DEFAULT_CATEGORIES } from "./hooks";
import { strings } from "./strings";

export const StepTwoCategories = forwardRef<StepRef, {}>((_, ref) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const {
    baseFee,
    customCategoryName,
    setCustomCategoryName,
    categories,
    isSelected,
    handleToggleCategory,
    handleAddCustomCategory,
    handleUpdateCategoryTime,
    removeCategory,
    handleChangeFee,
    onSubmit,
  } = useStepTwoCategories();

  useImperativeHandle(ref, () => ({ submit: onSubmit }));

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{strings.sections.baseFee}</Text>
        <TextInput
          style={styles.feeInput}
          value={baseFee}
          onChangeText={handleChangeFee}
          placeholder={strings.fields.baseFee.placeholder}
          placeholderTextColor={colors.placeholder}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{strings.sections.quickPick}</Text>
        <View style={styles.chipsContainer}>
          {DEFAULT_CATEGORIES.map((name) => (
            <FilterPill
              key={name}
              label={name}
              isActive={isSelected(name)}
              onPress={() => handleToggleCategory(name)}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{strings.sections.custom}</Text>
        <View style={styles.customRow}>
          <TextInput
            style={styles.customInput}
            value={customCategoryName}
            onChangeText={setCustomCategoryName}
            placeholder={strings.fields.customCategory.placeholder}
            placeholderTextColor={colors.placeholder}
            autoCapitalize="words"
            returnKeyType="done"
            onSubmitEditing={handleAddCustomCategory}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddCustomCategory}
            activeOpacity={0.7}
          >
            <Text style={styles.addButtonLabel}>{strings.buttons.add}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{strings.sections.added}</Text>

        {categories.length === 0 ? (
          <Text style={styles.emptyState}>Nenhuma categoria selecionada.</Text>
        ) : (
          categories.map((category) => (
            <DraftCategoryCard
              key={category.id}
              name={category.name}
              startTime={category.startTime}
              onTimeChange={(time) =>
                handleUpdateCategoryTime(category.id, time)
              }
              onRemove={() => removeCategory(category.id)}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
});
