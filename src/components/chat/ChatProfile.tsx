"use client";

import { useRouter } from "next/navigation";
import ProfileImageBox from "../ProfileImageBox";
import { IoIosArrowBack } from "react-icons/io";
import ImageBox from "../ImageBox";
import { useUserStore } from "@/stores/useUserStore";
import { useChatProfileListStore } from "@/stores/useChatListProfile";
import { useEffect, useState } from "react";
import { ChatUserProfile } from "@/model/chatUserProfile";
import { formatName } from "@/utils/formatData";
import { getLastActiveAgo } from "@/api/services/activityLog";


export default function ChatProfle(
    {
        chat
    } : {
        chat : {
            _id: string;
            _creationTime: number;
            user1Id : number;
            user2Id: number;
        }
    }
){
    const router = useRouter();
    const {user} = useUserStore();
    const {getOneProfileById} = useChatProfileListStore();
    const [otherUserProfile, setOtherUserProfile] = useState<ChatUserProfile>();
    const [activeAgo,setActiveAgo] = useState<string>();

    useEffect(()=>{
            const fetchData = async()=>{
                if(chat && user){
                    const otherUserId = chat.user1Id === user.id ? chat.user2Id : chat.user1Id;
                    const otherUserProfile = getOneProfileById(otherUserId);
                    const time = await getLastActiveAgo(otherUserId);
                    setActiveAgo(time);
                    setOtherUserProfile(otherUserProfile);
                }
            }
    
            fetchData();
    },[])

    return (
        <>
            {
                user && otherUserProfile && <div
                className="flex flex-row justify-center items-center gap-3">
                    <IoIosArrowBack
                    onClick={()=>{
                        router.back();
                    }}
                    className="text-4xl mr-4 block sm:hidden" />
                    <ImageBox imageUrl={otherUserProfile.profile_picture} />
                    <div
                    className="w-full">
                        <span className="line-clamp-1">{formatName(otherUserProfile.first_name, otherUserProfile.middle_name, otherUserProfile.last_name)}</span>
                        <div
                        className="flex flex-row gap-2 justify-start items-center">
                           
                           {
                            otherUserProfile && activeAgo &&  <>
                             <div className={`${activeAgo === "Active now" ? "bg-green-500" : "bg-red-500"} w-3 h-3 rounded-full`}></div>
                                <span className="text-xs">{ activeAgo}</span>
                            </>
                           }
                        </div>
                    </div>
                </div>
            }
        </>
    );
}