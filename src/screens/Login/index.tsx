import React, { useMemo } from "react";
import { View, Text } from "react-native";

import { FormTemplate } from "@components/templates";
import { Button, SimpleButton, TextInput } from "@components/atoms";
import { useAppTheme } from "@theme/ThemeContext";

import { useLogin } from "./hooks";
import { strings } from "./strings";
import { createStyles } from "./styles";

export function Login() {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
    isBiometricSupported,
    handleBiometricLogin,
    handleSignUpNavigation,
    handleForgotPasswordNavigation,
  } = useLogin();

  return (
    <FormTemplate>
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
        </View>

        <View style={styles.buttonContainer}>
          <Button
            label={strings.login.buttonSubmit}
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
          />
        </View>

        {isBiometricSupported && (
          <View style={styles.biometryButtonContainer}>
            <SimpleButton
              label={strings.login.buttonBiometrics}
              onPress={handleBiometricLogin}
            />
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.text}>{strings.login.dontHaveAccount}</Text>

        <SimpleButton
          label={strings.login.signUp}
          onPress={handleSignUpNavigation}
        />
      </View>
    </FormTemplate>
  );
}
