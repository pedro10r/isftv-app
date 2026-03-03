import { View, Text } from "react-native";

import { FormTemplate } from "@components/templates";
import { Button, TextInput, Select } from "@components/atoms";

import { useProfile } from "./hooks";
import { strings } from "./strings";
import { styles } from "./styles";

export function EditProfile() {
  const {
    user,
    control,
    playingPosition,
    setPlayingPosition,
    handleSubmit,
    onSubmit,
    isSubmitting,
  } = useProfile();

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
