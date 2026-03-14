import * as FileSystem from "expo-file-system/legacy";
import { decode } from "base64-arraybuffer";

import { supabase } from "@services/supabase";
import { Profile } from "@models/profile";

export async function getProfile(userId: string): Promise<Profile> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function updateProfile(
  userId: string,
  updates: Partial<Omit<Profile, "id">>,
): Promise<void> {
  const { error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId);

  if (error) throw new Error(error.message);
}

export async function uploadImage(
  userId: string,
  imageUri: string,
  type: "avatar" | "cover",
  oldUrl?: string | null,
): Promise<string> {
  if (oldUrl) {
    const marker = "/profiles/";
    const markerIndex = oldUrl.indexOf(marker);

    if (markerIndex !== -1) {
      const oldPath = oldUrl.slice(markerIndex + marker.length);
      await supabase.storage.from("profiles").remove([oldPath]);
    }
  }

  const base64 = await FileSystem.readAsStringAsync(imageUri, {
    encoding: "base64",
  });

  const fileData = decode(base64);
  const filePath = `${userId}/${type}_${Date.now()}.jpg`;

  const { error: uploadError } = await supabase.storage
    .from("profiles")
    .upload(filePath, fileData, { contentType: "image/jpeg", upsert: true });

  if (uploadError) throw new Error(uploadError.message);

  const {
    data: { publicUrl },
  } = supabase.storage.from("profiles").getPublicUrl(filePath);

  const column = type === "avatar" ? "avatar_url" : "cover_url";

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ [column]: publicUrl })
    .eq("id", userId);

  if (updateError) throw new Error(updateError.message);

  return publicUrl;
}
