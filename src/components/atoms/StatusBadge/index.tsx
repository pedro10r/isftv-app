import { useMemo } from "react";
import { View, Text } from "react-native";

import { TournamentStatus } from "@features/tournaments/types";
import { useAppTheme } from "@theme/ThemeContext";
import { createStyles } from "./styles";

type StatusConfig = Record<TournamentStatus, { label: string; color: string }>;

interface StatusBadgeProps {
  status: TournamentStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const STATUS_CONFIG: StatusConfig = {
    OPEN: { label: "Inscrições Abertas", color: colors.success },
    IN_PROGRESS: { label: "Em Andamento", color: colors.warning },
    FINISHED: { label: "Finalizado", color: colors.textSecondary },
  };

  const { label, color } = STATUS_CONFIG[status];

  return (
    <View style={[styles.badge, { backgroundColor: color + "33" }]}>
      <Text style={[styles.label, { color }]}>{label}</Text>
    </View>
  );
}
