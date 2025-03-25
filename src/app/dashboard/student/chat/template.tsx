"use client";
import MainChat from "@/components/chat/MainChat";
import { useUserStore } from "@/stores/useUserStore";


export default function ChatTeimpelate({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
        const {user} = useUserStore();
    
    return (
       <MainChat children={children} userData={user!} />
    );
}