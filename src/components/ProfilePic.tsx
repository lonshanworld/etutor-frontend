"use client";

import Image from "next/image";
import placeholderProfile from "@/assets/images/placeholder-profile.png";

interface Props {
  profileUrl: string | null;
  size?: number;
  userId?: number;
  onClick?: () => void;
  alt?: string;
  className?: string;
}
const ProfilePic = ({
  className,
  profileUrl,
  size = 40,
  alt,
  userId,
  onClick,
}: Props) => {
  return (
    <div
      className='rounded-full overflow-clip relative'
      style={{ height: `${size}px`, width: `${size}px` }}
    >
      <Image
        src={profileUrl || placeholderProfile}
        alt={alt || "Profile picture"}
        fill
        className={`object-cover ${className}`}
        sizes={`${size}px`}
      />
    </div>
  );
};

export default ProfilePic;
