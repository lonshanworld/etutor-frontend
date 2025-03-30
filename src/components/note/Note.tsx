"use client";

import { useUserStore } from "@/stores/useUserStore";
import PageTitle from "../PageTitle";
import ChatList from "../chat/ChatList";

export default function Note(){
    const {user} = useUserStore();

    return (
        <div
        className="w-full h-full px-4 pt-3 flex flex-col gap-2">
            <PageTitle title="Note" />
            {
                user && <ChatList user={user} />
            }
        </div>
    );
}