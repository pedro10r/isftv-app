import { useMemo, useState } from "react";
import { View, Text, Pressable, Platform, Modal } from "react-native";
import Animated from "react-native-reanimated";
import DateTimePicker from "@react-native-community/datetimepicker";
import Feather from "@expo/vector-icons/Feather";

import { useAppTheme } from "@theme/ThemeContext";
import { usePickerAnimation } from "@hooks/usePickerAnimation";
import { createStyles } from "./styles";

function formatTime(date: Date): string {
  const h = String(date.getHours()).padStart(2, "0");
  const m = String(date.getMinutes()).padStart(2, "0");
  return `${h}:${m}`;
}

function parseTime(value: string): Date {
  const [h, m] = value.split(":").map(Number);
  const d = new Date();
  d.setHours(isNaN(h) ? 0 : h, isNaN(m) ? 0 : m, 0, 0);
  return d;
}

interface TimePickerInputProps {
  value: string;
  onChange: (time: string) => void;
  fieldName?: string;
  placeholder?: string;
  error?: string;
  size?: "default" | "compact";
}

export function TimePickerInput({
  value,
  onChange,
  fieldName,
  placeholder = "00:00",
  error,
  size = "default",
}: TimePickerInputProps) {
  const { colors, isDarkMode } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [show, setShow] = useState(false);
  const [tempTime, setTempTime] = useState<Date>(new Date());

  const { overlayStyle, contentStyle, mounted } = usePickerAnimation(show);

  return (
    <View>
      {fieldName && <Text style={styles.fieldName}>{fieldName}</Text>}

      <View style={styles.inputWrapper}>
        <Pressable
          onPress={() => {
            setTempTime(parseTime(value));
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

          <Feather name="clock" size={16} color={colors.textSecondary} />
        </Pressable>

        {error && <Text style={styles.errorText}>{error}</Text>}

        {show && Platform.OS === "android" && (
          <DateTimePicker
            value={tempTime}
            mode="time"
            is24Hour
            display="spinner"
            onChange={(_, selected) => {
              setShow(false);
              if (selected) onChange(formatTime(selected));
            }}
          />
        )}

        {Platform.OS === "ios" && (
          <Modal
            transparent
            animationType="none"
            visible={mounted}
            onRequestClose={() => setShow(false)}
          >
            <Animated.View style={[styles.modalOverlay, overlayStyle]}>
              <Pressable
                style={styles.modalOverlay}
                onPress={() => setShow(false)}
              >
                <Animated.View
                  style={[styles.modalContent, contentStyle]}
                  onStartShouldSetResponder={() => true}
                >
                  <View style={styles.modalHeader}>
                    <Pressable onPress={() => setShow(false)}>
                      <Text style={styles.modalCancel}>Cancelar</Text>
                    </Pressable>

                    <Pressable
                      onPress={() => {
                        onChange(formatTime(tempTime));
                        setShow(false);
                      }}
                    >
                      <Text style={styles.modalConfirm}>Confirmar</Text>
                    </Pressable>
                  </View>

                  <DateTimePicker
                    value={tempTime}
                    mode="time"
                    display="spinner"
                    is24Hour
                    onChange={(_, selected) => {
                      if (selected) setTempTime(selected);
                    }}
                    themeVariant={isDarkMode ? "dark" : "light"}
                    locale="pt-BR"
                    style={styles.picker}
                  />
                </Animated.View>
              </Pressable>
            </Animated.View>
          </Modal>
        )}
      </View>
    </View>
  );
}
