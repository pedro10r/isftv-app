import { useMemo } from "react";
import { Text, View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FormTemplate } from "@components/templates";
import { Button, SimpleButton, TextInput } from "@components/atoms";
import { useAppTheme } from "@theme/ThemeContext";
import { theme } from "@theme";

import { useRegister } from "./hooks";
import { strings } from "./strings";
import { createStyles } from "./styles";

const { spacing } = theme;

export function Register() {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const insets = useSafeAreaInsets();

  const { control, handleSubmit, onSubmit, handleGoBack, isLoading } =
    useRegister();

  return (
    <FormTemplate showBackButton onBack={handleGoBack}>
      <ScrollView
        style={styles.flexContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{strings.register.title}</Text>
            <Text style={styles.subtitle}>{strings.register.subtitle}</Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              fieldName={strings.register.nameLabel}
              control={control}
              name="name"
              placeholder={strings.register.namePlaceholder}
              keyboardType="default"
              autoCapitalize="words"
            />

            <TextInput
              fieldName={strings.register.emailLabel}
              control={control}
              name="email"
              placeholder={strings.register.emailPlaceholder}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              fieldName={strings.register.passwordLabel}
              control={control}
              name="password"
              placeholder={strings.register.passwordPlaceholder}
              secureTextEntry
              showPasswordToggle
            />

            <TextInput
              fieldName={strings.register.confirmPasswordLabel}
              control={control}
              name="confirmPassword"
              placeholder={strings.register.passwordPlaceholder}
              secureTextEntry
              showPasswordToggle
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
          label={strings.register.title}
          onPress={handleSubmit(onSubmit)}
          loading={isLoading}
        />

        <View style={styles.footerLink}>
          <Text style={styles.text}>{strings.register.alreadyHaveAccount}</Text>
          <SimpleButton
            label={strings.register.buttonLogin}
            onPress={handleGoBack}
          />
        </View>
      </View>
    </FormTemplate>
  );
}
