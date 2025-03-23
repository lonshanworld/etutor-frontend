"use client";

import Image from "next/image";

interface Props {
  profilePicUrl: string;
  username: string;
}

const LikedUserCard = ({ profilePicUrl, username }: Props) => {
  return (
    <div className='w-full py-2 flex items-center gap-3 px-4'>
      <div className='w-10 h-10 rounded-full overflow-hidden'>
        <Image
          src={profilePicUrl}
          alt={`${username} profile picture`}
          width={40}
          height={40}
          className='object-cover'
        />
      </div>
      <div>{username}</div>
    </div>
  );
};

export default LikedUserCard;
