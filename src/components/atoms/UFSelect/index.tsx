import { useCallback, useMemo, useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { useAppTheme } from "@theme/ThemeContext";
import { BRAZILIAN_STATES } from "@constants/brazilianStates";

import { createStyles } from "./styles";
import { strings } from "./strings";

interface UFSelectProps {
  value: string | null;
  onValueChange: (value: string) => void;
  fieldName?: string;
  error?: string;
}

export function UFSelect({
  value,
  onValueChange,
  fieldName,
  error,
}: UFSelectProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = useCallback(
    (option: string) => {
      onValueChange(option);
      setIsOpen(false);
    },
    [onValueChange],
  );

  return (
    <View style={styles.container}>
      {fieldName && <Text style={styles.label}>{fieldName}</Text>}

      <Pressable style={styles.selectButton} onPress={() => setIsOpen(true)}>
        <Text style={[styles.selectText, !value && styles.placeholder]}>
          {value || strings.placeholder}
        </Text>
        <Feather
          name="chevron-down"
          size={16}
          color={styles.selectText.color}
        />
      </Pressable>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable style={styles.modal} onPress={() => setIsOpen(false)}>
          <View style={styles.modalContent}>
            <ScrollView>
              {BRAZILIAN_STATES.map((uf, index) => (
                <Pressable
                  key={uf}
                  style={({ pressed }) => [
                    styles.option,
                    index === BRAZILIAN_STATES.length - 1 && {
                      borderBottomWidth: 0,
                    },
                    pressed && { opacity: 0.7 },
                  ]}
                  onPress={() => handleSelect(uf)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      value === uf && styles.optionSelected,
                    ]}
                  >
                    {uf}
                  </Text>

                  {value === uf && (
                    <Feather
                      name="check"
                      size={20}
                      color={styles.optionSelected.color}
                    />
                  )}
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
