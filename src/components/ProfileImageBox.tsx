"use client";
import { useUserStore } from "@/stores/useUserStore";
import Image from "next/image";
import { useRef, useState } from "react";
import ProfilePopup from "./userProfile/ProfilePopup";
import UserProfile from "./userProfile/UserProfile";

export default function ProfileImageBox() {
  const { user } = useUserStore();
  const profileRef = useRef<HTMLDivElement>(null);
  const [profilePopup, setProfilePopup] = useState(false);
  const [profileDetailPopup, setProfileDetailPopup] = useState(false);

  return (
    <div>
      <div
        ref={profileRef}
        className="w-11 h-11 rounded-full bg-secondaryBackground relative overflow-clip cursor-pointer"
        onClick={() => {
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
      {profilePopup && (
        <ProfilePopup
          setProfilePopup={setProfilePopup}
          profileDetailPopup={profileDetailPopup}
          setProfileDetailPopup={setProfileDetailPopup}
        />
      )}
      {profileDetailPopup && (
        <UserProfile
          profileData={user}
          setProfileDetailPopup={setProfileDetailPopup}
        />
      )}
    </div>
  );
}
