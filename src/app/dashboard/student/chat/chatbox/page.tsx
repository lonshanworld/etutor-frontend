"use client";

import ChatList from "@/components/chat/ChatList";
import ChatProfle from "@/components/chat/ChatProfile";
import HorizontalDivider from "@/components/dividers/HorizontalDivider";
import { useQuery } from "convex/react";
import { useSearchParams } from "next/navigation";
import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { useUserStore } from "@/stores/useUserStore";

export default function ChatBoxPage(){
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const getConversation = useQuery(api.chatRoom.getConversation,{ id: id ? (id as Id<"conversations">) : undefined,});
    const {user} = useUserStore();
    return (
        <div
        className="w-full h-full relative">
            {
                (id && getConversation) 
                ?
                <div
                className="absolute top-0 left-0 right-0 bottom-0 flex flex-col pt-4 sm:pt-0 px-4 sm:pr-0">
                    <ChatProfle chat={getConversation}/>
                    
                    <div
                        className="py-3">
                        <HorizontalDivider />
                    </div>
                    {
                        user && <ChatList chat={getConversation} user={user}/>
                    }
                </div> 
                :
                <div
                className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center">
                    <p className="text-font text-xl capitalize w-full h-full flex justify-center items-center">Select a chat to start messaging.</p>
                </div> 
            }
        </div>
    );
}