import { useMemo } from "react";
import { View, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "@theme";

import { FormTemplate } from "@components/templates";
import { Button, TextInput, Select } from "@components/atoms";
import { useAppTheme } from "@theme/ThemeContext";
import { maskHeight, maskPhone } from "@utils";

import { useEditProfile } from "./hooks";
import { strings } from "./strings";
import { createStyles } from "./styles";

const { spacing } = theme;

export function EditProfile() {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const insets = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    onSubmit,
    goBack,
    playingPosition,
    setPlayingPosition,
    isUpdatingProfile,
  } = useEditProfile();

  return (
    <FormTemplate showBackButton onBack={goBack}>
      <ScrollView
        style={styles.flexContainer}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>{strings.form.title}</Text>
          <Text style={styles.subtitle}>{strings.form.subtitle}</Text>
        </View>

        <TextInput
          fieldName={strings.form.labels.name}
          control={control}
          name="full_name"
          placeholder={strings.form.placeholders.name}
          autoCapitalize="words"
        />

        <TextInput
          fieldName={strings.form.labels.bio}
          control={control}
          name="bio"
          placeholder={strings.form.placeholders.bio}
          multiline
          numberOfLines={3}
        />

        <TextInput
          fieldName={strings.form.labels.height}
          control={control}
          name="height"
          placeholder={strings.form.placeholders.height}
          keyboardType="numeric"
          maxLength={6}
          transform={maskHeight}
        />

        <TextInput
          fieldName={strings.form.labels.whatsapp}
          control={control}
          name="whatsapp"
          placeholder={strings.form.placeholders.whatsapp}
          keyboardType="phone-pad"
          transform={maskPhone}
        />

        <View style={styles.row}>
          <View style={styles.flexContainer}>
            <TextInput
              fieldName={strings.form.labels.city}
              control={control}
              name="city"
              placeholder={strings.form.placeholders.city}
            />
          </View>

          <View style={styles.ufContainer}>
            <TextInput
              fieldName={strings.form.labels.uf}
              control={control}
              name="uf"
              placeholder={strings.form.placeholders.uf}
              autoCapitalize="characters"
              maxLength={2}
            />
          </View>
        </View>

        <Select value={playingPosition} onValueChange={setPlayingPosition} />
      </ScrollView>

      <View
        style={[
          styles.footer,
          { paddingBottom: Math.max(insets.bottom, spacing.m) },
        ]}
      >
        <Button
          label={strings.form.button}
          onPress={handleSubmit(onSubmit)}
          loading={isUpdatingProfile}
        />
      </View>
    </FormTemplate>
  );
}
