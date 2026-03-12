import { useCallback } from "react";
import { Alert } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from "expo-image-picker";

import { useHomeNavigation } from "@navigation/appNavigation";
import { useFeedStore } from "@store/useFeedStore";

import { createPostSchema, CreatePostFormValues } from "./schemas";

export const useCreatePost = () => {
  const { goBack } = useHomeNavigation();

  const { control, handleSubmit, formState, watch, setValue } =
    useForm<CreatePostFormValues>({
      resolver: zodResolver(createPostSchema),
      mode: "onChange",
      defaultValues: {
        content: "",
        isVideo: false,
      },
    });

  const mediaUrl = watch("mediaUrl");
  const isVideo = watch("isVideo");

  const handlePickMedia = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permissão necessária",
        "Permita o acesso à galeria para anexar uma mídia.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setValue("mediaUrl", asset.uri, { shouldValidate: true });
      setValue("isVideo", asset.type === "video", { shouldValidate: true });
    }
  }, [setValue]);

  const removeMedia = useCallback(() => {
    setValue("mediaUrl", undefined, { shouldValidate: true });
    setValue("isVideo", false, { shouldValidate: true });
  }, [setValue]);

  const addPost = useFeedStore((s) => s.addPost);

  const onSubmit = (data: CreatePostFormValues) => {
    addPost(data);
    goBack();
  };

  return {
    control,
    handleSubmit,
    formState,
    mediaUrl,
    isVideo,
    handlePickMedia,
    removeMedia,
    onSubmit,
    goBack,
  };
};
