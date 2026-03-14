import { SupportedStorage } from "@supabase/supabase-js";

import { storage } from "@lib/storage";

export const mmkvSupabaseStorage: SupportedStorage = {
  getItem: (key: string): Promise<string | null> =>
    Promise.resolve(storage.getString(key) ?? null),

  setItem: (key: string, value: string): Promise<void> => {
    storage.set(key, value);
    return Promise.resolve();
  },

  removeItem: (key: string): Promise<void> => {
    storage.delete(key);
    return Promise.resolve();
  },
};
