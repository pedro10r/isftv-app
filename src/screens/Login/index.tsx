import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { TextInput } from "@components/TextInput";
import { Button } from "@components/Button";

import { useLogin } from "./hooks";
import { styles } from "./styles";
import { strings } from "./strings";

export function Login() {
  const {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
    isBiometricSupported,
    handleBiometricLogin,
  } = useLogin();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
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
          />

          <TouchableOpacity
            onPress={() => {}}
            activeOpacity={0.6}
            style={styles.forgetPasswordButton}
          >
            <View style={styles.decoration}>
              <Text style={styles.forgetPasswordButtonText}>
                {strings.login.buttonForgot}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            label={strings.login.buttonSubmit}
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
          />
        </View>
      </View>

      {isBiometricSupported && (
        <View style={styles.footer}>
          <Text style={styles.text}>{strings.login.divider}</Text>

          <TouchableOpacity
            style={styles.biometryButton}
            onPress={handleBiometricLogin}
            activeOpacity={0.6}
          >
            <View style={styles.decoration}>
              <Text style={styles.biometryButtonText}>
                {strings.login.buttonBiometrics}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
