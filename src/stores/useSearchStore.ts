import { create } from "zustand";
import { User } from "@/model/user";

type ResponseType = {
  [type: string]: any;
};
type State = {
  data: ResponseType | null;
  isSearch: boolean;
};

type Action = {
  setIsSearch: (value: boolean) => void;
  searchData: (data: string) => void;
};

export const useSearchStore = create<State & Action>((set) => ({
  data: null,
  isSearch: false,
  setIsSearch: (value) => {
    set({ isSearch: value });
  },
  searchData: (data) => {
    // search data here (api fetch)
    console.log(data);
    set({ isSearch: true });
    // set({
    //   data: {
    //     name: "akm",
    //     email: "akm@gmail.com",
    //   },
    // });
  },
}));
