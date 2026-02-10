import { MMKV } from "react-native-mmkv";
import { StateStorage } from "zustand/middleware";

// Expo automatically loads variables that begin with EXPO_PUBLIC_
const encryptionKey = process.env.EXPO_PUBLIC_STORAGE_ENCRYPTION_KEY;

export const storage = new MMKV({
  id: "user-storage",
  encryptionKey: encryptionKey,
});

export const mmkvStorageAdapter: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return storage.delete(name);
  },
};
