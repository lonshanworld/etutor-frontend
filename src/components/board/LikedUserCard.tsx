"use client";

import { useState } from "react";
import ProfileBoxPopup from "../popup/ProfileBoxPopup";
import ProfilePic from "../ProfilePic";

interface Props {
  userId: number;
  profilePicUrl: string | null;
  username: string;
}

const LikedUserCard = ({ userId, profilePicUrl, username }: Props) => {
  const [profilePopup, setProfilePopup] = useState(false);

  return (
    <div className='w-full py-2 flex items-center gap-3 px-5'>
      <div className=''>
        <div
          onClick={() => setProfilePopup(true)}
          className='w-10 h-10 rounded-full overflow-hidden cursor-pointer'
        >
          <ProfilePic
            profileUrl={profilePicUrl}
            size={40}
          />
        </div>
        {profilePopup && userId && (
          <ProfileBoxPopup
            userId={userId}
            onClose={() => setProfilePopup(false)}
          />
        )}
      </div>
      <div>{username}</div>
    </div>
  );
};

export default LikedUserCard;
