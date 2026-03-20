import * as FileSystem from "expo-file-system/legacy";
import { decode } from "base64-arraybuffer";

import { supabase } from "@services/supabase";
import { Tournament } from "@models/tournament";
import { DraftCategory } from "@store/createTournamentStore";
import { parseDateForDB } from "@utils";

export interface CreateTournamentPayload {
  name: string;
  venue_name: string;
  city: string;
  start_date: string;
  end_date: string;
  contact_whatsapp: string;
  posterUri: string;
  organizerId: string;
  baseFee: string;
  description: string;
  categories: DraftCategory[];
}

export async function getTournaments(): Promise<Tournament[]> {
  const { data, error } = await supabase
    .from("tournaments")
    .select("*, profiles(full_name, avatar_url), tournament_categories(*)")
    .order("start_date", { ascending: true });

  if (error) throw new Error(error.message);

  return (data ?? []) as Tournament[];
}

export async function getTournamentById(id: string): Promise<Tournament> {
  const { data, error } = await supabase
    .from("tournaments")
    .select("*, profiles(full_name, avatar_url), tournament_categories(*)")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data as Tournament;
}

export async function createTournament(
  payload: CreateTournamentPayload,
): Promise<void> {
  let uploadedFilePath: string | null = null;
  let posterPublicUrl: string | null = null;

  if (payload.posterUri.startsWith("file://")) {
    const ext = payload.posterUri.split(".").pop() ?? "jpg";
    const filePath = `${payload.organizerId}/${Date.now()}.${ext}`;

    const base64 = await FileSystem.readAsStringAsync(payload.posterUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const { error: uploadError } = await supabase.storage
      .from("tournaments")
      .upload(filePath, decode(base64), {
        contentType: `image/${ext === "png" ? "png" : "jpeg"}`,
      });

    if (uploadError) throw new Error(uploadError.message);

    uploadedFilePath = filePath;

    const { data: urlData } = supabase.storage
      .from("tournaments")
      .getPublicUrl(filePath);

    posterPublicUrl = urlData.publicUrl;
  }

  try {
    const { data: tournament, error: tournamentError } = await supabase
      .from("tournaments")
      .insert({
        name: payload.name,
        venue_name: payload.venue_name,
        city: payload.city,
        start_date: parseDateForDB(payload.start_date),
        end_date: parseDateForDB(payload.end_date),
        contact_whatsapp: payload.contact_whatsapp,
        poster_url: posterPublicUrl ?? payload.posterUri,
        organizer_id: payload.organizerId,
        description: payload.description || null,
        // strips mask ("R$ 150,00" → "15000") then converts cents to float (150.00)
        registration_fee:
          parseFloat(payload.baseFee.replace(/\D/g, "")) / 100 || 0,
      })
      .select("id")
      .single();

    if (tournamentError) throw new Error(tournamentError.message);

    const categoryRows = payload.categories.map((c) => ({
      tournament_id: tournament.id,
      name: c.name,
      date: parseDateForDB(c.date) || null,
      start_time: c.startTime || null,
      prizes: c.prizes,
    }));

    const { error: categoriesError } = await supabase
      .from("tournament_categories")
      .insert(categoryRows);

    if (categoriesError) throw new Error(categoriesError.message);
  } catch (error) {
    if (uploadedFilePath) {
      await supabase.storage.from("tournaments").remove([uploadedFilePath]);
    }
    throw error;
  }
}
