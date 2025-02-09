import { create } from "zustand";
import { User } from "@/model/user";

type State = {
    user : User | null;
}

type Action = {
    login : (user : User) => void;
    logout : () => void;
}

export const useUserStore = create<State & Action>((set)=>({
    user : null,
    login : (user) => set({user}),
    logout : ()=> set({user : null})
}))