import { useMemo } from "react";
import { Text } from "react-native";

import { ScreenTemplate } from "@components/templates";
import { useAppTheme } from "@theme/ThemeContext";
import { createStyles } from "./styles";

export function Championships() {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <ScreenTemplate>
      <Text style={styles.text}>Championships</Text>
    </ScreenTemplate>
  );
}
