import React from "react";
import {
  View,
  TextInput as RNTextInput,
  Text,
  TextInputProps as RNTextInputProps,
} from "react-native";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

import { styles } from "./styles";

interface TextInputProps<
  TFieldValues extends FieldValues,
> extends RNTextInputProps {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  fieldName?: string;
}

export function TextInput<TFieldValues extends FieldValues>({
  control,
  name,
  fieldName,
  ...textInputProps
}: TextInputProps<TFieldValues>) {
  return (
    <View>
      {fieldName && <Text style={styles.fieldName}>{fieldName}</Text>}
      <Controller
        control={control}
        name={name}
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <View style={styles.container}>
            <RNTextInput
              style={[styles.input, error && styles.inputError]}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              {...textInputProps}
            />

            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </View>
        )}
      />
    </View>
  );
}
