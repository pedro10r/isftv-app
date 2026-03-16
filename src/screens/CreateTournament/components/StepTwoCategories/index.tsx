import { forwardRef, useImperativeHandle, useMemo } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";

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
    setBaseFee,
    customCategoryName,
    setCustomCategoryName,
    categories,
    isSelected,
    handleToggleCategory,
    handleAddCustomCategory,
    removeCategory,
    onSubmit,
  } = useStepTwoCategories();

  useImperativeHandle(ref, () => ({ submit: onSubmit }));

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* Sessão 1: Valor base */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{strings.sections.baseFee}</Text>
        <TextInput
          style={styles.feeInput}
          value={baseFee}
          onChangeText={setBaseFee}
          placeholder={strings.fields.baseFee.placeholder}
          placeholderTextColor={colors.placeholder}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{strings.sections.quickPick}</Text>
        <View style={styles.chipsContainer}>
          {DEFAULT_CATEGORIES.map((name) => {
            const active = isSelected(name);
            return (
              <Pressable
                key={name}
                onPress={() => handleToggleCategory(name)}
                style={[styles.chip, active && styles.chipActive]}
              >
                <Text
                  style={[styles.chipLabel, active && styles.chipLabelActive]}
                >
                  {name}
                </Text>
              </Pressable>
            );
          })}
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
            <View key={category.id} style={styles.categoryCard}>
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryFee}>R$ {category.fee}</Text>
              </View>

              <TouchableOpacity
                style={styles.trashButton}
                onPress={() => removeCategory(category.id)}
                activeOpacity={0.7}
              >
                <Feather name="trash" size={18} color={colors.error} />
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
});
