"use client";

import Image from "next/image";
import placeholderProfile from "@/assets/svgs/default-profile.svg";

interface Props {
  profileUrl: string | null;
  size?: number;
  alt?: string;
  className?: string;
}
const ProfilePic = ({ className, profileUrl, size = 40, alt }: Props) => {
  return (
    <div
      className='rounded-full overflow-clip relative select-none'
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
