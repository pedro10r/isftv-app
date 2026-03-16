import { create } from "zustand";

import { Prizes } from "@models/tournament";

export interface DraftCategory {
  id: string;
  name: string;
  fee: string;
  prizes: Prizes;
}

interface CreateTournamentState {
  step: number;
  isSubmitting: boolean;
  posterUri: string;
  name: string;
  venue_name: string;
  city: string;
  start_date: string;
  end_date: string;
  contact_whatsapp: string;
  categories: DraftCategory[];

  setField: <
    K extends keyof Omit<
      CreateTournamentState,
      | "categories"
      | "step"
      | "setField"
      | "addCategory"
      | "updateCategory"
      | "removeCategory"
      | "nextStep"
      | "prevStep"
      | "resetForm"
    >,
  >(
    field: K,
    value: CreateTournamentState[K],
  ) => void;
  addCategory: (category: DraftCategory) => void;
  updateCategory: (id: string, data: Partial<DraftCategory>) => void;
  removeCategory: (id: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetForm: () => void;
}

const initialState = {
  step: 1,
  isSubmitting: false,
  posterUri: "",
  name: "",
  venue_name: "",
  city: "",
  start_date: "",
  end_date: "",
  contact_whatsapp: "",
  categories: [] as DraftCategory[],
};

export const useCreateTournamentStore = create<CreateTournamentState>()(
  (set) => ({
    ...initialState,

    setField: (field, value) => set({ [field]: value }),

    addCategory: (category) =>
      set((state) => ({ categories: [...state.categories, category] })),

    updateCategory: (id, data) =>
      set((state) => ({
        categories: state.categories.map((c) =>
          c.id === id ? { ...c, ...data } : c,
        ),
      })),

    removeCategory: (id) =>
      set((state) => ({
        categories: state.categories.filter((c) => c.id !== id),
      })),

    nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 3) })),

    prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),

    resetForm: () => set(initialState),
  }),
);
