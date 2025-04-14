import { getChatProfileById } from "@/api/services/chatService";
import { ChatUserProfile } from "@/model/chatUserProfile";
import { create } from "zustand";

type State = {
    chatProfileList : ChatUserProfile[];
}

type Action = {
    clearList : ()=>void;
    updateProfieList : (idList : number[]) => Promise<ChatUserProfile[]>;
    getOneProfileById : (id : number) => ChatUserProfile | undefined;
}

export const useChatProfileListStore = create<State & Action>((set, get) => ({
    chatProfileList : [],
    clearList : () => set({ chatProfileList : [] }),
    updateProfieList : async(idList : number[]) => {
        const currentList = get().chatProfileList;
        
        // Remove profiles that are not in idList
        const filteredList = currentList.filter(profile => 
            idList.includes(profile.id)
        );

        // Find IDs that need to be fetched
        const idsToFetch = idList.filter(id => 
            !currentList.some(profile => profile.id === id)
        );

        try {
            const newProfiles = await Promise.all(
                idsToFetch.map(async (id) => {
                    const data = await getChatProfileById(id);
                    return data;
                })
            );

            // Combine filtered existing profiles with new profiles
            const updatedList = [...filteredList, ...newProfiles];
            
            set({ chatProfileList: updatedList });
            return updatedList;
        } catch (error) {
            console.error('Error fetching profiles:', error);
            return get().chatProfileList; // Return the current list in case of error
        }
    },
    getOneProfileById: (id: number) => {
        const { chatProfileList } = get();
        return chatProfileList.find(profile => profile.id === id);
    }
}));