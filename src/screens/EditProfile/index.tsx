import { useState } from "react";
import { View, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";

import { FormTemplate } from "@components/templates";
import { Button, TextInput, Select } from "@components/atoms";
import { useAuthStore } from "@store/authStore";
import { PlayingPosition, useProfileStore } from "@store/profileStore";

import { strings } from "./strings";
import { styles } from "./styles";

interface FormValues {
  username: string;
  height: string;
  weight: string;
}

export function EditProfile() {
  const { goBack } = useNavigation();

  const user = useAuthStore((state) => state.user);
  const profile = useProfileStore();

  const [playingPosition, setPlayingPosition] = useState<PlayingPosition>(
    profile.playingPosition,
  );

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      username: profile.username,
      height: profile.height,
      weight: profile.weight,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      profile.updateProfile({
        ...data,
        playingPosition,
      });
      Alert.alert(
        strings.messages.successTitle,
        strings.messages.successMessage,
        [
          {
            text: "OK",
            onPress: () => goBack(),
          },
        ],
      );
    } catch {
      Alert.alert(strings.messages.errorTitle, strings.messages.errorMessage);
    }
  };

  return (
    <FormTemplate>
      <View style={styles.container}>
        <View>
          <Text style={styles.label}>{strings.labels.name}</Text>
          <View style={styles.readOnlyInput}>
            <Text style={styles.readOnlyText}>{user?.name || ""}</Text>
          </View>
        </View>

        <TextInput
          fieldName={strings.labels.username}
          control={control}
          name="username"
          placeholder={strings.placeholders.username}
        />

        <View style={styles.row}>
          <View style={styles.halfInput}>
            <TextInput
              fieldName={strings.labels.height}
              control={control}
              name="height"
              placeholder={strings.placeholders.height}
            />
          </View>

          <View style={styles.halfInput}>
            <TextInput
              fieldName={strings.labels.weight}
              control={control}
              name="weight"
              placeholder={strings.placeholders.weight}
            />
          </View>
        </View>

        <Select value={playingPosition} onValueChange={setPlayingPosition} />

        <Button
          label={strings.button}
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
        />
      </View>
    </FormTemplate>
  );
}
