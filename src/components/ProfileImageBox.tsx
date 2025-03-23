"use client";
import { useUserStore } from "@/stores/useUserStore";
import Image from "next/image";
import { useRef } from "react";

export default function ProfileImageBox() {
  const { user, profilePopup, setProfilePopup, setIsProfileClicked } =
    useUserStore();
  const profileRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={profileRef}
      className="w-11 h-11 rounded-full bg-secondaryBackground relative overflow-clip cursor-pointer"
      onClick={() => {
        console.log(profilePopup, user);
        setProfilePopup(!profilePopup);
      }}
    >
      <Image
        src={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-pBfUzg3ft35hIK4QEw0w9qA_vYUTpSYWRQ&s"
        }
        fill={true}
        alt="Profile"
        className="absolute object-cover"
      />
    </div>
  );
}
