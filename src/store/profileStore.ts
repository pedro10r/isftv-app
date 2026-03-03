import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { mmkvStorageAdapter } from "@lib/storage";

export type PlayingPosition = "Direita" | "Esquerda" | "Ambos";

export interface ProfileState {
  username: string;
  city: string;
  height: string;
  weight: string;
  playingPosition: PlayingPosition;
  updateProfile: (data: Partial<Omit<ProfileState, "updateProfile">>) => void;
}

const INITIAL_PROFILE: Omit<ProfileState, "updateProfile"> = {
  username: "",
  city: "",
  height: "",
  weight: "",
  playingPosition: "Direita",
};

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      ...INITIAL_PROFILE,
      updateProfile: (data) => set((state) => ({ ...state, ...data })),
    }),
    {
      name: "profile-storage",
      storage: createJSONStorage(() => mmkvStorageAdapter),
    },
  ),
);
