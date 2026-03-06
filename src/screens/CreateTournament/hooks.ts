import { useCallback } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Category } from "@models/tournament";
import { useTournamentsNavigation } from "@navigation/appNavigation";
import { useTournamentStore } from "@store/useTournamentStore";

import { CreateTournamentFormData, createTournamentSchema } from "./schemas";
import { strings } from "./strings";

export const useCreateTournament = () => {
  const { goBack } = useTournamentsNavigation();
  const addTournament = useTournamentStore((state) => state.addTournament);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateTournamentFormData>({
    resolver: zodResolver(createTournamentSchema),
    defaultValues: { categories: [], imageUri: undefined },
  });

  const imageUri = watch("imageUri");
  const categories = watch("categories");

  const handleGoBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handlePickImage = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled) {
      setValue("imageUri", result.assets[0].uri, { shouldValidate: true });
    }
  }, [setValue]);

  const toggleCategory = useCallback(
    (category: Category) => {
      const current = categories as Category[];
      const updated = current.includes(category)
        ? current.filter((c) => c !== category)
        : [...current, category];

      setValue("categories", updated, { shouldValidate: true });
    },
    [categories, setValue],
  );

  const onSubmit = useCallback(
    (data: CreateTournamentFormData) => {
      addTournament(data);
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
    },
    [addTournament, goBack],
  );

  return {
    control,
    handleSubmit,
    errors,
    imageUri,
    categories: categories as Category[],
    handleGoBack,
    handlePickImage,
    toggleCategory,
    onSubmit,
  };
};
