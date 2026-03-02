import { View, Text } from "react-native";

import { FormTemplate } from "@components/templates";
import { Button, SimpleButton, TextInput } from "@components/atoms";

import { useForgotPassword } from "./hooks";
import { strings } from "./strings";
import { styles } from "./styles";

export function ForgotPassword() {
  const { control, handleSubmit, onSubmit, handleGoBack, isLoading } =
    useForgotPassword();

  return (
    <FormTemplate>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{strings.forgotPassword.title}</Text>
          <Text style={styles.subtitle}>{strings.forgotPassword.subtitle}</Text>
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

          <TextInput
            fieldName={strings.forgotPassword.newPasswordLabel}
            control={control}
            name="newPassword"
            placeholder={strings.forgotPassword.newPasswordPlaceholder}
            secureTextEntry
            showPasswordToggle
          />

          <TextInput
            fieldName={strings.forgotPassword.confirmPasswordLabel}
            control={control}
            name="confirmPassword"
            placeholder={strings.forgotPassword.confirmPasswordPlaceholder}
            secureTextEntry
            showPasswordToggle
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            label={strings.forgotPassword.buttonSubmit}
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.text}>
          {strings.forgotPassword.rememberedPassword}
        </Text>

        <SimpleButton
          label={strings.forgotPassword.buttonBack}
          onPress={handleGoBack}
        />
      </View>
    </FormTemplate>
  );
}
