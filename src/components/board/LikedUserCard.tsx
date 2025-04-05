"use client";

import Image from "next/image";
import placeholderProfile from "@/assets/images/placeholder-profile.png";
import ProfilePic from "../ProfilePic";

interface Props {
  profilePicUrl: string | null;
  username: string;
}

const LikedUserCard = ({ profilePicUrl, username }: Props) => {
  return (
    <div className='w-full py-2 flex items-center gap-3 px-5'>
      <div className='w-10 h-10 rounded-full overflow-hidden'>
        <ProfilePic
          profileUrl={profilePicUrl}
          size={40}
        />
      </div>
      <div>{username}</div>
    </div>
  );
};

export default LikedUserCard;
