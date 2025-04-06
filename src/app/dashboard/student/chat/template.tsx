"use client";
import MainChat from "@/components/chat/MainChat";
import { Profile } from "@/model/profile";
import { UserRole } from "@/model/user";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect, useState } from "react";

export default function ChatTeimpelate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [accOwner, setAccOwner] = useState<Profile | null>(null);
  const { user, viewUser } = useUserStore();

  useEffect(() => {
    if (user && user.role !== UserRole.staff) {
      setAccOwner(user);
    } else if (viewUser) {
      setAccOwner(viewUser);
    }
  }, []);
  console.log("user", accOwner);
  return (
    <>{accOwner && <MainChat children={children} userData={accOwner} />}</>
  );
}
