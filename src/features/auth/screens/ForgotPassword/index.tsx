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

  const { step, isLoading, handleGoBack, step1, step2 } = useForgotPassword();

  const isStep1 = step === 1;
  const currentStrings = isStep1 ? strings.step1 : strings.step2;

  return (
    <FormTemplate showBackButton onBack={handleGoBack}>
      <ScrollView
        style={styles.flexContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{currentStrings.title}</Text>
            <Text style={styles.subtitle}>{currentStrings.subtitle}</Text>
          </View>

          <View style={styles.inputContainer}>
            {isStep1 ? (
              <TextInput
                key="input-email"
                fieldName={strings.step1.emailLabel}
                control={step1.control}
                name="email"
                placeholder={strings.step1.emailPlaceholder}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="off"
              />
            ) : (
              <>
                <TextInput
                  key="input-otp"
                  fieldName={strings.step2.otpLabel}
                  control={step2.control}
                  name="otp"
                  placeholder={strings.step2.otpPlaceholder}
                  keyboardType="number-pad"
                  maxLength={8}
                  textContentType="oneTimeCode"
                />
                <TextInput
                  key="input-password"
                  fieldName={strings.step2.passwordLabel}
                  control={step2.control}
                  name="newPassword"
                  placeholder={strings.step2.passwordPlaceholder}
                  secureTextEntry
                  showPasswordToggle
                />
                <TextInput
                  key="input-confirm-password"
                  fieldName={strings.step2.confirmPasswordLabel}
                  control={step2.control}
                  name="confirmPassword"
                  placeholder={strings.step2.passwordPlaceholder}
                  secureTextEntry
                  showPasswordToggle
                />
              </>
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
          label={currentStrings.buttonSubmit}
          onPress={
            isStep1
              ? step1.handleSubmit(step1.onSubmit)
              : step2.handleSubmit(step2.onSubmit)
          }
          loading={isLoading}
        />

        <View style={styles.footerLink}>
          <Text style={styles.text}>{strings.common.rememberedPassword}</Text>
          <SimpleButton
            label={strings.common.buttonBack}
            onPress={handleGoBack}
          />
        </View>
      </View>
    </FormTemplate>
  );
}
