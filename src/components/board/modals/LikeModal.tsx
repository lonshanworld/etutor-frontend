"use client";

import { RxCross2 } from "react-icons/rx";
import HorizontalDivider from "../../dividers/HorizontalDivider";
import LikedUserCard from "../LikedUserCard";
import { useEffect, useState } from "react";
import { fetchLikedList } from "@/api/services/blogs";

interface Props {
  blogId: number | null;
  likeCount: number;
  likedUserList: {
    likeId: number;
    userId: number;
    profilePic: string | null;
    name: string;
  }[];
  onClose: () => void;
}

const LikeModal = ({ blogId, likeCount, likedUserList, onClose }: Props) => {
  const [users, setUsers] = useState(likedUserList); // Local state for likes
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const FetchLatestLikes = async () => {
      setLoading(true);
      try {
        if (blogId) {
          const response = await fetchLikedList(blogId);
          setUsers(response.likes);
        }
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
      setLoading(false);
    };

    FetchLatestLikes();
  }, [blogId]);

  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50'>
      <div className='bg-background w-[80%] sm:w-[400px] h-[450px] flex flex-col shadow-cusShadow rounded-lg overflow-hidden'>
        <div className='flex items-center justify-between px-5 py-2'>
          <div className='space-x-1'>
            <span>Like</span>
            <span>{likeCount}</span>
          </div>
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
          <HorizontalDivider />
        </div>
        <div className='flex flex-col pt-2 overflow-hidden hover:overflow-y-auto max-md:overflow-y-auto max-md:scrollbar-none'>
          {loading ?
            <p className='text-center'>Loading...</p>
          : users.length > 0 ?
            users.map((likedUser) => (
              <LikedUserCard
                key={likedUser.likeId}
                profilePicUrl={likedUser.profilePic}
                username={likedUser.name}
              />
            ))
          : <p className='text-center'>No Likes Yet</p>}
        </div>
      </div>
    </div>
  );
};

export default LikeModal;
