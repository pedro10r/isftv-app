import { useMemo } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";

import { Button, TextInput } from "@components/atoms";
import { FormTemplate } from "@components/templates";
import { Category } from "@models/tournament";
import { useAppTheme } from "@theme/ThemeContext";
import { theme } from "@theme";

import { createStyles } from "./styles";
import { useCreateTournament } from "./hooks";
import { strings } from "./strings";

const { spacing } = theme;

const CATEGORIES: Category[] = [
  "Iniciante",
  "Amador C",
  "Amador B",
  "Amador A",
  "Open",
  "Misto",
];

export function CreateTournament() {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const insets = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    errors,
    imageUri,
    categories,
    handleGoBack,
    handlePickImage,
    toggleCategory,
    onSubmit,
  } = useCreateTournament();

  return (
    <FormTemplate>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <Pressable
            onPress={handleGoBack}
            style={styles.closeButton}
            hitSlop={8}
          >
            <Feather name="x" size={24} color={colors.textPrimary} />
          </Pressable>

          <Text style={styles.title}>{strings.header.title}</Text>

          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Pressable
            onPress={handlePickImage}
            style={({ pressed }) => [
              styles.posterContainer,
              pressed && { opacity: 0.7 },
            ]}
          >
            {imageUri ? (
              <Image
                source={{ uri: imageUri }}
                style={styles.posterImage}
                resizeMode="cover"
              />
            ) : (
              <>
                <Feather name="image" size={32} color={colors.textSecondary} />
                <Text style={styles.posterText}>
                  {strings.poster.uploadLabel}
                </Text>
              </>
            )}
          </Pressable>

          <View style={styles.section}>
            <TextInput
              control={control}
              name="name"
              fieldName={strings.fields.name.label}
              placeholder={strings.fields.name.placeholder}
              autoCapitalize="words"
            />

            <TextInput
              control={control}
              name="arena"
              fieldName={strings.fields.arena.label}
              placeholder={strings.fields.arena.placeholder}
              autoCapitalize="words"
            />

            <TextInput
              control={control}
              name="price"
              fieldName={strings.fields.price.label}
              placeholder={strings.fields.price.placeholder}
              keyboardType="numeric"
            />

            <View style={styles.row}>
              <View style={styles.rowItem}>
                <TextInput
                  control={control}
                  name="startDate"
                  fieldName={strings.fields.startDate.label}
                  placeholder={strings.fields.startDate.placeholder}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.rowItem}>
                <TextInput
                  control={control}
                  name="endDate"
                  fieldName={strings.fields.endDate.label}
                  placeholder={strings.fields.endDate.placeholder}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {strings.categories.sectionTitle}
            </Text>

            <View style={styles.chipsRow}>
              {CATEGORIES.map((category) => {
                const isActive = categories.includes(category);
                return (
                  <Pressable
                    key={category}
                    onPress={() => toggleCategory(category)}
                    style={[styles.chip, isActive && styles.chipActive]}
                  >
                    <Text
                      style={[
                        styles.chipLabel,
                        isActive && styles.chipLabelActive,
                      ]}
                    >
                      {category}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {errors.categories && (
              <Text style={styles.categoriesError}>
                {errors.categories.message}
              </Text>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {strings.prizes.sectionTitle}
            </Text>

            <View style={styles.prizeGrid}>
              <View style={styles.prizeItem}>
                <TextInput
                  control={control}
                  name="prizeFirst"
                  fieldName={strings.prizes.first.label}
                  placeholder={strings.prizes.first.placeholder}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.prizeItem}>
                <TextInput
                  control={control}
                  name="prizeSecond"
                  fieldName={strings.prizes.second.label}
                  placeholder={strings.prizes.second.placeholder}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.prizeItem}>
                <TextInput
                  control={control}
                  name="prizeThird"
                  fieldName={strings.prizes.third.label}
                  placeholder={strings.prizes.third.placeholder}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.prizeItem}>
                <TextInput
                  control={control}
                  name="prizeFourth"
                  fieldName={strings.prizes.fourth.label}
                  placeholder={strings.prizes.fourth.placeholder}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>
        </ScrollView>

        <View
          style={[
            styles.footer,
            { paddingBottom: Math.max(insets.bottom, spacing.m) },
          ]}
        >
          <Button label={strings.submit} onPress={handleSubmit(onSubmit)} />
        </View>
      </KeyboardAvoidingView>
    </FormTemplate>
  );
}
