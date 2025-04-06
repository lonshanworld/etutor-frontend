"use client";

import ChatHead from "@/components/chat/ChatHead";
import SearchUser from "@/components/chat/SearchUser";
import VerticalDivider from "@/components/dividers/VerticalDivider";
import { AppRouter } from "@/router";
import { useMutation, usePaginatedQuery, useQuery } from "convex/react";
import { usePathname } from "next/navigation";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { Profile } from "@/model/profile";
import { Cursor } from "convex/server";
import PageTitle from "../PageTitle";


const itemCount = 10;

export default function MainChat({
    children,
    userData,
  }: Readonly<{
    children: React.ReactNode;
    userData : Profile, 
  }>){
    const pathName = usePathname();
    const { results, isLoading,status, loadMore } = usePaginatedQuery(
      api.chatRoom.getConversationsWithLatestMessage, 
      {userId : userData.id}, 
      {initialNumItems: itemCount}
    );

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
                    <PageTitle title="Chat" />
                    {/* <SearchUser /> */}
                    <div className="w-full h-full flex flex-col gap-2 overflow-y-auto custom-scrollbar">
                    {status === "LoadingFirstPage" && <span className="w-full flex justify-center items-center text-gray-500">Loading chats...</span>}

                    {!isLoading && results?.length === 0 ? (
                      <div className="text-center text-gray-500 py-4">
                        No conversations yet. <br />
                        <span className="text-theme font-medium">Search people</span> and start chatting!
                      </div>
                    ) : (
                      results?.map((chat) => <ChatHead key={chat._id} chat={chat} />)
                    )}

                    {/* Load More Button */}
                    {status !== "Exhausted" && (
                      <button
                        className="p-2 bg-theme text-white rounded"
                        onClick={() => loadMore(itemCount)} // Load 10 more chats
                      >
                        Load More
                      </button>
                    )}

                    {/* End of Chats Message */}
                    {!isLoading && status === "Exhausted" && results?.length > 0 && (
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
                    <PageTitle title="Chat" />
                    <SearchUser />
                    <div className="w-full h-full flex flex-col gap-2 overflow-y-auto custom-scrollbar">
                    {status === "LoadingFirstPage" && <p>Loading chats...</p>}

                    {results?.length === 0 ? (
                      <div className="text-center text-gray-500 py-4">
                        No conversations yet. <br />
                        <span className="text-theme font-medium">Search people</span> and start chatting!
                      </div>
                    ) : (
                      results?.map((chat) => <ChatHead key={chat._id} chat={chat} />)
                    )}

                    {/* Load More Button */}
                    {status !== "Exhausted" && (
                      <button
                        className="p-2 bg-theme text-white rounded"
                        onClick={() => loadMore(itemCount)} // Load 10 more chats
                      >
                        Load More
                      </button>
                    )}

                    {/* End of Chats Message */}
                    {status === "Exhausted" && results?.length > 0 && (
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
        </div>
        </div>
    );
}