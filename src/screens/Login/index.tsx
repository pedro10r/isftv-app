import React, { useMemo } from "react";
import { View, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

import { FormTemplate } from "@components/templates";
import { Button, SimpleButton, Switch, TextInput } from "@components/atoms";
import { useAppTheme } from "@theme/ThemeContext";
import { theme } from "@theme";

import { useLogin } from "./hooks";
import { strings } from "./strings";
import { createStyles } from "./styles";

const { spacing } = theme;

export function Login() {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const insets = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
    isBiometricSupported,
    isBiometricEnabled,
    handleToggleBiometric,
    handleSignUpNavigation,
    handleForgotPasswordNavigation,
  } = useLogin();

  return (
    <FormTemplate>
      <ScrollView
        style={styles.flexContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{strings.login.title}</Text>
            <Text style={styles.subtitle}>{strings.login.subtitle}</Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              fieldName={strings.login.emailLabel}
              control={control}
              name="email"
              placeholder={strings.login.emailPlaceholder}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              fieldName={strings.login.passwordLabel}
              control={control}
              name="password"
              placeholder={strings.login.passwordPlaceholder}
              secureTextEntry
              showPasswordToggle
            />

            <View style={styles.forgetPasswordButtonContainer}>
              <SimpleButton
                label={strings.login.buttonForgot}
                onPress={handleForgotPasswordNavigation}
                size="small"
              />
            </View>

            {isBiometricSupported && (
              <View style={styles.biometricRow}>
                <View style={styles.biometricIcon}>
                  <Feather
                    name="maximize"
                    size={20}
                    color={colors.textPrimary}
                  />
                </View>

                <Text style={styles.biometricLabel}>
                  {strings.login.biometricToggleLabel}
                </Text>

                <Switch
                  value={isBiometricEnabled}
                  onValueChange={handleToggleBiometric}
                />
              </View>
            )}
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
          label={strings.login.buttonSubmit}
          onPress={handleSubmit(onSubmit)}
          loading={isLoading}
        />

        <View style={styles.footerLink}>
          <Text style={styles.text}>{strings.login.dontHaveAccount}</Text>
          <SimpleButton
            label={strings.login.signUp}
            onPress={handleSignUpNavigation}
          />
        </View>
      </View>
    </FormTemplate>
  );
}
