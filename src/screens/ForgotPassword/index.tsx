import { useMemo } from "react";
import { View, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FormTemplate } from "@components/templates";
import { Button, SimpleButton, TextInput } from "@components/atoms";
import { useAppTheme } from "@theme/ThemeContext";
import { theme } from "@theme";

import { useForgotPassword } from "./hooks";
import { strings } from "./strings";
import { createStyles } from "./styles";

const { spacing } = theme;

export function ForgotPassword() {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const insets = useSafeAreaInsets();

  const { control, handleSubmit, onSubmit, handleGoBack, isLoading } =
    useForgotPassword();

  return (
    <FormTemplate showBackButton onBack={handleGoBack}>
      <ScrollView
        style={styles.flexContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{strings.forgotPassword.title}</Text>
            <Text style={styles.subtitle}>
              {strings.forgotPassword.subtitle}
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              fieldName={strings.forgotPassword.emailLabel}
              control={control}
              name="email"
              placeholder={strings.forgotPassword.emailPlaceholder}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          styles.footer,
          { paddingBottom: Math.max(insets.bottom, spacing.l) },
        ]}
      >
        <Button
          label={strings.forgotPassword.buttonSubmit}
          onPress={handleSubmit(onSubmit)}
          loading={isLoading}
        />

        <View style={styles.footerLink}>
          <Text style={styles.text}>
            {strings.forgotPassword.rememberedPassword}
          </Text>
          <SimpleButton
            label={strings.forgotPassword.buttonBack}
            onPress={handleGoBack}
          />
        </View>
      </View>
    </FormTemplate>
  );
}
