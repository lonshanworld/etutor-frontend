"use client";

import ProfileBoxPopup from "@/components/popup/ProfileBoxPopup";
import ProfilePic from "@/components/ProfilePic";
import { useState } from "react";

interface Props {
  userId?: number;
  username: string;
  profilePic: string | null;
  time: string;
  comment: string;
  isSending?: boolean;
}
const CommentCard = ({
  userId,
  username,
  profilePic,
  time,
  comment,
  isSending = false,
}: Props) => {
  const [profilePopup, setProfilePopup] = useState(false);

  return (
    <div className='py-3'>
      <div className='flex gap-4'>
        <div className='relative'>
          <div
            className='w-10 h-10 rounded-full overflow-hidden cursor-pointer'
            onClick={() => setProfilePopup(true)}
          >
            <ProfilePic
              profileUrl={profilePic}
              size={40}
              alt={`${username} profile picture`}
            />
          </div>
          {profilePopup && userId && (
            <ProfileBoxPopup
              className='sm:left-16 max-sm:top-12'
              userId={userId}
              onClose={() => setProfilePopup(false)}
            />
          )}
        </div>

        <div className='w-10/12 flex flex-col'>
          <div className='flex gap-2 items-center pb-3'>
            <p className='font-semibold'>{username}</p>
            <p className='text-xsm'>{time}</p>
          </div>
          <div className='flex'>
            <div className='bg-boardFile px-4 py-1.5 break-words rounded-xl'>
              {comment}
            </div>
          </div>
          {isSending && (
            <p className='text-gray-400 text-xs italic mt-1'>sending...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
