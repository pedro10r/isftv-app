import { useMemo } from "react";
import { View, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "@theme";

import { FormTemplate } from "@components/templates";
import { Button, TextInput, Select } from "@components/atoms";
import { useAppTheme } from "@theme/ThemeContext";
import { maskHeight, maskWeight } from "@utils";

import { useProfile } from "./hooks";
import { strings } from "./strings";
import { createStyles } from "./styles";

const { spacing } = theme;

export function EditProfile() {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const insets = useSafeAreaInsets();

  const {
    user,
    control,
    playingPosition,
    setPlayingPosition,
    handleSubmit,
    onSubmit,
    goBack,
    isSubmitting,
  } = useProfile();

  return (
    <FormTemplate showBackButton onBack={goBack}>
      <ScrollView
        style={styles.flexContainer}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>{strings.form.title}</Text>
          <Text style={styles.subtitle}>{strings.form.subtitle}</Text>
        </View>

        <View>
          <Text style={styles.label}>{strings.form.labels.name}</Text>
          <View style={styles.readOnlyInput}>
            <Text style={styles.readOnlyText}>{user?.name || ""}</Text>
          </View>
        </View>

        <TextInput
          fieldName={strings.form.labels.username}
          control={control}
          name="username"
          placeholder={strings.form.placeholders.username}
          keyboardType="email-address"
        />

        <TextInput
          fieldName={strings.form.labels.city}
          control={control}
          name="city"
          placeholder={strings.form.placeholders.city}
        />

        <View style={styles.row}>
          <View style={styles.flexContainer}>
            <TextInput
              fieldName={strings.form.labels.height}
              control={control}
              name="height"
              placeholder={strings.form.placeholders.height}
              keyboardType="numeric"
              maxLength={6}
              transform={maskHeight}
            />
          </View>

          <View style={styles.flexContainer}>
            <TextInput
              fieldName={strings.form.labels.weight}
              control={control}
              name="weight"
              placeholder={strings.form.placeholders.weight}
              keyboardType="numeric"
              maxLength={7}
              transform={maskWeight}
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
          loading={isSubmitting}
        />
      </View>
    </FormTemplate>
  );
}
