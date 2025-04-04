"use client";

import Image from "next/image";
import placeholderProfile from "@/assets/images/placeholder-profile.png";

interface Props {
  profileUrl: string | null;
  size?: number;
  userId?: number;
  onClick?: () => void;
}
const ProfilePic = ({ profileUrl, size = 40, userId, onClick }: Props) => {
  return (
    <div
      className={`h-[${size}px] w-[${size}px] rounded-full overflow-hidden `}
    >
      <Image
        src={profileUrl || placeholderProfile}
        alt='profile picture'
        width={size}
        height={size}
        className='object-cover'
      />
    </div>
  );
};

export default ProfilePic;
