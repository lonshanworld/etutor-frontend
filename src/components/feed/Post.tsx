"use client";

import Image from "next/image";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import placeholderProfile from "@/assets/images/placeholder-profile.png";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useState } from "react";
import { FiFileText } from "react-icons/fi";
import PostComment from "./PostComment";

interface Props {
  profilePic: string;
  username: string;
  time: string;
  title: string;
  content: string;
  contentToggle: boolean;
  imageUrl?: string;
  document?: string;
  likeCount: string;
  commentCount: string;
  onClick?: () => void;
}

const MAX_CONTENT_LENGTH = 150;

const Post = ({
  profilePic,
  username,
  time,
  title,
  content,
  contentToggle = true,
  imageUrl,
  document,
  likeCount,
  commentCount,
  onClick,
}: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleContent = () => setIsExpanded(!isExpanded);

  const contentToDisplay = contentToggle
    ? isExpanded
      ? content
      : `${content.slice(0, MAX_CONTENT_LENGTH)}${
          content.length > MAX_CONTENT_LENGTH ? "..." : ""
        }`
    : content;

  return (
    <div className='bg-white px-6 py-3 rounded-lg'>
      <div className='flex justify-between pb-3'>
        <div className='flex items-center gap-2'>
          <div className='w-12 h-12 rounded-full overflow-hidden'>
            <Image
              src={profilePic || placeholderProfile}
              alt={`${username}'s profile`}
              width={48}
              height={48}
              className='object-cover'
            />
          </div>
          <div className=''>
            <p className='font-semibold text-sm'>{username}</p>
            <p className='text-xs'>{time}</p>
          </div>
        </div>
        <button className='text-gray-500 hover:text-gray-700'>
          <HiOutlineDotsVertical size={20} />
        </button>
      </div>

      {/* Title */}
      {title && <h3 className='text-lg font-semibold pb-1'>{title}</h3>}

      {/* Content text */}
      <p className='text-sm pb-3'>
        {contentToDisplay}
        {contentToggle && content.length > MAX_CONTENT_LENGTH && (
          <button onClick={toggleContent} className='text-theme ml-1 text-sm'>
            {isExpanded ? "Show Less" : "Read More"}
          </button>
        )}
      </p>

      {/* Image */}
      {imageUrl && (
        <div className='pb-3 rounded-lg overflow-hidden'>
          <Image
            src={imageUrl}
            alt='Post image'
            width={600}
            height={300}
            className='rounded-lg w-full max-h-80 object-cover'
          />
        </div>
      )}

      {/* File */}
      {document && (
        <div className=''>
          <div className='bg-gray-100 p-3 rounded-lg flex items-center gap-3 border border-gray-300 mb-3 hover:underline cursor-pointer'>
            <FiFileText className='text-gray-600 text-2xl' />
            {document}
          </div>
        </div>
      )}

      <div className='flex justify-around'>
        <div className='flex items-center gap-3'>
          <span>Like</span> <AiOutlineLike />
          <span className='hover:underline cursor-pointer'>+{likeCount}</span>
        </div>
        <div
          className='flex items-center gap-3 hover:underline cursor-pointer'
          onClick={onClick}
        >
          <span>Comment</span> <FaRegCommentDots />
          <span className='hover:underline cursor-pointer'>
            +{commentCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Post;
