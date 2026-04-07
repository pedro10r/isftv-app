import { useMemo, useState } from "react";
import { View, Text, Pressable, Platform, Modal } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Feather from "@expo/vector-icons/Feather";

import { useAppTheme } from "@theme/ThemeContext";
import { formatBrDate, parseBrDate } from "@utils";
import { createStyles } from "./styles";

interface DatePickerInputProps {
  value: string;
  onChange: (date: string) => void;
  fieldName?: string;
  placeholder?: string;
  minimumDate?: Date;
  maximumDate?: Date;
  error?: string;
  size?: "default" | "compact";
}

export function DatePickerInput({
  value,
  onChange,
  fieldName,
  placeholder = "DD/MM/AAAA",
  minimumDate,
  maximumDate,
  error,
  size = "default",
}: DatePickerInputProps) {
  const { colors, isDarkMode } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [show, setShow] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(new Date());

  return (
    <View>
      {fieldName && <Text style={styles.fieldName}>{fieldName}</Text>}

      <View style={styles.inputWrapper}>
        <Pressable
          onPress={() => {
            setTempDate(parseBrDate(value ?? "") ?? minimumDate ?? new Date());
            setShow(true);
          }}
          style={({ pressed }) => [
            styles.input,
            size === "compact" && styles.inputCompact,
            error && styles.inputError,
            pressed && { opacity: 0.7 },
          ]}
        >
          <Text style={value ? styles.valueText : styles.placeholderText}>
            {value || placeholder}
          </Text>

          <Feather name="calendar" size={16} color={colors.textSecondary} />
        </Pressable>

        {error && <Text style={styles.errorText}>{error}</Text>}

        {show && Platform.OS === "android" && (
          <DateTimePicker
            value={tempDate}
            mode="date"
            display="calendar"
            onChange={(_, selected) => {
              setShow(false);
              if (selected) onChange(formatBrDate(selected));
            }}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
          />
        )}

        {Platform.OS === "ios" && (
          <Modal
            transparent
            animationType="slide"
            visible={show}
            onRequestClose={() => setShow(false)}
          >
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setShow(false)}
            >
              <Pressable style={styles.modalContent} onPress={() => {}}>
                <View style={styles.modalHeader}>
                  <Pressable onPress={() => setShow(false)}>
                    <Text style={styles.modalCancel}>Cancelar</Text>
                  </Pressable>

                  <Pressable
                    onPress={() => {
                      onChange(formatBrDate(tempDate));
                      setShow(false);
                    }}
                  >
                    <Text style={styles.modalConfirm}>Confirmar</Text>
                  </Pressable>
                </View>

                <DateTimePicker
                  value={tempDate}
                  mode="date"
                  display="spinner"
                  onChange={(_, selected) => {
                    if (selected) setTempDate(selected);
                  }}
                  minimumDate={minimumDate}
                  maximumDate={maximumDate}
                  locale="pt-BR"
                  themeVariant={isDarkMode ? "dark" : "light"}
                  style={styles.picker}
                />
              </Pressable>
            </Pressable>
          </Modal>
        )}
      </View>
    </View>
  );
}
