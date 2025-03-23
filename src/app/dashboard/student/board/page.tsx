"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import Post from "@/components/board/Post";
import logo from "@/assets/images/unilogo-without-text.png";
import Image from "next/image";
import PostComment from "@/components/board/PostComment";
import CommentInputField from "@/components/board/CommentInputField";
import { feedData } from "./data";
import { IoArrowBack } from "react-icons/io5";
import NewPostPopup from "@/components/board/NewPostPopup";
import { RxCross1 } from "react-icons/rx";
import CommentSection from "@/components/board/CommentSection";

const FeedPage = () => {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const data = feedData;

  return (
    <div className='flex gap-1 max-h-svh md:px-5 md:py-3 tracking-wide'>
      {/* <NewPostPopup
        profileUrl='https://i.pravatar.cc/300?img=19'
        username='Username'
      /> */}
      {/* Main Board */}
      <div
        className={`md:basis-1/2 md:pr-1 overflow-y-auto max-h-svh scrollbar-none 
          ${selectedPost ? "hidden md:block" : "flex-1"}
        `}
      >
        <div className='flex items-end justify-between py-3 sticky bg-secondaryBackground top-0 z-10 px-1 max-md:px-4'>
          <div className='flex gap-4'>
            <div className='flex text-xl gap-4'>
              <div className='p-1 cursor-pointer border-b-theme text-theme font-semibold border-b-2'>
                Post
              </div>
              <div className='p-1 cursor-pointer text-secondaryText'>File</div>
            </div>
          </div>
          <div>
            <Button
              size='lg'
              variant='default'
            >
              <FiEdit /> POST
            </Button>
          </div>
        </div>

        <div className='flex flex-col gap-5 pb-32 overflow-y-auto'>
          {/* Posts */}
          {data.map((post) => (
            <Post
              key={post.id}
              viewDetail={false}
              profilePic={post.profilePic}
              username={post.username}
              time={post.time}
              imageUrls={post.imageUrls}
              title={post.title}
              content={post.content}
              contentToggle={true}
              documentUrls={post.documentUrls}
              likeCount={post.likeCount}
              commentCount={post.commentCount}
              onClick={() => setSelectedPost(post)}
            />
          ))}
        </div>
      </div>

      {/* Post Details */}
      <div
        className={`fixed max-md:top-[57px] left-0 w-full max-h-svh bg-background z-10 md:px-2.5 md:pt-2 pb-2.5 md:pb-20 overflow-y-auto scrollbar-none md:transition-opacity md:duration-500 ease-in-out md:relative md:basis-1/2 md:block transition-transform duration-200 transform translate-x-0
    ${
      selectedPost
        ? "translate-x-0 opacity-100"
        : "translate-x-full opacity-0 md:opacity-100 md:translate-x-0"
    }`}
      >
        {selectedPost ? (
          <>
            {/* Back button for mobile */}
            <div className='max-md:sticky bg-background top-0 left-0 right-0 p-3'>
              <button
                className='flex items-center gap-2 text-gray-500 hover:text-gray-800'
                onClick={() => setSelectedPost(null)}
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
              viewDetail={true}
              profilePic={selectedPost.profilePic}
              username={selectedPost.username}
              time={selectedPost.time}
              imageUrls={selectedPost.imageUrls}
              title={selectedPost.title}
              content={selectedPost.content}
              contentToggle={false}
              documentUrls={selectedPost.documentUrls}
              likeCount={selectedPost.likeCount}
              commentCount={selectedPost.commentCount}
            />
            <CommentSection comments={selectedPost.comments} />
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
  );
};

export default FeedPage;
