import { create } from "zustand";

type Noti = {
  title: string;
  body: string;
  type: string;
};

type State = {
  notiList: Noti[] | null;
};

type Action = {
  setNotiList: (noti: Noti[]) => void;
};

export const useToast = create<State & Action>((set) => ({
  notiList: null,
  setNotiList: (noti) => {
    set((state) => ({ notiList: { ...state.notiList, ...noti } }));
  },
}));
