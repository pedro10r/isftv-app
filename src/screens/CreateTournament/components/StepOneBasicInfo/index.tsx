import { forwardRef, useImperativeHandle, useMemo } from "react";
import { Controller } from "react-hook-form";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";

import { TextInput, UFSelect, DatePickerInput } from "@components/atoms";
import { useAppTheme } from "@theme/ThemeContext";
import { maskPhone } from "@utils";

import { StepRef } from "../../types";
import { createStyles } from "./styles";
import { useStepOneBasicInfo } from "./hooks";
import { strings } from "./strings";

export const StepOneBasicInfo = forwardRef<StepRef, {}>((_, ref) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const { control, handleSubmit, onSubmit, posterUri, handlePickImage } =
    useStepOneBasicInfo();

  useImperativeHandle(ref, () => ({
    submit: handleSubmit(onSubmit),
  }));

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Pressable
        onPress={handlePickImage}
        style={({ pressed }) => [
          styles.posterContainer,
          pressed && { opacity: 0.7 },
        ]}
      >
        {posterUri ? (
          <Image
            source={{ uri: posterUri }}
            style={styles.posterImage}
            resizeMode="cover"
          />
        ) : (
          <>
            <Feather name="image" size={32} color={colors.textSecondary} />
            <Text style={styles.posterText}>{strings.poster.uploadLabel}</Text>
          </>
        )}
      </Pressable>

      <TextInput
        control={control}
        name="name"
        fieldName={strings.fields.name.label}
        placeholder={strings.fields.name.placeholder}
        autoCapitalize="words"
      />

      <TextInput
        control={control}
        name="venue_name"
        fieldName={strings.fields.venueName.label}
        placeholder={strings.fields.venueName.placeholder}
        autoCapitalize="words"
      />

      <View style={styles.cityRow}>
        <View style={styles.cityField}>
          <TextInput
            control={control}
            name="city"
            fieldName={strings.fields.city.label}
            placeholder={strings.fields.city.placeholder}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.stateField}>
          <Controller
            control={control}
            name="state"
            render={({ field, fieldState }) => (
              <UFSelect
                value={field.value || null}
                onValueChange={field.onChange}
                fieldName={strings.fields.state.label}
                error={fieldState.error?.message}
              />
            )}
          />
        </View>
      </View>

      <View style={styles.dateRow}>
        <View style={styles.dateField}>
          <Controller
            control={control}
            name="start_date"
            render={({ field, fieldState }) => (
              <DatePickerInput
                value={field.value}
                onChange={field.onChange}
                fieldName={strings.fields.startDate.label}
                placeholder={strings.fields.startDate.placeholder}
                minimumDate={new Date()}
                error={fieldState.error?.message}
              />
            )}
          />
        </View>

        <View style={styles.dateField}>
          <Controller
            control={control}
            name="end_date"
            render={({ field, fieldState }) => (
              <DatePickerInput
                value={field.value}
                onChange={field.onChange}
                fieldName={strings.fields.endDate.label}
                placeholder={strings.fields.endDate.placeholder}
                error={fieldState.error?.message}
              />
            )}
          />
        </View>
      </View>

      <TextInput
        control={control}
        name="contact_whatsapp"
        fieldName={strings.fields.whatsapp.label}
        placeholder={strings.fields.whatsapp.placeholder}
        keyboardType="phone-pad"
        maxLength={15}
        transform={maskPhone}
      />

      <TextInput
        control={control}
        name="description"
        fieldName={strings.fields.description.label}
        placeholder={strings.fields.description.placeholder}
        multiline
      />
    </ScrollView>
  );
});
