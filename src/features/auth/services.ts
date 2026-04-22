import { supabase } from "@services/supabase";
import { UserRole } from "@features/profile/types";

export async function getUserRole(userId: string): Promise<UserRole> {
  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  return (data?.role as UserRole) ?? "player";
}
