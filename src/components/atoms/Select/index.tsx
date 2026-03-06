import { useCallback, useMemo, useState } from "react";
import { View, Text, Pressable, Modal } from "react-native";
import { Feather } from "@expo/vector-icons";

import { useAppTheme } from "@theme/ThemeContext";
import { createStyles } from "./styles";
import { strings } from "./strings";
import { PlayingPosition } from "@store/profileStore";

interface SelectProps {
  value: PlayingPosition | null;
  onValueChange: (value: PlayingPosition) => void;
}

const OPTIONS: PlayingPosition[] = ["Direita", "Esquerda", "Ambos"];

export function Select({ value, onValueChange }: SelectProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = useCallback(
    (option: PlayingPosition) => {
      onValueChange(option);
      setIsOpen(false);
    },
    [onValueChange],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{strings.labels.playingPosition}</Text>

      <Pressable style={styles.selectButton} onPress={() => setIsOpen(true)}>
        <Text style={[styles.selectText, !value && styles.placeholder]}>
          {value || strings.labels.select}
        </Text>
        <Feather
          name="chevron-down"
          size={20}
          color={styles.selectText.color}
        />
      </Pressable>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable style={styles.modal} onPress={() => setIsOpen(false)}>
          <View style={styles.modalContent}>
            {OPTIONS.map((option, index) => (
              <Pressable
                key={option}
                style={({ pressed }) => [
                  styles.option,
                  index === OPTIONS.length - 1 && { borderBottomWidth: 0 },
                  pressed && { opacity: 0.7 },
                ]}
                onPress={() => handleSelect(option)}
              >
                <Text
                  style={[
                    styles.optionText,
                    value === option && styles.optionSelected,
                  ]}
                >
                  {option}
                </Text>

                {value === option && (
                  <Feather
                    name="check"
                    size={20}
                    color={styles.optionSelected.color}
                  />
                )}
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
