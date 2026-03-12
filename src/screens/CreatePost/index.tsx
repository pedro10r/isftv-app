import { useMemo } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Controller } from "react-hook-form";
import { Feather } from "@expo/vector-icons";

import { FormTemplate } from "@components/templates";
import { useAppTheme } from "@theme/ThemeContext";

import { useCreatePost } from "./hooks";
import { createStyles } from "./styles";
import { strings } from "./strings";

export function CreatePost() {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const {
    control,
    handleSubmit,
    formState,
    mediaUrl,
    isVideo,
    handlePickMedia,
    removeMedia,
    onSubmit,
    goBack,
  } = useCreatePost();

  return (
    <FormTemplate>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} activeOpacity={0.7}>
          <Text style={styles.cancelButton}>{strings.header.cancel}</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{strings.header.title}</Text>

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={!formState.isValid}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.publishButton,
              !formState.isValid && styles.publishButtonDisabled,
            ]}
          >
            {strings.header.publish}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <Controller
          control={control}
          name="content"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.textArea}
              placeholder={strings.placeholders.content}
              placeholderTextColor={colors.placeholder}
              multiline
              value={value}
              onChangeText={onChange}
              maxLength={500}
              textAlignVertical="top"
              autoFocus
            />
          )}
        />

        {mediaUrl && (
          <View style={styles.mediaPreview}>
            <Image
              source={{ uri: mediaUrl }}
              style={styles.previewImage}
              resizeMode="cover"
            />

            {isVideo && (
              <View style={styles.videoOverlay}>
                <Feather name="play-circle" size={48} color={colors.white} />
              </View>
            )}

            <TouchableOpacity
              style={styles.removeMedia}
              onPress={removeMedia}
              activeOpacity={0.8}
            >
              <Feather name="x" size={14} color={colors.white} />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <View style={styles.toolbar}>
        <TouchableOpacity onPress={handlePickMedia} activeOpacity={0.7}>
          <Feather name="image" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </FormTemplate>
  );
}
