"use client";

import { useRouter } from "next/navigation";
import ProfileImageBox from "../ProfileImageBox";
import { IoIosArrowBack } from "react-icons/io";


export default function ChatProfle(){
    const router = useRouter();

    return (
        <div
        className="flex flex-row justify-center items-center gap-3">
            <IoIosArrowBack
            onClick={()=>{
                router.back();
            }}
            className="text-4xl mr-4 block sm:hidden" />
            <ProfileImageBox />
            <div
            className="w-full">
                <span className="line-clamp-1">Mg Mg</span>
                <div
                className="flex flex-row gap-2 justify-start items-center">
                    <div className="bg-green-500 w-3 h-3 rounded-full"></div>
                    <span className="text-xs">Active now</span>
                </div>
            </div>
        </div>
    );
}