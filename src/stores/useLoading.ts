import { create } from "zustand";

// Define the type for the store
interface LoadingStore {
  isLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
}

// Create the Zustand store with TypeScript support
const useLoading = create<LoadingStore>((set) => ({
  isLoading: false,
  showLoading: () => set({ isLoading: true }),
  hideLoading: () => set({ isLoading: false }),
}));

export default useLoading;
