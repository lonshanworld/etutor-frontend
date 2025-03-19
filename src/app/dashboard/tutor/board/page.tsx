"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import Post from "@/components/board/Post";
import logo from "@/assets/images/unilogo-without-text.png";
import Image from "next/image";
import PostComment from "@/components/board/PostComment";
import CommentInputField from "@/components/board/CommentInputField";

const feedPage = () => {
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const data = [
    {
      id: 1,
      profilePic: "",
      username: "User One",
      time: "10 min ago",
      imageUrl: "https://fakeimg.pl/600x400",
      title: "Title One",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique atque doloremque asperiores amet illo nemo in culpa quibusdam deleniti repellat ipsa hic, aperiam dicta quo reiciendis inventore. Reiciendis numquam consequuntur tempora odio, laudantium dolorem veniam ullam? Nihil eaque culpa est ducimus! Debitis sunt eum dolorem sit itaque eaque recusandae deserunt?",
      contentToggle: true,
      document: "document1.docx",
      likeCount: "5",
      commentCount: "2",
      comments: [
        {
          id: 1,
          profilePic: "",
          username: "User Three",
          time: "10 min ago",
          text: "Ask CDCR San Quintin State Prison 2008. We installed Purex dispensers throughout the prison to comba",
        },
        {
          id: 2,
          profilePic: "",
          username: "User Three",
          time: "10 min ago",
          text: "This is comment",
        },
      ],
    },
    {
      id: 2,
      profilePic: "",
      username: "User Two",
      time: "20 min ago",
      imageUrl: "https://fakeimg.pl/600x400",
      title: "Title Two",
      content:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero perspiciatis tempore quas assumenda magnam, qui et esse tenetur fugit nobis.",
      contentToggle: false,
      document: "document2.pdf",
      likeCount: "3",
      commentCount: "4",
      comments: [
        {
          id: 1,
          profilePic: "",
          username: "User Three",
          time: "10 min ago",
          text: "This is comment",
        },
      ],
    },
  ];

  return (
    <div className='flex gap-3 h-screen overflow-y-auto'>
      <div className='md:basis-3/5 pb-24 md:px-4 md:border md:border-r-gray-100 border-r-2 overflow-y-auto h-screen scrollbar-none'>
        <div className='flex items-center justify-between pb-5 pt-2 sticky bg-secondaryBackground top-0 z-1'>
          <div className='flex gap-4'>
            <div className='border border-b-theme text-theme border-b-2 text-xl'>
              Post
            </div>
          </div>
          <div className=''>
            <Button
              size='lg'
              variant='default'
            >
              <FiEdit /> POST
            </Button>
          </div>
        </div>

        <div className='flex flex-col gap-3'>
          {/* Posts */}
          {data.map((post) => (
            <Post
              key={post.id}
              profilePic={post.profilePic}
              username={post.username}
              time={post.time}
              imageUrl={post.imageUrl}
              title={post.title}
              content={post.content}
              contentToggle={true}
              document={post.document}
              likeCount={post.likeCount}
              commentCount={post.commentCount}
              onClick={() => setSelectedPost(post)}
            />
          ))}
        </div>
      </div>

      <div
        className={`hidden pt-4 pb-24 md:flex basis-2/5 h-screen scrollbar-none ${
          selectedPost
            ? "flex-col  overflow-y-auto"
            : "opacity-30 items-center justify-center"
        }`}
      >
        {selectedPost ? (
          <>
            <Post
              profilePic={selectedPost.profilePic}
              username={selectedPost.username}
              time={selectedPost.time}
              imageUrl={selectedPost.imageUrl}
              title={selectedPost.title}
              content={selectedPost.content}
              contentToggle={false}
              document={selectedPost.document}
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
            <div className='sticky bottom-0'>
              <CommentInputField />
            </div>
          </>
        ) : (
          <Image
            src={logo}
            alt='Logo'
          />
        )}
      </div>
    </div>
  );
};

export default feedPage;
