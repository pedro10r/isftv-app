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
          <Text style={styles.title}>{strings.signInTitle}</Text>
          <Text style={styles.subtitle}>{strings.signInSubtitle}</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            fieldName={strings.emailFieldName}
            control={control}
            name="email"
            placeholder={strings.emailPlaceholder}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            fieldName={strings.passwordFieldName}
            control={control}
            name="password"
            placeholder={strings.passwordPlaceholder}
            secureTextEntry
          />

          <TouchableOpacity
            onPress={() => {}}
            activeOpacity={0.6}
            style={styles.forgetPasswordButton}
          >
            <View style={styles.decoration}>
              <Text style={styles.forgetPasswordButtonText}>
                {strings.forgotPasswordButtonText}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            label={strings.signInTitle}
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.text}>{strings.or}</Text>

        {isBiometricSupported && (
          <TouchableOpacity
            style={styles.biometryButton}
            onPress={handleBiometricLogin}
            activeOpacity={0.6}
          >
            <View style={styles.decoration}>
              <Text style={styles.biometryButtonText}>
                {strings.signInWithBiometrics}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
