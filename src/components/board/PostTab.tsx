"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import Post from "@/components/board/UserPost";
import logo from "@/assets/images/unilogo-without-text.png";
import Image from "next/image";
import PostComment from "@/components/board/comment/CommentCard";
import CommentInputField from "@/components/board/comment/CommentInputField";
import { IoArrowBack } from "react-icons/io5";
import NewPostPopup from "@/components/board/modals/NewPostModal";
import { RxCross1 } from "react-icons/rx";
import CommentSection from "@/components/board/comment/CommentSection";
import TopBar from "@/components/board/TopBar";
import { feedData, likedUserData } from "@/components/board/data";
import LikeModal from "./modals/LikeModal";
import VerticalDivider from "../dividers/VerticalDivider";

const PostTab = () => {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [posts, setPosts] = useState(feedData);
  const [isLikedModalOpen, setLikeModalOpen] = useState(false);
  const [isClosing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setSelectedPost(null);
      setClosing(false);
    }, 500);
  };

  const handleViewPost = (post: any) => {
    if (selectedPost) {
      setSelectedPost(null);
    }
    // console.log(post);
    setSelectedPost(post);
  };

  const likerData = likedUserData;

  const handleLike = (postId: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likeCount: post.isLiked ? post.likeCount - 1 : post.likeCount + 1,
            }
          : post
      )
    );

    if (selectedPost?.id === postId) {
      setSelectedPost((prev: any) =>
        prev
          ? {
              ...prev,
              isLiked: !prev.isLiked,
              likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
            }
          : null
      );
    }
  };

  return (
    <>
      {isLikedModalOpen && (
        <LikeModal
          likeCount={1}
          likedUserList={likerData}
          onClose={() => setLikeModalOpen(false)}
        />
      )}

      <div className='flex gap-1 h-svh md:px-5 py-3 tracking-wide'>
        {/* Main Board */}
        <div
          className={`md:basis-1/2 md:pr-1 overflow-y-auto max-h-svh scrollbar-none`}
        >
          <div className='flex flex-col gap-5 pb-32 overflow-y-auto'>
            {/* Posts */}
            {posts.map((post) => (
              <Post
                key={post.id}
                isDetail={false}
                profilePic={post.profilePic}
                username={post.username}
                time={post.time}
                imageUrls={post.imageUrls}
                title={post.title}
                content={post.content}
                contentToggle={true}
                documentUrls={post.documentUrls}
                isLiked={post.isLiked}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                viewDetail={() => handleViewPost(post)}
                handleLike={() => handleLike(post.id)} // Pass the function
                viewLike={() => setLikeModalOpen(true)}
              />
            ))}
          </div>
        </div>

        {/* <VerticalDivider /> */}
        <div className='w-[2px] h-full bg-cusGray2 bg-opacity-20'></div>

        {/* Post Details */}
        <div className='md:basis-1/2 md:block h-full bg-secondaryBackground z-10 y-auto scrollbar-none relative'>
          <div
            className={`flex h-full w-full opacity-30 items-center justify-center z-0 absolute`}
          >
            <Image
              src={logo}
              alt='Logo'
            />
          </div>

          <div
            className={`fixed top-[-67px] max-md:top-[57px] left-0 w-full h-full bg-secondaryBackground z-10 md:px-2.5 md:pt-2 pb-2.5 md:pb-20 overflow-y-auto scrollbar-none md:relative md:basis-1/2 md:block transition-transform duration-500 ease-in-out transform ${
              selectedPost && !isClosing
                ? "translate-x-0 opacity-100"
                : "translate-x-full md:opacity-100"
            }`}
          >
            {selectedPost ? (
              <>
                {/* Back button for mobile */}
                <div className='max-md:sticky bg-background top-0 left-0 right-0 p-3'>
                  <button
                    className='flex items-center gap-2 text-gray-500 md:hover:text-gray-800'
                    onClick={handleClose}
                  >
                    <div className='flex gap-2 md:hidden'>
                      <IoArrowBack size={24} /> <span>Back</span>
                    </div>
                    <div className='flex gap-2 items-center max-md:hidden'>
                      <RxCross1 size={20} /> <span>Close</span>
                    </div>
                  </button>
                </div>

                {/* Post Content */}
                <Post
                  isDetail={true}
                  profilePic={selectedPost.profilePic}
                  username={selectedPost.username}
                  time={selectedPost.time}
                  imageUrls={selectedPost.imageUrls}
                  title={selectedPost.title}
                  content={selectedPost.content}
                  contentToggle={false}
                  documentUrls={selectedPost.documentUrls}
                  isLiked={selectedPost.isLiked}
                  likeCount={selectedPost.likeCount}
                  commentCount={selectedPost.commentCount}
                  comments={selectedPost.comments}
                  handleLike={() => handleLike(selectedPost.id)}
                  viewLike={() => setLikeModalOpen(true)}
                />
              </>
            ) : (
              <div
                className={`flex h-full ${
                  selectedPost
                    ? "flex-col  overflow-y-auto"
                    : "opacity-30 items-center justify-center"
                } `}
              >
                <Image
                  src={logo}
                  alt='Logo'
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostTab;
