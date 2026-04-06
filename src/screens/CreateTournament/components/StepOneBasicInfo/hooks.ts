import { useEffect } from "react";
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
    state,
    start_date,
    end_date,
    contact_whatsapp,
    description,
    posterUri,
    setField,
    nextStep,
  } = useCreateTournamentStore(
    useShallow((state) => ({
      name: state.name,
      venue_name: state.venue_name,
      city: state.city,
      state: state.state,
      start_date: state.start_date,
      end_date: state.end_date,
      contact_whatsapp: state.contact_whatsapp,
      description: state.description,
      posterUri: state.posterUri,
      setField: state.setField,
      nextStep: state.nextStep,
    })),
  );

  const { control, handleSubmit, watch } = useForm<StepOneFormData>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      name,
      venue_name,
      city,
      state,
      start_date,
      end_date,
      contact_whatsapp,
      description,
    },
  });

  // Sync RHF → Zustand in real-time so the draft guard can detect dirty state
  useEffect(() => {
    const subscription = watch((values) => {
      if (values.name !== undefined) setField("name", values.name);
      if (values.venue_name !== undefined)
        setField("venue_name", values.venue_name);
      if (values.city !== undefined) setField("city", values.city);
      if (values.state !== undefined) setField("state", values.state);
      if (values.start_date !== undefined)
        setField("start_date", values.start_date);
      if (values.end_date !== undefined) setField("end_date", values.end_date);
      if (values.contact_whatsapp !== undefined)
        setField("contact_whatsapp", values.contact_whatsapp);
      if (values.description !== undefined)
        setField("description", values.description);
    });

    return () => subscription.unsubscribe();
  }, [watch, setField]);

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
    setField("state", data.state);
    setField("start_date", data.start_date);
    setField("end_date", data.end_date);
    setField("contact_whatsapp", data.contact_whatsapp);
    setField("description", data.description ?? "");
    nextStep();
  };

  return { control, handleSubmit, onSubmit, posterUri, handlePickImage };
}
