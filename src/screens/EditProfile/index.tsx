import { useMemo } from "react";
import { View, Text, ScrollView } from "react-native";

import { FormTemplate } from "@components/templates";
import { Button, TextInput, Select } from "@components/atoms";
import { useAppTheme } from "@theme/ThemeContext";
import { maskHeight, maskWeight } from "@utils";

import { useProfile } from "./hooks";
import { strings } from "./strings";
import { createStyles } from "./styles";

export function EditProfile() {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

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
      <ScrollView contentContainerStyle={styles.container}>
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
          <View style={styles.halfInput}>
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

          <View style={styles.halfInput}>
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

        <Button
          label={strings.form.button}
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
        />
      </ScrollView>
    </FormTemplate>
  );
}
