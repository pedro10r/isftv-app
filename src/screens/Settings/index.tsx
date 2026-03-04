import { useMemo } from "react";
import { ScrollView, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

import { ScreenTemplate } from "@components/templates";
import { Switch } from "@components/atoms";
import { useAppTheme } from "@theme/ThemeContext";

import { useSettings } from "./hooks";
import { createStyles } from "./styles";
import { strings } from "./strings";

export function Settings() {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const { isDarkMode, handleToggleDarkMode, goBack } = useSettings();

  return (
    <ScreenTemplate showBackButton onBack={goBack}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {strings.screen.appearanceSection}
          </Text>

          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <View style={styles.iconContainer}>
                  <Feather name="moon" size={16} color={colors.white} />
                </View>
                <Text style={styles.rowLabel}>
                  {strings.screen.darkModeLabel}
                </Text>
              </View>

              <Switch
                value={isDarkMode}
                onValueChange={handleToggleDarkMode}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenTemplate>
  );
}
