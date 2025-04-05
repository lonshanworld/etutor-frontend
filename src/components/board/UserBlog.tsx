"use client";

import placeholderProfile from "@/assets/images/placeholder-profile.png";
import { Comment, File, Like } from "@/model/blog";
import { getFileType } from "@/utils/classifyFiles";
import { formatTime } from "@/utils/formatData";
import Image from "next/image";
import { forwardRef, useEffect, useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { MdOutlineFileDownload } from "react-icons/md";
import { VscOpenPreview } from "react-icons/vsc";
import HorizontalDivider from "../dividers/HorizontalDivider";
import CommentSection from "./comment/CommentSection";
import FileIcon from "./FileIcon";
import ImageWithSkeleton from "./loadingskeleton/ImageWithSkeleton";
import MediaModal from "./modals/MediaModal";
import PostOptionsMenu from "./modals/PostOptionMenu";
import { useBlogStore } from "@/stores/useBlogStore";
import { giveLike } from "@/api/services/blogs";

interface Props {
  blogId: number;
  profilePic: string | null;
  username: string;
  time: string;
  title: string;
  text: string;
  files: File[];
  likes: Like[];
  likeCount: number;
  commentCount: number;
  comments: Comment[];
  isLiked: boolean;
  isOwnBlog: boolean;
  isDetail: boolean;
  contentToggle?: boolean;
  viewDetail?: () => void;
  handleLike?: () => void;
  viewLike?: () => void;
  onDelete: () => void;
}

const MAX_CONTENT_LENGTH = 200;

const UserBlog = forwardRef<HTMLDivElement, Props>(
  (
    {
      blogId,
      profilePic,
      username,
      time,
      title,
      text,
      files = [],
      likeCount: initialLikeCount = 0,
      commentCount: initialCommentCount = 0,
      likes,
      comments = [],
      isLiked: initialIsLiked,
      isOwnBlog,
      isDetail = false,
      contentToggle = true,
      viewDetail,
      viewLike,
      onDelete,
    },
    ref
  ) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedMediaIndex, setSelectedMediaIndex] = useState<number | null>(
      null
    );
    const [fileCategories, setFileCategories] = useState<{
      imageFiles: { url: string; file_name: string }[];
      videoFiles: { url: string; file_name: string }[];
      otherFiles: { url: string; file_name: string }[];
    }>({
      imageFiles: [],
      videoFiles: [],
      otherFiles: [],
    });
    const [formattedTime, setFormattedTime] = useState(formatTime(time));
    const {
      commentCounts,
      likeCounts,
      isLiked,
      setLikeCount,
      setCommentCount,
      decrementLikeCount,
      incrementLikeCount,
      setIsLiked,
      toggleIsLiked,
    } = useBlogStore();

    useEffect(() => {
      if (!isDetail) {
        console.log("use");
        setLikeCount(blogId, initialLikeCount);
        setCommentCount(blogId, initialCommentCount);
        setIsLiked(blogId, initialIsLiked);
      }
    }, []);

    const commentCount = commentCounts[blogId] ?? initialCommentCount;
    const likeCount = likeCounts[blogId] ?? initialLikeCount;
    const liked = isLiked[blogId] ?? initialIsLiked;

    const handleGlobalLike = async () => {
      toggleIsLiked(blogId);

      if (!liked) {
        incrementLikeCount(blogId);
        try {
          await giveLike(blogId);
        } catch (error) {
          setTimeout(() => {
            toggleIsLiked(blogId);
            decrementLikeCount(blogId);
          }, 500);
        }
      } else {
        decrementLikeCount(blogId);
        try {
          await giveLike(blogId);
        } catch (error) {
          setTimeout(() => {
            toggleIsLiked(blogId);
            incrementLikeCount(blogId);
          }, 500);
        }
      }
    };

    // Update time automatically
    useEffect(() => {
      const updateTime = () => setFormattedTime(formatTime(time));
      updateTime();
      const interval = setInterval(updateTime, 60000);
      return () => clearInterval(interval);
    }, []);

    // Identify File type to img, vid and others
    useEffect(() => {
      if (files.length > 0) {
        setFileCategories(classifyFiles(files));
      }
    }, [files]);

    const classifyFiles = (files: File[]) => {
      const categories = {
        imageFiles: [] as { url: string; file_name: string }[],
        videoFiles: [] as { url: string; file_name: string }[],
        otherFiles: [] as { url: string; file_name: string }[],
      };

      for (const file of files) {
        const { url_link, file_name } = file;
        const safeName = file_name ?? "Unknown File";
        const type = getFileType(url_link);

        if (type === "image")
          categories.imageFiles.push({ url: url_link, file_name: safeName });
        else if (type === "video")
          categories.videoFiles.push({ url: url_link, file_name: safeName });
        else categories.otherFiles.push({ url: url_link, file_name: safeName });
      }

      return categories;
    };

    // To toggle content expansion
    const toggleContent = () => setIsExpanded(!isExpanded);

    // Truncate content if necessary
    const contentToDisplay =
      contentToggle ?
        isExpanded ? text
        : `${text.slice(0, MAX_CONTENT_LENGTH)}${
            text.length > MAX_CONTENT_LENGTH ? "..." : ""
          }`
      : text;

    // Close Media Modal
    const closeModal = () => setSelectedMediaIndex(null);

    // Handle keyboard events (Left, Right, Escape)
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (selectedMediaIndex !== null) {
          if (event.key === "ArrowLeft") handlePrev();
          if (event.key === "ArrowRight") handleNext();
          if (event.key === "Escape") closeModal();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedMediaIndex]);

    const handlePrev = () => {
      if (selectedMediaIndex !== null && selectedMediaIndex > 0) {
        setSelectedMediaIndex(selectedMediaIndex - 1);
      }
    };

    const handleNext = () => {
      if (
        selectedMediaIndex !== null &&
        selectedMediaIndex < mediaUrls.length - 1
      ) {
        setSelectedMediaIndex(selectedMediaIndex + 1);
      }
    };

    const mediaFiles = [
      ...fileCategories.imageFiles.map((file) => ({ type: "image", ...file })),
      ...fileCategories.videoFiles.map((file) => ({ type: "video", ...file })),
    ];

    // Get file types (image or video)
    const fileTypes = mediaFiles.map((file) => file.type);

    // Get the URLs (both images and videos)
    const mediaUrls = mediaFiles.map((file) => file.url);

    return (
      <div
        ref={ref}
        className={`bg-background pt-4 ${
          isDetail ? "" : "md:shadow md:rounded-md rounded-none"
        }`}
      >
        {/* Header Section */}
        <div className='flex justify-between pb-3 mx-4'>
          <div className='flex items-center gap-2'>
            <div className='w-10 h-10 rounded-full overflow-hidden'>
              <Image
                src={profilePic || placeholderProfile}
                alt={`${username}'s profile`}
                width={40}
                height={40}
                className='object-cover'
              />
            </div>
            <div>
              <p className='font-semibold text-primaryText'>{username}</p>
              <p className='text-xsm text-gray-500'>{formattedTime}</p>
            </div>
          </div>
          {isOwnBlog && (
            <PostOptionsMenu
              onDelete={onDelete}
              blogId={blogId}
            />
          )}
        </div>

        {/* Post Content */}
        <div className='mb-2'>
          <div className='mx-4 text-primaryText'>
            {/* Title */}
            {title && (
              <h2 className='text-xl font-semibold pb-3 break-words'>
                {title}
              </h2>
            )}

            {/* Content text */}
            <p className='pb-3 break-words'>
              {contentToDisplay}
              {contentToggle && text.length > MAX_CONTENT_LENGTH && (
                <button
                  onClick={toggleContent}
                  className='text-theme ml-1 text-sm hover:underline'
                >
                  {isExpanded ? "Show Less" : "Read More"}
                </button>
              )}
            </p>
          </div>

          {/* Media Gallery */}
          {!isDetail ?
            files.length > 0 && (
              <div
                className={`sm:mx-4 grid gap-1 mb-3 ${
                  mediaFiles.length === 1 ? "grid-cols-1"
                  : mediaFiles.length === 2 ? "grid-cols-2"
                  : mediaFiles.length === 3 ? "grid-cols-2 grid-rows-2"
                  : "grid-cols-2"
                }`}
              >
                {mediaFiles.slice(0, 4).map((file, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer overflow-hidden md:rounded-md relative 
                ${mediaFiles.length === 3 && index === 0 ? "col-span-2 row-span-2 md:h-[350px] h-[250px]" : ""} 
                ${mediaFiles.length > 2 ? "md:h-[250px] h-[200px]" : "md:h-[400px] h-[300px]"}
                `}
                    // onClick={() => {
                    //   if (file.type === "image") setSelectedImageIndex(index);
                    // }}
                    onClick={() => {
                      if (mediaUrls.length > 4 && index === 3) return;
                      setSelectedMediaIndex(index);
                    }}
                  >
                    {
                      file.type === "image" ?
                        <ImageWithSkeleton
                          src={file.url}
                          alt={`Media ${index + 1}`}
                        />
                        // need to change here
                      : <video
                          controls
                          // preload='none'
                          className='w-full h-full object-cover rounded-md'
                        >
                          <source
                            src={file.url}
                            type='video/mp4'
                          />
                          Your browser does not support the video tag.
                        </video>

                    }

                    {index === 3 && mediaFiles.length > 4 && (
                      <div
                        className='absolute z-5 inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-2xl font-semibold'
                        onClick={viewDetail}
                      >
                        +{mediaFiles.length - 4}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )
          : files.length > 0 && (
              <div className='grid grid-cols-1 gap-2'>
                {mediaFiles.map((file, index) => (
                  <div
                    key={index}
                    className='cursor-pointer overflow-hidden'
                    onClick={() => setSelectedMediaIndex(index)}
                  >
                    {file.type === "image" ?
                      <Image
                        src={file.url}
                        alt=''
                        width={0}
                        height={0}
                        sizes='100vw'
                        style={{ width: "100%", height: "auto" }}
                      />
                    : <video
                        controls
                        className='w-full h-full object-cover'
                      >
                        <source
                          src={file.url}
                          type='video/mp4'
                        />
                        Your browser does not support the video tag.
                      </video>
                    }
                  </div>
                ))}
              </div>
            )
          }

          {/* Attachments */}
          {fileCategories.otherFiles.length > 0 && (
            <div className='sm:mx-4 mx-2 py-2 select-none'>
              <div className='grid grid-cols-2 gap-5'>
                {fileCategories.otherFiles.map((doc, index) => (
                  <div
                    key={index}
                    className='bg-boardFile shadow-sm rounded-sm p-3 flex items-center justify-between gap-3 border h-12'
                  >
                    <div className='flex gap-2 min-w-0 items-center'>
                      <FileIcon fileName={doc.file_name} />
                      <div className='truncate w-full overflow-hidden whitespace-nowrap text-ellipsis'>
                        {doc.file_name}
                      </div>
                    </div>
                    <a
                      href={doc.url}
                      className='flex items-center justify-center cursor-pointer'
                    >
                      <MdOutlineFileDownload
                        size={20}
                        className='text-secondaryText'
                      />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Like and comment counts */}
        <div className='mx-4 mb-2 select-none'>
          <div className='flex items-center justify-between text-secondaryText text-md'>
            <div
              className='flex items-center hover:underline cursor-pointer'
              onClick={viewLike}
            >
              <AiOutlineLike size={20} />
              <div className='pl-1'>
                {liked ?
                  likeCount === 1 ?
                    "You"
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
        <div className='flex py-2 justify-between mx-4 select-none max-md:'>
          <div className='flex gap-10'>
            {/* Like btn */}
            <div
              className='flex items-center gap-1 cursor-pointer text-secondaryText'
              onClick={handleGlobalLike}
            >
              {liked ?
                <AiFillLike
                  color='teal'
                  size={20}
                />
              : <AiOutlineLike size={20} />}
              <span className={`${liked && "text-teal-600 "}`}>Like</span>
            </div>
            {/* Comment btn */}
            <div
              className='flex items-center gap-1 cursor-pointer text-secondaryText'
              onClick={isDetail ? undefined : viewDetail}
            >
              <BiCommentDetail size={20} />
              <span className=''>Comment</span>
            </div>
          </div>

          {!isDetail && (
            <div
              className='flex items-center gap-1 cursor-pointer text-secondaryText'
              onClick={viewDetail}
            >
              <VscOpenPreview size={20} />
              <span className='max-sm:hidden'>View Full Post</span>
              <span className='sm:hidden'>View</span>
            </div>
          )}
        </div>
        {isDetail && <HorizontalDivider />}

        {isDetail && (
          <CommentSection
            key={blogId}
            comments={comments}
            blogId={blogId}
          />
        )}

        <MediaModal
          imageUrls={mediaUrls} // Media files (images + videos)
          selectedIndex={selectedMediaIndex}
          onClose={closeModal}
          onPrev={handlePrev}
          onNext={handleNext}
          fileTypes={fileTypes} // Pass the type (image or video) for each file
        />
      </div>
    );
  }
);
UserBlog.displayName = "UserBlog";
export default UserBlog;
