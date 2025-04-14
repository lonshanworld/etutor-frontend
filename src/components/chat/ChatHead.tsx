"use client";

import { useRouter } from "next/navigation";
import ProfileImageBox from "../ProfileImageBox";
import { AppRouter } from "@/router";
import { checkExist, formatTimestamp } from "@/lib/utils";
import ImageBox from "../ImageBox";
import { useUserStore } from "@/stores/useUserStore";
import { useChatProfileListStore } from "@/stores/useChatListProfile";
import { useEffect, useState } from "react";
import { ChatUserProfile } from "@/model/chatUserProfile";
import { formatName } from "@/utils/formatData";



export default function ChatHead(
    {
        chat
    } : {
        chat : {
            latestMessage: {
                _id: string;
                _creationTime: number;
                context?: string | undefined;
                fileUrls?: string[] | undefined;
                deleted_at?: number | undefined;
                conversation_id: string;
                sender_id: number;
                is_read: boolean;
            } | null;
            _id: string;
            _creationTime: number;
            user1Id: number;
            user2Id: number;
        },
    }
){
    const router = useRouter();
    const {user} = useUserStore();
    const {getOneProfileById} = useChatProfileListStore();
    const [otherUserProfile, setOtherUserProfile] = useState<ChatUserProfile>();

    function getColorRole(value : string) : string{
        console.log("check value role", value);
        switch(value.toLowerCase()){
            case "student":
                return "text-chatStudent";
            case "tutor":
                return "text-chatTutor";
            default:
                return "text-font";
        }
    }

    useEffect(()=>{
        const fetchData = async()=>{
            if(chat && user){
                const otherUserId = chat.user1Id === user.id ? chat.user2Id : chat.user1Id;
                const otherUserProfile = getOneProfileById(otherUserId);
                setOtherUserProfile(otherUserProfile);
            }
        }

        fetchData();
    },[])

    return (
        <>
            {
                user && (otherUserProfile !== null && otherUserProfile !== undefined) && <>
                    <button
            onClick={()=>{
                console.log("user role", user.role);
                if(user.role === "student"){
                    router.push(`${AppRouter.studentChatBox}?id=${chat._id}`);
                }else if(user.role === "tutor"){
                    router.push(`${AppRouter.tutorChatBox}?id=${chat._id}`);
                }
            }}
            className="flex sm:hidden flex-row justify-center items-center hover:bg-gray-400 hover:bg-opacity-30 px-3 py-2 rounded-l-xl hover:border-r-[6px] border-theme">
                <div
                className="w-11 h-11">
                <ImageBox imageUrl={otherUserProfile.profile_picture} />
                </div>
                <div className="w-full pl-2">
                    <div
                    className="flex flex-row justify-between items-center gap-3">
                        <span className="text-start w-full text-base line-clamp-1">{formatName(otherUserProfile.first_name, otherUserProfile.middle_name, otherUserProfile.last_name)}</span>
                        <div
                        className="flex flex-row justify-end items-center gap-2">
                            <span className={`text-xss text-nowrap capitalize ${getColorRole(otherUserProfile.role.name)}`}>{otherUserProfile.role.name.toString()}</span>
                            <div
                            className="w-[2px] h-4 bg-black rounded-t-full rounded-b-full"></div>
                            <span className="text-xss text-nowrap opacity-50">{chat.latestMessage ? formatTimestamp(chat.latestMessage._creationTime).time : formatTimestamp(chat._creationTime).time}</span>
                        </div>
                    </div>
                    {
                        chat.latestMessage && <span className={`text-sm text-start line-clamp-1 w-full ${chat.latestMessage.deleted_at ? "text-red-500" : "text-font"}`}>{chat.latestMessage.context ? chat.latestMessage.context : (chat.latestMessage.fileUrls && chat.latestMessage.fileUrls.length > 0) ? "File -" : " -- "}</span>
                    }
                </div>
            </button>
            <button
            onClick={()=>{
                router.push(`${AppRouter.studentChatBox}?id=${chat._id}`);
            }}
            className="hidden sm:flex flex-row justify-center items-center hover:bg-gray-400 hover:bg-opacity-30 px-3 py-2 rounded-l-xl hover:border-r-[6px] border-theme">
                <div
                className="w-11 h-11">
                 <ImageBox imageUrl={otherUserProfile.profile_picture} />
                </div>
                <div className="w-full pl-2">
                    <div
                    className="flex flex-row justify-between items-center gap-3">
                        <span className="text-start text-base line-clamp-1 w-full">{formatName(otherUserProfile.first_name, otherUserProfile.middle_name, otherUserProfile.last_name)}</span>
                        <div
                        className="flex flex-row justify-end items-center gap-1">
                            <span className={`text-xss text-nowrap capitalize ${getColorRole(otherUserProfile.role.name)}`}>{otherUserProfile.role.name.toString()}</span>
                            <div
                            className="w-[2px] h-4 bg-black rounded-t-full rounded-b-full"></div>
                            <span className="text-end text-xss text-nowrap opacity-50">{chat.latestMessage ? formatTimestamp(chat.latestMessage._creationTime).time : formatTimestamp(chat._creationTime).time}</span>
                        </div>
                    </div>
                    {
                        chat.latestMessage && <span className={`text-sm text-start line-clamp-1 w-full ${chat.latestMessage.deleted_at ? "text-red-500" : "text-font"}`}>{chat.latestMessage.context ? chat.latestMessage.context : (chat.latestMessage.fileUrls && chat.latestMessage.fileUrls.length > 0) ? "File -" : " -- "}</span>
                    }
                </div>
            </button>
                </>
            }
        </>
    );
}