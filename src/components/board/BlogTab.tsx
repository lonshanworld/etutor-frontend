"use client";

import { getBlogs, giveLike } from "@/api/services/blogs";
import logo from "@/assets/images/unilogo-without-text.png";
import UserBlog from "@/components/board/UserBlog";
import { Like } from "@/model/blog";
import { useUserStore } from "@/stores/useUserStore";
import { formatName } from "@/utils/formatData";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import CreateNewBlogModal from "./modals/CreateNewBlogModal";
import LikeModal from "./modals/LikeModal";
import { errorStore } from "@/stores/errorStore";

interface Props {
  isNewPostModalOpen: boolean;
  setNewPostModalOpen: (open: boolean) => void;
}

const BlogTab = ({ isNewPostModalOpen, setNewPostModalOpen }: Props) => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);
  const [isLikedModalOpen, setLikeModalOpen] = useState(false);
  const [isClosing, setClosing] = useState(false); // For detail blog page closing sliding effect
  const [isLoading, setLoading] = useState(false); // loading new blogs
  const [likedList, setLikeList] = useState<{
    blogId: number | null;
    likes: Like[];
  }>({
    blogId: null,
    likes: [],
  });
  const [cursor, setCursor] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastBlogRef = useRef(null);
  const { isError, setError } = errorStore();
  const { getUserId, user } = useUserStore();

  useEffect(() => {
    if (user) {
      getBlog();
    }
  }, [user]); // need to wait user so can get userid from store

  const getBlog = async () => {
    if (isLoading) return;
    setLoading(true);

    try {
      const response = await getBlogs(cursor);
      if (!response) {
        throw new Error("Error loading blogs. Please refresh the page");
      }

      const formattedBlogs = response.blogs.map((blog) => ({
        id: blog.id,
        profilePic: blog.author.profile_picture,
        username: blog.author.name,
        time: blog.created_at,
        title: blog.title,
        text: blog.text,
        files: blog.files,
        likes: blog.likes,
        comments: blog.comments,
        likeCount: blog.likes ? blog.likes.length : 0,
        commentCount: blog.comments ? blog.comments.length : 0,
        isOwnBlog: blog.author.id === getUserId(),
        isLiked:
          blog.likes?.some((like) => like.user.id === getUserId()) ?? false,
      }));
      setBlogs((prev) => [...prev, ...formattedBlogs]);
      setCursor(response.meta.next_cursor || null); // Update cursor for next fetch
    } catch (error: any) {
      setError(
        error.errorText ||
          error.message ||
          "Error fetching blogs. Please refresh the page and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePostNewBlog = (newBlog: any) => {
    setBlogs((prevBlogs) => [newBlog, ...prevBlogs]);
  };

  const handleDeleteBlog = (blogId: number) => {
    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
    if (selectedBlog?.id === blogId) {
      setSelectedBlog(null);
    }
  };

  const lastBlogElementRef = useCallback(
    (node: any) => {
      if (isLoading) return;
      if (observer.current) {
        observer.current.disconnect();
        if (lastBlogRef.current)
          observer.current.unobserve(lastBlogRef.current);
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && cursor) {
          getBlog(); // Load more blogs when reaching the bottom
        }
      });

      if (node) observer.current.observe(node); // Observe last blog item
    },
    [isLoading, cursor]
  );

  const handleLike = async (blogId: number) => {
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog.id === blogId
          ? {
              ...blog,
              isLiked: !blog.isLiked,
              likeCount: blog.isLiked ? blog.likeCount - 1 : blog.likeCount + 1,
            }
          : blog
      )
    );

    if (selectedBlog?.id === blogId) {
      setSelectedBlog((prev: any) =>
        prev
          ? {
              ...prev,
              isLiked: !prev.isLiked,
              likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
            }
          : null
      );
    }

    try {
      await giveLike(blogId);
    } catch (error: any) {
      // Revert changes on failure
      setTimeout(() => {
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog.id === blogId
              ? {
                  ...blog,
                  isLiked: !blog.isLiked,
                  likeCount: blog.isLiked
                    ? blog.likeCount - 1
                    : blog.likeCount + 1,
                }
              : blog
          )
        );

        if (selectedBlog?.id === blogId) {
          setSelectedBlog((prev: any) =>
            prev
              ? {
                  ...prev,
                  isLiked: !prev.isLiked,
                  likeCount: prev.isLiked
                    ? prev.likeCount - 1
                    : prev.likeCount + 1,
                }
              : null
          );
        }
      }, 500);
    }
  };

  // Detail page close
  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setSelectedBlog(null);
      setClosing(false);
    }, 500);
  };

  const handleViewPost = (blog: any) => {
    if (selectedBlog?.id === blog.id) {
      return;
    }
    setSelectedBlog(blog);
  };

  const handleViewLike = (blogId: number, likedList: any) => {
    setLikeModalOpen(true);
    setLikeList({
      blogId,
      likes: likedList,
    });
  };
  console.log("blogs", blogs);

  return (
    <>
      {isNewPostModalOpen && (
        <CreateNewBlogModal
          onClose={() => setNewPostModalOpen(false)}
          profileUrl={user?.profileImagePath || null}
          username={formatName(
            user?.firstName,
            user?.middleName,
            user?.lastName
          )}
          onBlogPosted={handlePostNewBlog}
        />
      )}

      {isLikedModalOpen && likedList && (
        <LikeModal
          blogId={likedList.blogId}
          likeCount={likedList.likes.length}
          likedUserList={likedList.likes.map((like) => ({
            likeId: like.id,
            userId: like.user.id,
            profilePic: like.user.profile_picture,
            name: like.user.name,
          }))}
          onClose={() => setLikeModalOpen(false)}
        />
      )}

      <div className="flex h-full w-full">
        {/* Main Board */}
        <div className="md:w-1/2 h-full pt-16 mt-2 w-full">
          <div
            id="postContainer"
            className="flex flex-col md:gap-3 gap-1.5 h-[98.5%] overflow-y-auto scrollbar-cus-2 pb-4 md:pr-1 max-md:scrollbar-none"
          >
            {/* Posts */}
            {blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <UserBlog
                  key={blog.id}
                  blogId={blog.id}
                  profilePic={blog.profilePic}
                  username={blog.username}
                  time={blog.time}
                  title={blog.title}
                  text={blog.text}
                  files={blog.files}
                  likes={blog.likes}
                  // comments={blog.comments}
                  likeCount={blog.likeCount}
                  commentCount={blog.commentCount}
                  isLiked={blog.isLiked}
                  isOwnBlog={blog.isOwnBlog}
                  isDetail={false}
                  contentToggle={true}
                  viewDetail={() => handleViewPost(blog)}
                  handleLike={() => handleLike(blog.id)}
                  viewLike={() => handleViewLike(blog.id, blog.likes)}
                  onDelete={() => handleDeleteBlog(blog.id)}
                  ref={index === blogs.length - 1 ? lastBlogElementRef : null}
                />
              ))
            ) : (
              <div className="text-center py-3">
                It’s quiet here… why not write something?
              </div>
            )}
            {isLoading && (
              <div className="text-center py-3">Loading more posts...</div>
            )}
          </div>
        </div>

        {/* <VerticalDivider /> */}
        <div
          className={`w-[2px] h-full bg-opacity-50 max-md:hidden z-10 ${
            selectedBlog ? "bg-transparent" : "bg-background"
          }`}
        ></div>

        {/* Post Details */}
        <div className="md:w-1/2 md:block h-full bg-secondaryBackground z-7 y-auto scrollbar-none relative">
          <div
            className={`flex h-full w-full opacity-logo items-center justify-center z-0 absolute `}
          >
            <Image src={logo} alt="Logo" />
          </div>

          <div
            className={`fixed max-md:top-[57px] md:mt-3 left-0 w-full h-full max-md:h-[calc(100%-56px)] bg-secondaryBackground z-10 md:px-1 overflow-y-auto scrollbar-none md:relative md:basis-1/2 md:block transition-transform duration-500 ease-in-out transform ${
              selectedBlog && !isClosing
                ? "translate-x-0 opacity-100"
                : "translate-x-full md:opacity-100"
            }`}
          >
            {selectedBlog && (
              <>
                {/* Back button for mobile */}
                <div className="max-md:sticky bg-background top-0 left-0 right-0 p-3">
                  <button
                    className="flex items-center gap-2 text-gray-500 md:hover:text-gray-800"
                    onClick={handleClose}
                  >
                    <div className="flex gap-2 md:hidden">
                      <IoArrowBack size={24} /> <span>Back</span>
                    </div>
                    <div className="flex gap-2 items-center max-md:hidden">
                      <RxCross1 size={20} /> <span>Close</span>
                    </div>
                  </button>
                </div>

                {/* Detail Blog */}
                <UserBlog
                  blogId={selectedBlog.id}
                  profilePic={selectedBlog.profilePic}
                  username={selectedBlog.username}
                  time={selectedBlog.time}
                  title={selectedBlog.title}
                  text={selectedBlog.text}
                  files={selectedBlog.files}
                  likes={selectedBlog.likes}
                  likeCount={selectedBlog.likeCount}
                  commentCount={selectedBlog.commentCount}
                  comments={selectedBlog.comments}
                  isLiked={selectedBlog.isLiked}
                  isOwnBlog={selectedBlog.isOwnBlog}
                  isDetail={true}
                  contentToggle={false}
                  handleLike={() => handleLike(selectedBlog.id)}
                  viewLike={() =>
                    handleViewLike(selectedBlog.id, selectedBlog.likes)
                  }
                  onDelete={() => handleDeleteBlog(selectedBlog.id)}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogTab;
