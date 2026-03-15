import * as FileSystem from "expo-file-system/legacy";
import { decode } from "base64-arraybuffer";

import { supabase } from "@services/supabase";
import { Post, FeedItemType } from "@models/feed";

export async function getFeedPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*, profiles(full_name, username, avatar_url)")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return (data ?? []) as Post[];
}

export async function createFeedPost(
  authorId: string,
  content: string | null,
  imageUri: string | null,
): Promise<Post> {
  let mediaUrl: string | null = null;

  if (imageUri) {
    const base64 = await FileSystem.readAsStringAsync(imageUri, {
      encoding: "base64",
    });

    const fileData = decode(base64);
    const filePath = `${authorId}/${Date.now()}.jpg`;

    const { error: uploadError } = await supabase.storage
      .from("posts")
      .upload(filePath, fileData, { contentType: "image/jpeg", upsert: true });

    if (uploadError) throw new Error(uploadError.message);

    const { data: urlData } = supabase.storage
      .from("posts")
      .getPublicUrl(filePath);

    mediaUrl = urlData.publicUrl;
  }

  const { data, error } = await supabase
    .from("posts")
    .insert({
      author_id: authorId,
      content,
      media_url: mediaUrl,
      type: FeedItemType.UserPost,
    })
    .select("*, profiles(full_name, username, avatar_url)")
    .single();

  if (error) throw new Error(error.message);

  return data as Post;
}
