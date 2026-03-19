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
  const {
    baseFee,
    setField,
    categories,
    addCategory,
    updateCategory,
    removeCategory,
    nextStep,
  } = useCreateTournamentStore(
    useShallow((state) => ({
      baseFee: state.baseFee,
      setField: state.setField,
      categories: state.categories,
      addCategory: state.addCategory,
      updateCategory: state.updateCategory,
      removeCategory: state.removeCategory,
      nextStep: state.nextStep,
    })),
  );

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
      startTime: "",
      prizes: {},
    });
  };

  const handleAddCustomCategory = () => {
    const trimmed = customCategoryName.trim();
    if (!trimmed) return;

    addCategory({
      id: Math.random().toString(),
      name: trimmed,
      startTime: "",
      prizes: {},
    });
    setCustomCategoryName("");
  };

  const handleUpdateCategoryTime = (id: string, time: string) => {
    updateCategory(id, { startTime: time });
  };

  const handleChangeFee = (text: string) => {
    const digits = text.replace(/\D/g, "");
    setField("baseFee", digits ? maskCurrency(digits) : "");
  };

  const onSubmit = () => {
    if (!baseFee) {
      Alert.alert(
        strings.validation.alertTitle,
        strings.validation.feeAlertMessage,
      );
      return;
    }

    if (categories.length === 0) {
      Alert.alert(
        strings.validation.alertTitle,
        strings.validation.alertMessage,
      );
      return;
    }

    nextStep();
  };

  return {
    baseFee,
    customCategoryName,
    setCustomCategoryName,
    categories,
    isSelected,
    handleToggleCategory,
    handleAddCustomCategory,
    handleUpdateCategoryTime,
    removeCategory,
    handleChangeFee,
    onSubmit,
  };
}
