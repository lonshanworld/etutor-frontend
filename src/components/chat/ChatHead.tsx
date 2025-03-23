"use client";

import { useRouter } from "next/navigation";
import ProfileImageBox from "../ProfileImageBox";
import { AppRouter } from "@/router";

export default function ChatHead(){
    const router = useRouter();

    return (
        <>
            <button
            onClick={()=>{
                router.push(AppRouter.studentChatBox)
            }}
            className="flex sm:hidden flex-row justify-center items-center hover:bg-gray-400 hover:bg-opacity-30 px-3 py-2 rounded-l-xl hover:border-r-[6px] border-theme">
                <div
                className="w-11 h-11">
                <ProfileImageBox />
                </div>
                <div className="w-full pl-2">
                    <div
                    className="flex flex-row justify-between items-center gap-3">
                        <span className="text-start w-full text-base line-clamp-1">Mg Mg fd gfd egdfgdsg sd dfgdsg</span>
                        <span className="text-xss w-20 opacity-50">07:40 pm</span>
                    </div>
                    <span className="text-sm line-clamp-1 w-full">hello 12334 dk;fj f;dfj s;dfjk ;fgd sg sgdf sgs dg ebe terv re rt etret t t retet3 tete345erget</span>
                </div>
            </button>
            <button
            onClick={()=>{
                router.push(AppRouter.studentChatBox)
            }}
            className="hidden sm:flex flex-row justify-center items-center hover:bg-gray-400 hover:bg-opacity-30 px-3 py-2 rounded-l-xl hover:border-r-[6px] border-theme">
                <div
                className="w-11 h-11">
                <ProfileImageBox />
                </div>
                <div className="w-full pl-2">
                    <div
                    className="flex flex-row justify-between items-center gap-3">
                        <span className="text-start text-base line-clamp-1 w-full">Mg Mg fd gfd egdfgdsg sd dfgdsg</span>
                        <span className="text-end text-xss w-16 opacity-50">07:40 pm</span>
                    </div>
                    <span className="text-sm line-clamp-1 w-full">hello 12334 dk;fj f;dfj s;dfjk ;fgd sg sgdf sgs dg ebe terv re rt etret t t retet3 tete345erget</span>
                </div>
            </button>
        </>
    );
}