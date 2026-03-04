import { useMemo } from "react";
import { Text } from "react-native";

import { ScreenTemplate } from "@components/templates";
import { useAppTheme } from "@theme/ThemeContext";
import { createStyles } from "./styles";

export function Home() {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <ScreenTemplate>
      <Text style={styles.text}>Feed</Text>
    </ScreenTemplate>
  );
}
