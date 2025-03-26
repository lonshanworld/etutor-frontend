"use client";

import logo from "@/assets/images/unilogo-without-text.png";
import { feedData, likedUserData } from "@/components/board/data";
import Post from "@/components/board/UserPost";
import Image from "next/image";
import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import LikeModal from "./modals/LikeModal";

const PostTab = () => {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [posts, setPosts] = useState(feedData);
  const [isLikedModalOpen, setLikeModalOpen] = useState(false);
  const [isClosing, setClosing] = useState(false);

  const scrollToTop = () => {
    const container = document.getElementById("postContainer");
    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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

      <div className='flex h-auto overflow-hidden w-full'>
        {/* Main Board */}
        <div className='md:basis-1/2 md:pr-2 h-auto pt-16 mt-2'>
          <div
            id='postContainer'
            className='flex flex-col md:gap-3 gap-1.5 h-full overflow-y-auto scrollbar-none pb-4'
          >
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
        <div
          className={`w-[2px] h-full  bg-opacity-50 max-md:hidden z-10 ${
            selectedPost ? "bg-transparent" : "bg-background"
          }`}
        ></div>

        {/* Post Details */}
        <div className='md:basis-1/2 md:block h-full bg-secondaryBackground z-7 y-auto scrollbar-none relative'>
          <div
            className={`flex h-full w-full opacity-logo items-center justify-center z-0 absolute `}
          >
            <Image
              src={logo}
              alt='Logo'
            />
          </div>

          <div
            className={`fixed max-md:top-[57px] md:pt-3 left-0 w-full h-full bg-secondaryBackground z-10 md:px-1 pb-2.5 overflow-y-auto scrollbar-none md:relative md:basis-1/2 md:block transition-transform duration-500 ease-in-out transform ${
              selectedPost && !isClosing
                ? "translate-x-0 opacity-100"
                : "translate-x-full md:opacity-100"
            }`}
          >
            {selectedPost && (
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostTab;
