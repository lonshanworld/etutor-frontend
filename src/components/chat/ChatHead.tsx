"use client";

import { useRouter } from "next/navigation";
import ProfileImageBox from "../ProfileImageBox";
import { AppRouter } from "@/router";
import { checkExist, formatTimestamp } from "@/lib/utils";
import ImageBox from "../ImageBox";
import { useUserStore } from "@/stores/useUserStore";
import { getOtherChatData } from "@/utils/checkUserChat";



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
            user1: {
                userId : number;
                firstName : string;
                middleName? : string | null;
                lastName? :string | null;
                email : string;
                role : string;
                profileImagePath? : string | null;
                gender? : string | null;
            };
            user2: {
                userId : number;
                firstName : string;
                middleName? : string | null;
                lastName? :string | null;
                email : string;
                role : string;
                profileImagePath? : string | null;
                gender? : string | null;
            };
        }
    }
){
    const router = useRouter();
    const {user} = useUserStore();

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

    return (
        <>
            {
                user && <>
                    <button
            onClick={()=>{
                router.push(`${AppRouter.studentChatBox}?id=${chat._id}`);
            }}
            className="flex sm:hidden flex-row justify-center items-center hover:bg-gray-400 hover:bg-opacity-30 px-3 py-2 rounded-l-xl hover:border-r-[6px] border-theme">
                <div
                className="w-11 h-11">
                <ImageBox imageUrl={getOtherChatData(user.id, chat).profileImagePath} />
                </div>
                <div className="w-full pl-2">
                    <div
                    className="flex flex-row justify-between items-center gap-3">
                        <span className="text-start w-full text-base line-clamp-1">{getOtherChatData(user.id, chat).firstName} {getOtherChatData(user.id, chat).middleName} {getOtherChatData(user.id, chat).lastName}</span>
                        <div
                        className="flex flex-row justify-end items-center gap-2">
                            <span className={`text-xss text-nowrap capitalize ${getColorRole(getOtherChatData(user.id,chat).role)}`}>{getOtherChatData(user.id, chat).role.toString()}</span>
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
                 <ImageBox imageUrl={getOtherChatData(user.id, chat).profileImagePath} />
                </div>
                <div className="w-full pl-2">
                    <div
                    className="flex flex-row justify-between items-center gap-3">
                        <span className="text-start text-base line-clamp-1 w-full">{getOtherChatData(user.id, chat).firstName}</span>
                        <div
                        className="flex flex-row justify-end items-center gap-1">
                            <span className={`text-xss text-nowrap capitalize ${getColorRole(getOtherChatData(user.id,chat).role.toString())}`}>{getOtherChatData(user.id, chat).role.toString()}</span>
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