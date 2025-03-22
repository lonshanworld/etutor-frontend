"use client";

import { RxCross2 } from "react-icons/rx";
import HorizontalDivider from "../../dividers/HorizontalDivider";
import LikedUserCard from "../LikedUserCard";

interface Props {
  likeCount: number;
  likedUserList: {
    id: number;
    profilePic: string;
    username: string;
  }[];
  onClose: () => void;
}

const LikeModal = ({ likeCount, likedUserList, onClose }: Props) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50'>
      <div className='bg-background w-[80%] sm:w-[400px]  min-h-40 max-h-[600px] flex flex-col shadow-cusShadow rounded-lg overflow-hidden'>
        <div className='flex items-center justify-between px-5 py-3'>
          <div>Likes {likeCount}</div>
          <div
            className='cursor-pointer font-bold bg-secondaryBackground hover:bg-gray-400 rounded-full p-2'
            onClick={onClose}
          >
            <RxCross2
              size={20}
              className={`${"text-backgroundOpposite"}`}
            />
          </div>
        </div>
        <div className='px-2'>
          {" "}
          <HorizontalDivider />
        </div>
        <div className='flex flex-col pt-2 overflow-hidden hover:overflow-y-auto max-md:overflow-y-auto max-md:scrollbar-none'>
          {likedUserList.length > 0 ? (
            likedUserList.map((likedUser) => (
              <LikedUserCard
                key={likedUser.id}
                profilePicUrl={likedUser.profilePic}
                username={likedUser.username}
              />
            ))
          ) : (
            <p className=''>No like yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LikeModal;
