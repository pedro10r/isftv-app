import { useMemo, useState } from "react";
import {
  View,
  TextInput as RNTextInput,
  Text,
  Pressable,
  TextInputProps as RNTextInputProps,
} from "react-native";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";

import { useAppTheme } from "@theme/ThemeContext";
import { createStyles } from "./styles";

interface TextInputProps<
  TFieldValues extends FieldValues,
> extends RNTextInputProps {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  fieldName?: string;
  showPasswordToggle?: boolean;
}

export function TextInput<TFieldValues extends FieldValues>({
  control,
  name,
  fieldName,
  showPasswordToggle,
  secureTextEntry,
  ...textInputProps
}: TextInputProps<TFieldValues>) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isSecure = secureTextEntry && !isPasswordVisible;

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
          <View style={styles.inputWrapper}>
            <RNTextInput
              style={[
                styles.input,
                showPasswordToggle && styles.inputWithToggle,
                error && styles.inputError,
              ]}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholderTextColor={colors.placeholder}
              secureTextEntry={isSecure}
              {...textInputProps}
            />

            {showPasswordToggle && secureTextEntry && (
              <Pressable
                style={styles.toggleButton}
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <Ionicons
                  name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={colors.textSecondary}
                />
              </Pressable>
            )}

            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </View>
        )}
      />
    </View>
  );
}
