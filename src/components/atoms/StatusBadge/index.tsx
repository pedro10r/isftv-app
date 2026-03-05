import { useMemo } from "react";
import { View, Text } from "react-native";

import { TournamentStatus } from "@models/tournament";
import { useAppTheme } from "@theme/ThemeContext";
import { createStyles } from "./styles";

interface StatusBadgeProps {
  status: TournamentStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const STATUS_COLORS: Record<TournamentStatus, string> = {
    "Inscrições Abertas": colors.success,
    "Em Andamento": colors.warning,
    Finalizado: colors.textSecondary,
  };

  const color = STATUS_COLORS[status];

  return (
    <View style={[styles.badge, { backgroundColor: color + "33" }]}>
      <Text style={[styles.label, { color }]}>{status}</Text>
    </View>
  );
}
