import { View, Text, ScrollView } from "react-native";

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
    goBack,
    isSubmitting,
  } = useProfile();

  return (
    <FormTemplate showBackButton onBack={goBack}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{strings.title}</Text>
          <Text style={styles.subtitle}>{strings.subtitle}</Text>
        </View>

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

        <TextInput
          fieldName={strings.labels.city}
          control={control}
          name="city"
          placeholder={strings.placeholders.city}
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
      </ScrollView>
    </FormTemplate>
  );
}
