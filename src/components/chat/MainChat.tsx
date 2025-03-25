"use client";

import ChatHead from "@/components/chat/ChatHead";
import ChatTitle from "@/components/chat/ChatTitle";
import SearchUser from "@/components/chat/SearchUser";
import VerticalDivider from "@/components/dividers/VerticalDivider";
import { AppRouter } from "@/router";
import { useMutation, useQuery } from "convex/react";
import { usePathname } from "next/navigation";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { Profile } from "@/model/profile";

export default function MainChat({
    children,
    userData,
  }: Readonly<{
    children: React.ReactNode;
    userData : Profile, 
  }>){
    const pathName = usePathname();
    const [paginationOpts, setPaginationOpts] = useState({
        numItems: 10, 
        cursor : null,
      });
      const getChatHeadList = useQuery(api.chatRoom.getConversationsWithLatestMessage, {
        userId: userData.id ?? 0, // Replace with actual userId
        paginationOpts,
      });

    return (
        <div
        className="w-full h-full">
            <div
        className="w-full h-full relative block sm:hidden">
            {
                (pathName.includes(AppRouter.studentChatBox) || pathName.includes(AppRouter.tutorChatBox)) 
                ?
                children 
                :
                <div
            className="absolute top-0 left-0 right-0 bottom-0 flex flex-row sm:py-4 py-2 px-4">
                <div
                className="w-full sm:w-1/3 lg:w-1/4 h-full sm:pr-4 flex flex-col gap-3">
                    <ChatTitle />
                    <SearchUser />
                    <div className="w-full h-full flex flex-col gap-2 overflow-y-auto custom-scrollbar">
            {getChatHeadList?.page?.length === 0 ? (
              <div className="text-center text-gray-500 py-4">
                No conversations yet. <br />
                <span className="text-theme font-medium">Search people</span> and start chatting!
              </div>
            ) : (
              getChatHeadList?.page.map((chat) => (
                <ChatHead key={chat._id} chat={chat} />
              ))
            )}

            {/* Load More Button */}
            {getChatHeadList?.page.length && getChatHeadList?.page.length > 0 && (
              <button
                className="p-2 bg-theme text-white rounded"
                onClick={() =>
                  setPaginationOpts((prev) => ({
                    ...prev,
                    cursor: null, // Adjust logic here if a continuation mechanism is implemented
                  }))
                }
              >
                Load More
              </button>
            )}
            {getChatHeadList?.page?.length === 0 && (
              <div className="text-center text-gray-500 py-4">
                🎉 End of chats. Keep the conversation going!
              </div>
            )}
          </div>
                </div>
                <div
                className="hidden sm:block">
                    <VerticalDivider />
                </div>
                <div
                className="hidden sm:block sm:w-2/3 lg:w-3/4 min-h-full">
                    {children}
                </div>
            </div>
            }
        </div>
        <div
        className="w-full h-full relative hidden sm:block">
            <div
            className="absolute top-0 left-0 right-0 bottom-0 flex flex-row sm:py-4 py-2 px-4">
                <div
                className="w-full sm:w-1/3 lg:w-1/4 h-full sm:pr-4 flex flex-col gap-3">
                    <ChatTitle />
                    <SearchUser />
                    <div className="w-full h-full flex flex-col gap-2 overflow-y-auto custom-scrollbar">
            {getChatHeadList?.page?.length === 0 ? (
              <div className="text-center text-gray-500 py-4">
                No conversations yet. <br />
                <span className="text-blue-500 font-medium">Search people</span> and start chatting!
              </div>
            ) : (
              getChatHeadList?.page.map((chat) => (
                <ChatHead key={chat._id} chat={chat} />
              ))
            )}

            {/* Load More Button */}
            {getChatHeadList?.continueCursor ? (
              <button
                className="p-2 bg-blue-500 text-white rounded"
                onClick={() =>
                  setPaginationOpts((prev) => ({
                    ...prev,
                    cursor: null, // Fix: Set cursor properly
                  }))
                }
              >
                Load More
              </button>
            ) : (
                getChatHeadList?.page.length && getChatHeadList?.page.length > 0 && (
                <div className="text-center text-gray-500 py-4">
                  🎉 End of chats. Keep the conversation going!
                </div>
              )
            )}
          </div>
                </div>
                <div
                className="hidden sm:block">
                    <VerticalDivider />
                </div>
                <div
                className="hidden sm:block sm:w-2/3 lg:w-3/4 min-h-full">
                    {children}
                </div>
            </div>
        </div>
        </div>
    );
}