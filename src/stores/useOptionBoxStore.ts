import { create } from "zustand";

type OptionBoxState = {
  activeRowId: number | null;
  position: { top: number; left: number } | null;
  setActiveRow: (
    id: number | null,
    position: { top: number; left: number } | null
  ) => void;
  closeOptionBox: () => void;
};

export const useOptionBoxStore = create<OptionBoxState>((set) => ({
  activeRowId: null,
  position: null,
  setActiveRow: (id, position) => set({ activeRowId: id, position }),
  closeOptionBox: () => set({ activeRowId: null, position: null }),
}));
