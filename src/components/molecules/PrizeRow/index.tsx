import { useMemo } from "react";
import { Text, TextInput, View } from "react-native";

import { Switch } from "@components/atoms";
import { useAppTheme } from "@theme/ThemeContext";
import { maskCurrency } from "@utils";

import { createStyles } from "./styles";

interface PrizeRowProps {
  label: string;
  cashValue: string;
  trophyValue: boolean;
  onCashChange: (raw: number) => void;
  onTrophyChange: (value: boolean) => void;
  cashPlaceholder?: string;
  trophyLabel?: string;
}

interface FourthPlaceRowProps {
  label: string;
  textValue: string;
  trophyValue: boolean;
  onTextChange: (value: string) => void;
  onTrophyChange: (value: boolean) => void;
  placeholder?: string;
  trophyLabel?: string;
}

export function PrizeRow({
  label,
  cashValue,
  trophyValue,
  onCashChange,
  onTrophyChange,
  cashPlaceholder = "R$ 0,00",
  trophyLabel = "Troféu",
}: PrizeRowProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const handleChangeText = (text: string) => {
    const prev = maskCurrency(cashValue);

    if (text.length < prev.length) {
      const prevDigits = cashValue.replace(/\D/g, "").slice(0, -1);
      return onCashChange(prevDigits ? parseInt(prevDigits, 10) : 0);
    }

    const newDigits = text.replace(/\D/g, "");
    return onCashChange(newDigits ? parseInt(newDigits, 10) : 0);
  };

  return (
    <View style={styles.placeBlock}>
      <Text style={styles.placeLabel}>{label}</Text>
      <View style={styles.placeRow}>
        <TextInput
          style={styles.cashInput}
          value={cashValue}
          onChangeText={(text) => handleChangeText(text)}
          placeholder={cashPlaceholder}
          placeholderTextColor={colors.placeholder}
          keyboardType="numeric"
        />

        <View style={styles.toggleItem}>
          <Text style={styles.toggleLabel}>{trophyLabel}</Text>
          <Switch value={trophyValue} onValueChange={onTrophyChange} />
        </View>
      </View>
    </View>
  );
}

export function FourthPlacePrizeRow({
  label,
  textValue,
  trophyValue,
  onTextChange,
  onTrophyChange,
  placeholder,
  trophyLabel = "Troféu",
}: FourthPlaceRowProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.placeBlock}>
      <Text style={styles.placeLabel}>{label}</Text>
      <View style={styles.placeRow}>
        <TextInput
          style={styles.cashInput}
          value={textValue}
          onChangeText={onTextChange}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          autoCapitalize="sentences"
        />

        <View style={styles.toggleItem}>
          <Text style={styles.toggleLabel}>{trophyLabel}</Text>
          <Switch value={trophyValue} onValueChange={onTrophyChange} />
        </View>
      </View>
    </View>
  );
}
