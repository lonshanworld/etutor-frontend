"use client"

import { useUserStore } from "@/stores/userStore";

export default function LoginPage(){
    const user = useUserStore((state)=>state.user);
    const login = useUserStore((state)=> state.login);

    return (
        <p>This is login page</p>
    );
}