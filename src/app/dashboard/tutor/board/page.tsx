"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import Post from "@/components/board/Post";
import logo from "@/assets/images/unilogo-without-text.png";
import Image from "next/image";
import PostComment from "@/components/board/PostComment";
import CommentInputField from "@/components/board/CommentInputField";
import { IoArrowBack } from "react-icons/io5";
import NewPostPopup from "@/components/board/NewPostPopup";
import { feedData } from "../../student/board/data";

const FeedPage = () => {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const data = feedData;

  return (
    <div className='flex gap-3 h-screen'>
      {/* <NewPostPopup
        profileUrl='https://i.pravatar.cc/300?img=19'
        username='Username'
      /> */}
      {/* Main Feed */}
      <div
        className={`md:basis-1/2 md:px-4 md:border md:border-r-gray-100 border-r-2 overflow-y-auto h-screen scrollbar-none 
          ${selectedPost ? "hidden md:block" : "flex-1"}
        `}
      >
        <div className='flex items-center justify-between pb-5 pt-2 sticky bg-secondaryBackground top-0 z-10'>
          <div className='flex gap-4'>
            <div className='flex border text-xl gap-5'>
              <div className='border-b-theme text-theme border-b-2'>Post</div>
              <div>File</div>
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
        className={`fixed top-0 left-0 w-full h-screen bg-white z-10 p-4 overflow-y-auto transition-opacity duration-500 ease-in-out md:relative md:basis-1/2 md:block 
    ${
      selectedPost
        ? "translate-x-0 opacity-100"
        : "-translate-x-full opacity-0 md:opacity-100 md:translate-x-0"
    }`}
      >
        {selectedPost ? (
          <>
            {/* Back button for mobile */}
            <button
              className='md:hidden flex items-center gap-2 text-gray-600 hover:text-black mb-4'
              onClick={() => setSelectedPost(null)}
            >
              <IoArrowBack size={24} /> <span>Back</span>
            </button>

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
            <div className='pt-2'>
              {selectedPost.comments && selectedPost.comments.length > 0 ? (
                selectedPost.comments.map((comment: any) => (
                  <PostComment
                    key={comment.id}
                    profilePic={comment.profilePic}
                    username={comment.username}
                    time={comment.time}
                    comment={comment.text}
                  />
                ))
              ) : (
                <p className='text-gray-500'>No comments yet.</p>
              )}
            </div>
            <div className='pb-10 mt-5'>
              <CommentInputField />
            </div>
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
