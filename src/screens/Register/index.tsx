import { Text, View } from "react-native";

import { FormTemplate } from "@components/templates";

import { Button, SimpleButton, TextInput } from "@components/atoms";

import { useRegister } from "./hooks";
import { strings } from "./strings";
import { styles } from "./styles";

export function Register() {
  const { control, handleSubmit, onSubmit, handleGoBack, isLoading } = useRegister();

  return (
    <FormTemplate>
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

        <View style={styles.buttonContainer}>
          <Button
            label={strings.register.title}
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.text}>{strings.register.alreadyHaveAccount}</Text>

        <SimpleButton
          label={strings.register.buttonLogin}
          onPress={handleGoBack}
        />
      </View>
    </FormTemplate>
  );
}
