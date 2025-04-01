"use client";

import Image from "next/image";

interface Props {
  profileUrl: string;
  size?: number;
}
const ProfilePic = ({ profileUrl, size = 40 }: Props) => {
  return (
    <div
      className={`h-[${size}px] w-[${size}px] rounded-full overflow-hidden `}
    >
      <Image
        src={profileUrl}
        alt=''
        width={size}
        height={size}
      />
    </div>
  );
};

export default ProfilePic;
