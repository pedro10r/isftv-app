import { useState } from "react";
import { Alert } from "react-native";
import { useShallow } from "zustand/react/shallow";

import { useCreateTournamentStore } from "@store/createTournamentStore";
import { useAuthStore } from "@store/authStore";
import { useTournamentsNavigation } from "@navigation/appNavigation";
import { useCreateTournamentMutation } from "@hooks/queries/useTournamentQueries";
import { Prizes, PrizeTier } from "@models/tournament";

import { strings } from "./strings";

type PrizePlace = keyof Omit<Prizes, "fourth_place">;
type PrizeTierField = keyof PrizeTier;

export function useStepThreePrizes() {
  const {
    name,
    venue_name,
    city,
    start_date,
    end_date,
    contact_whatsapp,
    posterUri,
    categories,
    updateCategory,
    setField,
    resetForm,
  } = useCreateTournamentStore(
    useShallow((state) => ({
      name: state.name,
      venue_name: state.venue_name,
      city: state.city,
      start_date: state.start_date,
      end_date: state.end_date,
      contact_whatsapp: state.contact_whatsapp,
      posterUri: state.posterUri,
      categories: state.categories,
      updateCategory: state.updateCategory,
      setField: state.setField,
      resetForm: state.resetForm,
    })),
  );

  const organizerId = useAuthStore((s) => s.session?.user.id ?? "");
  const { goBack } = useTournamentsNavigation();
  const { mutateAsync } = useCreateTournamentMutation();

  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    categories[0]?.id ?? null,
  );

  const toggleExpand = (id: string) => {
    setExpandedCategory((prev) => (prev === id ? null : id));
  };

  const handlePrizeChange = (
    categoryId: string,
    place: PrizePlace,
    field: PrizeTierField,
    value: number | boolean,
  ) => {
    const category = categories.find((c) => c.id === categoryId);
    if (!category) return;

    const currentTier: PrizeTier = category.prizes[place] ?? { cash: 0 };
    const updatedTier: PrizeTier = { ...currentTier, [field]: value };
    const updatedPrizes: Prizes = { ...category.prizes, [place]: updatedTier };

    updateCategory(categoryId, { prizes: updatedPrizes });
  };

  const onSubmit = async () => {
    setField("isSubmitting", true);

    try {
      await mutateAsync({
        name,
        venue_name,
        city,
        start_date,
        end_date,
        contact_whatsapp,
        posterUri,
        organizerId,
        categories,
      });

      Alert.alert(strings.success.alertTitle, strings.success.alertMessage, [
        {
          text: "OK",
          onPress: () => {
            resetForm();
            goBack();
          },
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível publicar o campeonato.");
    } finally {
      setField("isSubmitting", false);
    }
  };

  const handleFourthPlaceChange = (
    categoryId: string,
    field: "text" | "trophy",
    value: string | boolean,
  ) => {
    const category = categories.find((c) => c.id === categoryId);
    if (!category) return;
    const updatedFourth = { ...category.prizes.fourth_place, [field]: value };

    updateCategory(categoryId, {
      prizes: { ...category.prizes, fourth_place: updatedFourth },
    });
  };

  return {
    categories,
    expandedCategory,
    toggleExpand,
    handlePrizeChange,
    handleFourthPlaceChange,
    onSubmit,
  };
}
