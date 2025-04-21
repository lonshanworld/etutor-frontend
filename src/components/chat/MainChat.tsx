"use client";

import ChatHead from "@/components/chat/ChatHead";
import SearchUser from "@/components/chat/SearchUser";
import VerticalDivider from "@/components/dividers/VerticalDivider";
import { AppRouter } from "@/router";
import { usePaginatedQuery } from "convex/react";
import { usePathname } from "next/navigation";
import { api } from "../../../convex/_generated/api";
import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { Profile } from "@/model/profile";
import PageTitle from "../PageTitle";

import { useChatProfileListStore } from "@/stores/useChatListProfile";
import AuthenticatedChat from "./AuthenticateChat";


const itemCount = 10;

export default function MainChat({
    children,
    ownerData,
  }: Readonly<{
    children: React.ReactNode;
    ownerData : Profile, 
  }>){
    const pathName = usePathname();
    const { results, isLoading,status, loadMore } = usePaginatedQuery(api.chatRoom.getConversationsWithLatestMessage,
      { userId : ownerData.id },            // your query args (without paginationOpts)
      { initialNumItems: itemCount } // pagination config
    );
    const [chatLoading, setChatLoading] = useState(true);
    const {updateProfieList}= useChatProfileListStore();
    const {user} = useUserStore();

    useEffect(()=>{
      const fetchData = async()=>{
        console.log("check chat result here", results);
        console.log("check user why null", ownerData);
        if(results && results.length > 0){
          
          try{
            setChatLoading(true);
            const userIds = results.map((chat) => 
              chat.user1Id === ownerData.id ? chat.user2Id : chat.user1Id
            );
            await updateProfieList(userIds);
          }catch(err){
            console.error("Error fetching data:", err);
          }finally{
            setChatLoading(false);
          }
        }
      }

      fetchData();
    },[isLoading])

    return (
        <>
          {
            (user?.id === ownerData.id) 
            ? 
            <>
              {
                (chatLoading === false) &&  <div
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
              }
            </>
            :
            <AuthenticatedChat  />
          }
        </>
    );
}