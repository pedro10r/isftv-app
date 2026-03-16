import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from "expo-image-picker";
import { useShallow } from "zustand/react/shallow";

import { useCreateTournamentStore } from "@store/createTournamentStore";
import { stepOneSchema, StepOneFormData } from "../../schemas";

export function useStepOneBasicInfo() {
  const {
    name,
    venue_name,
    city,
    start_date,
    end_date,
    contact_whatsapp,
    posterUri,
    setField,
    nextStep,
  } = useCreateTournamentStore(
    useShallow((state) => ({
      name: state.name,
      venue_name: state.venue_name,
      city: state.city,
      start_date: state.start_date,
      end_date: state.end_date,
      contact_whatsapp: state.contact_whatsapp,
      posterUri: state.posterUri,
      setField: state.setField,
      nextStep: state.nextStep,
    })),
  );

  const { control, handleSubmit } = useForm<StepOneFormData>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      name,
      venue_name,
      city,
      start_date,
      end_date,
      contact_whatsapp,
    },
  });

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setField("posterUri", result.assets[0].uri);
    }
  };

  const onSubmit = (data: StepOneFormData) => {
    setField("name", data.name);
    setField("venue_name", data.venue_name);
    setField("city", data.city);
    setField("start_date", data.start_date);
    setField("end_date", data.end_date);
    setField("contact_whatsapp", data.contact_whatsapp);
    nextStep();
  };

  return { control, handleSubmit, onSubmit, posterUri, handlePickImage };
}
