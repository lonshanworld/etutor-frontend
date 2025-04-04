"use client";

import { useRef, useState } from "react";
import { Send } from "lucide-react";
import { useUserStore } from "@/stores/useUserStore";
import { Comment } from "@/model/blog";
import { giveComment } from "@/api/services/blogs";

interface Props {
  blogId: number;
  onAddComment: (comment: Comment) => void;
}

const CommentInputField = ({ blogId, onAddComment }: Props) => {
  const [commentContent, setcommentContent] = useState("");
  const commentSectionRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = async () => {
    if (commentContent.trim() === "") return;

    try {
      const response = await giveComment(blogId, commentContent);
      console.log("add comment", response);
      onAddComment(response); // Add new comment to UI
      setcommentContent(""); // Clear input field

      setTimeout(() => {
        if (commentSectionRef.current) {
          commentSectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      <div className='flex items-center border border-gray-500 rounded-lg px-3 py-2 w-full'>
        <input
          type='text'
          placeholder='Comment...'
          className='flex-1 bg-transparent outline-none placeholder-gray-400'
          value={commentContent}
          onChange={(e) => setcommentContent(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className='text-gray-600 transition'
          onClick={handleSubmit}
        >
          <Send size={18} />
        </button>
      </div>
      <div
        id='comment-input'
        className='pt-3'
        ref={commentSectionRef}
      ></div>
    </>
  );
};

export default CommentInputField;
