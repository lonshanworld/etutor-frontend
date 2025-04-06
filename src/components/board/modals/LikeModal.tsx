"use client";

import { RxCross2 } from "react-icons/rx";
import HorizontalDivider from "../../dividers/HorizontalDivider";
import LikedUserCard from "../LikedUserCard";
import { useEffect, useState } from "react";
import { fetchLikedList } from "@/api/services/blogs";
import { Like } from "@/model/blog";
import { useBlogStore } from "@/stores/useBlogStore";

interface Props {
  blogId: number | null;
  likeCount: number;
  likedUserList: Like[];
  onClose: () => void;
}

const LikeModal = ({
  blogId,
  likeCount: initialLikeCount,
  likedUserList,
  onClose,
}: Props) => {
  // const [likeCount, setInitialLikeCount] = useState(initialLikeCount);
  const [users, setUsers] = useState(likedUserList);
  const [loading, setLoading] = useState(false);
  const { likeCounts, setLikeCount } = useBlogStore();

  const likeCount = blogId ? likeCounts[blogId] : initialLikeCount;

  useEffect(() => {
    const FetchLatestLikes = async () => {
      setLoading(true);
      try {
        if (blogId) {
          const response = await fetchLikedList(blogId);
          setUsers(response.likes);
          setLikeCount(blogId, response.likes.length);
        }
      } catch (error) {
        console.error("Error fetching likes:", error);
      } finally {
        setLoading(false);
      }
    };

    FetchLatestLikes();
  }, [blogId]);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-background w-[80%] sm:w-[400px] h-[450px] flex flex-col shadow-cusShadow rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-5 py-2">
          <div className="space-x-1">
            <span>Like</span>
            <span>{likeCount}</span>
          </div>
          <div
            className="cursor-pointer font-bold bg-secondaryBackground hover:bg-gray-400 rounded-full p-2"
            onClick={onClose}
          >
            <RxCross2 size={20} className={`${"text-backgroundOpposite"}`} />
          </div>
        </div>
        <div className="px-2">
          <HorizontalDivider />
        </div>
        <div className="flex flex-col pt-2 overflow-hidden hover:overflow-y-auto max-md:overflow-y-auto max-md:scrollbar-none">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : users.length > 0 ? (
            users.map((likedUser) => (
              <LikedUserCard
                key={likedUser.id}
                profilePicUrl={likedUser.user.profile_picture}
                username={likedUser.user.name}
              />
            ))
          ) : (
            <p className="text-center">No Likes Yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LikeModal;
