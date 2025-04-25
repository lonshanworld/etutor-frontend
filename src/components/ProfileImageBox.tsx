"use client";
import { useUserStore } from "@/stores/useUserStore";
import Image from "next/image";
import { useRef, useState } from "react";
import ProfilePopup from "./userProfile/ProfilePopup";
import UserProfile from "./userProfile/UserProfile";
import { FaUserCircle } from "react-icons/fa";

export default function ProfileImageBox() {
  const { user } = useUserStore();
  const profileRef = useRef<HTMLDivElement>(null);
  const [profilePopup, setProfilePopup] = useState(false);
  const [profileDetailPopup, setProfileDetailPopup] = useState(false);
  return (
    <div>
      <div
        ref={profileRef}
        className="w-11 h-11 rounded-full bg-transparent relative overflow-clip cursor-pointer"
        onClick={() => {
          setProfilePopup(!profilePopup);
        }}
      >
        {user?.profileImagePath ? (
          <Image
            src={user.profileImagePath}
            alt="Profile"
            fill={true}
            className="absolute object-cover"
          />
        ) : (
          <FaUserCircle className="text-lg w-full h-full text-theme" />
        )}
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
