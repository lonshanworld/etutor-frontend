"use client";

import Image from "next/image";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { BiCommentDetail } from "react-icons/bi";
import { FiFileText } from "react-icons/fi";
import { VscOpenPreview } from "react-icons/vsc";
import ImageModal from "./modals/ImageModal";
import HorizontalDivider from "../dividers/HorizontalDivider";
import CommentSection from "./comment/CommentSection";
import ImageWithSkeleton from "./loadingskeleton/ImageWithSkeleton";
import PostOptionsMenu from "./modals/PostOptionMenu";

interface Props {
  isDetail: boolean;
  profilePic: string;
  username: string;
  time: string;
  title: string;
  content: string;
  contentToggle?: boolean;
  imageUrls?: string[];
  documentUrls?: string[];
  isLiked: boolean;
  likeCount: number;
  commentCount: number;
  comments?: [];
  viewDetail?: () => void;
  handleLike: () => void; // Fix: change the prop type for handleLike
  viewLike?: () => void;
}

const MAX_CONTENT_LENGTH = 300;

const UserPost = ({
  isDetail = false,
  profilePic,
  username,
  time,
  title,
  content,
  contentToggle = true,
  imageUrls = [],
  documentUrls = [],
  isLiked,
  likeCount,
  commentCount,
  comments = [],
  viewDetail,
  handleLike,
  viewLike,
}: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  // To toggle content expansion
  const toggleContent = () => setIsExpanded(!isExpanded);

  // Truncate content if necessary
  const contentToDisplay = contentToggle
    ? isExpanded
      ? content
      : `${content.slice(0, MAX_CONTENT_LENGTH)}${
          content.length > MAX_CONTENT_LENGTH ? "..." : ""
        }`
    : content;

  // Image navigation functions
  const prevImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const nextImage = () => {
    if (
      selectedImageIndex !== null &&
      selectedImageIndex < imageUrls.length - 1
    ) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  // Close modal
  const closeModal = () => setSelectedImageIndex(null);

  // Handle keyboard events (Left, Right, Escape)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedImageIndex !== null) {
        if (event.key === "ArrowLeft") prevImage();
        if (event.key === "ArrowRight") nextImage();
        if (event.key === "Escape") closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex]);

  return (
    <div
      className={`bg-background pt-4 ${
        isDetail ? "" : "shadow md:rounded-lg rounded-xl"
      }`}
    >
      {/* Header Section */}
      <div className='flex justify-between pb-3 mx-4'>
        <div className='flex items-center gap-2'>
          <div className='w-11 h-11 rounded-full overflow-hidden'>
            <Image
              src={profilePic}
              alt={`${username}'s profile`}
              width={48}
              height={48}
              className='object-cover'
            />
          </div>
          <div>
            <p className='font-semibold text-primaryText'>{username}</p>
            <p className='text-xs text-gray-500'>{time}</p>
          </div>
        </div>
        <PostOptionsMenu
          onEdit={() => undefined}
          onDelete={() => undefined}
        />
      </div>

      {/* Post Content */}
      <div className='mb-2'>
        <div className='mx-4 text-primaryText'>
          {/* Title */}
          {title && <h3 className='text-lg font-semibold pb-1'>{title}</h3>}

          {/* Content text */}
          <p className='text-sm pb-3'>
            {contentToDisplay}
            {contentToggle && content.length > MAX_CONTENT_LENGTH && (
              <button
                onClick={toggleContent}
                className='text-theme ml-1 text-sm hover:underline'
              >
                {isExpanded ? "Show Less" : "Read More"}
              </button>
            )}
          </p>
        </div>

        {/* Image Gallery */}
        {!isDetail ? (
          imageUrls.length > 0 && (
            <div
              className={`sm:mx-4 grid gap-1 mb-3 ${
                imageUrls.length === 1
                  ? "grid-cols-1"
                  : imageUrls.length === 2
                  ? "grid-cols-2"
                  : imageUrls.length === 3
                  ? "grid-cols-2 grid-rows-2"
                  : "grid-cols-2"
              }`}
            >
              {imageUrls.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  className={`cursor-pointer overflow-hidden md:rounded-md relative ${
                    imageUrls.length === 3 && index === 0 ? "col-span-2" : ""
                  }
                    ${
                      imageUrls.length > 2
                        ? "md:h-[250px] h-[200px]"
                        : "md:h-[400px] h-[300px]"
                    }`}
                  onClick={() => {
                    if (imageUrls.length > 4 && index === 3) return;
                    setSelectedImageIndex(index);
                  }}
                >
                  <ImageWithSkeleton
                    src={image}
                    alt={`Post image ${index + 1}`}
                  />

                  {index === 3 && imageUrls.length > 4 && (
                    <div
                      className='absolute z-2 inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-2xl font-semibold'
                      onClick={viewDetail}
                    >
                      +{imageUrls.length - 4}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
        ) : (
          <div className='grid grid-cols-1 gap-1'>
            {imageUrls.map((image, index) => (
              <div
                key={index}
                className='cursor-pointer overflow-hidden'
                onClick={() => setSelectedImageIndex(index)}
              >
                <Image
                  src={image}
                  alt=''
                  width={0}
                  height={0}
                  sizes='100vw'
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Attachments */}
        {documentUrls.length > 0 && (
          <div className='mx-4 py-2'>
            <p className='text-secondaryText pb-2 font-semibold'>Attachments</p>
            <div className='grid grid-cols-2 gap-5'>
              {documentUrls.map((doc, index) => (
                <div
                  key={index}
                  className='bg-boardFile shadow-sm rounded-sm p-3 flex items-center justify-between gap-3 border cursor-pointer h-12'
                >
                  <div className='flex gap-2 min-w-0 items-center'>
                    <FiFileText
                      size={24}
                      className='text-gray-600 flex-shrink-0'
                    />
                    <div className='truncate w-full overflow-hidden whitespace-nowrap text-ellipsis'>
                      {doc}
                    </div>
                  </div>
                  <BsThreeDots
                    color='gray'
                    className='flex-shrink-0'
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Like and comment counts */}
      <div className='mx-4 mb-2 select-none'>
        <div className='flex items-center justify-between text-sm text-primaryText'>
          <div
            className='flex items-center hover:underline cursor-pointer'
            onClick={viewLike}
          >
            <AiOutlineLike size={20} />
            <div className='pl-1'>
              {isLiked
                ? likeCount === 1
                  ? "You"
                  : `You and ${likeCount - 1} others`
                : likeCount}
            </div>
          </div>

          <div className='flex items-center hover:underline cursor-pointer'>
            <span>
              {commentCount} {commentCount > 1 ? "Comments" : "Comment"}
            </span>
          </div>
        </div>
      </div>

      <HorizontalDivider />

      {/* Like and comment button */}
      <div className='flex py-3 justify-between mx-4 select-none'>
        <div className='flex gap-10'>
          {/* Like btn */}
          <div
            className='flex items-center gap-1 cursor-pointer text-secondaryText'
            onClick={handleLike}
          >
            {isLiked ? (
              <AiFillLike
                color='teal'
                size={20}
              />
            ) : (
              <AiOutlineLike size={20} />
            )}
            <span className='font-semibold'>Like</span>
          </div>
          {/* Comment btn */}
          <div
            className='flex items-center gap-1 cursor-pointer text-secondaryText'
            onClick={isDetail ? undefined : viewDetail}
          >
            <BiCommentDetail size={20} />
            <span className='font-semibold'>Comment</span>
          </div>
        </div>

        {!isDetail && (
          <div
            className='flex items-center gap-1 cursor-pointer text-secondaryText'
            onClick={viewDetail}
          >
            <VscOpenPreview size={20} />
            <span className='font-semibold'>View Full Post</span>
          </div>
        )}
      </div>
      {isDetail && <HorizontalDivider />}

      {isDetail && <CommentSection comments={comments} />}

      <ImageModal
        imageUrls={imageUrls}
        selectedIndex={selectedImageIndex}
        onClose={closeModal}
        onPrev={prevImage}
        onNext={nextImage}
      />
    </div>
  );
};

export default UserPost;
