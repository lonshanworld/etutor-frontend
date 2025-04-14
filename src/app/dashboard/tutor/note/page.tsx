"use client";

import AuthenticatedChat from "@/components/chat/AuthenticateChat";
import Note from "@/components/note/Note";
import { Profile } from "@/model/profile";
import { UserRole } from "@/model/user";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect, useState } from "react";

export default function NotePage(){
      const [accOwner, setAccOwner] = useState<Profile | null>(null);
      const { user, viewUser } = useUserStore();
    
      useEffect(() => {
        if (user && user.role !== UserRole.staff) {
          setAccOwner(user);
        } else if (viewUser) {
          setAccOwner(viewUser);
        }
      }, [user]);
    return (
        <>
            {
                (accOwner?.id === user?.id) 
                ?
                <Note /> 
                :
                <AuthenticatedChat />
            }
        </>
    );
}