import { useState } from "react";
import { Alert } from "react-native";
import { useShallow } from "zustand/react/shallow";

import { useCreateTournamentStore } from "@store/createTournamentStore";
import { maskCurrency } from "@utils";

import { strings } from "./strings";

export const DEFAULT_CATEGORIES = [
  "Principiante",
  "Iniciante",
  "Amador C",
  "Amador B",
  "Amador A",
  "Open",
  "Misto",
  "Feminino Iniciante",
  "Feminino Intermediário",
];

export function useStepTwoCategories() {
  const { categories, addCategory, removeCategory, nextStep } =
    useCreateTournamentStore(
      useShallow((state) => ({
        categories: state.categories,
        addCategory: state.addCategory,
        removeCategory: state.removeCategory,
        nextStep: state.nextStep,
      })),
    );

  const [baseFee, setBaseFee] = useState("");
  const [customCategoryName, setCustomCategoryName] = useState("");

  const isSelected = (name: string) =>
    categories.some((category) => category.name === name);

  const handleToggleCategory = (name: string) => {
    const existing = categories.find((category) => category.name === name);

    if (existing) {
      removeCategory(existing.id);
      return;
    }

    addCategory({
      id: Math.random().toString(),
      name,
      fee: baseFee,
      prizes: {},
    });
  };

  const handleAddCustomCategory = () => {
    const trimmed = customCategoryName.trim();
    if (!trimmed) return;

    addCategory({
      id: Math.random().toString(),
      name: trimmed,
      fee: baseFee,
      prizes: {},
    });

    setCustomCategoryName("");
  };

  const onSubmit = () => {
    if (categories.length === 0) {
      Alert.alert(
        strings.validation.alertTitle,
        strings.validation.alertMessage,
      );
      return;
    }

    nextStep();
  };

  const handleChangeText = (text: string) => {
    const numericText = text.replace(/\D/g, "");

    if (!numericText) {
      setBaseFee("");
      return;
    }

    setBaseFee(maskCurrency(numericText));
  };

  return {
    baseFee,
    setBaseFee,
    customCategoryName,
    setCustomCategoryName,
    categories,
    isSelected,
    handleToggleCategory,
    handleAddCustomCategory,
    removeCategory,
    onSubmit,
    handleChangeText,
  };
}
