"use client";

import Image from "next/image";
import placeholderProfile from "@/assets/images/placeholder-profile.png";

interface Props {
  username: string;
  profilePic: string | null;
  time: string;
  comment: string;
}
const CommentCard = ({ username, profilePic, time, comment }: Props) => {
  return (
    <div className='py-3'>
      <div className='flex gap-4'>
        <div className='w-10 h-10 rounded-full overflow-hidden'>
          <Image
            src={profilePic || placeholderProfile}
            alt={`${username}'s profile`}
            width={40}
            height={40}
            className='object-cover'
          />
        </div>

        <div className='w-10/12 flex flex-col'>
          <div className='flex gap-2 items-center pb-3'>
            <p className='font-semibold'>{username}</p>
            <p className='text-xsm'>{time}</p>
          </div>
          <div className='bg-boardFile p-2 rounded-sm break-words'>
            {comment}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
