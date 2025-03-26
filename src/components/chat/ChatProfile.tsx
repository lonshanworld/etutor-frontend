"use client";

import { useRouter } from "next/navigation";
import ProfileImageBox from "../ProfileImageBox";
import { IoIosArrowBack } from "react-icons/io";
import ImageBox from "../ImageBox";
import { getOtherChatData } from "@/utils/checkUserChat";
import { useUserStore } from "@/stores/useUserStore";


export default function ChatProfle(
    {
        chat
    } : {
        chat : {
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

    return (
        <>
            {
                user && <div
                className="flex flex-row justify-center items-center gap-3">
                    <IoIosArrowBack
                    onClick={()=>{
                        router.back();
                    }}
                    className="text-4xl mr-4 block sm:hidden" />
                    <ImageBox imageUrl={getOtherChatData(user.id, chat).profileImagePath} />
                    <div
                    className="w-full">
                        <span className="line-clamp-1">{getOtherChatData(user.id, chat).firstName} {getOtherChatData(user.id, chat).middleName} {getOtherChatData(user.id, chat).lastName}</span>
                        <div
                        className="flex flex-row gap-2 justify-start items-center">
                            <div className="bg-green-500 w-3 h-3 rounded-full"></div>
                            <span className="text-xs">Active now</span>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}