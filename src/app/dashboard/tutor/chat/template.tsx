"use client";
import MainChat from "@/components/chat/MainChat";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect } from "react";


export default function ChatTeimpelate({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
        const {user} = useUserStore();
        
    return (
      <>
        {
          user && <MainChat children={children} userData={user} />
        }
      </>
    );
}