"use client";

import { useRouter } from "next/navigation";

export default function ClickMore(
    {
        routeString ,
    } : {
        routeString : string,
    }
){
    const router = useRouter();

    return (
        <div
                  className="flex justify-end items-end">
                    <button
                    className="text-end mr-20 text-theme underline underline-offset-1"
                    onClick={()=>router.push(routeString)} 
                    >{"More >>>"}</button>
                  </div>
    );
}