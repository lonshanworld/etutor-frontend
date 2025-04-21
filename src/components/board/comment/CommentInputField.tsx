"use client";

import { giveComment } from "@/api/services/blogs";
import { Comment } from "@/model/blog";
import { useUserStore } from "@/stores/useUserStore";
import { useRef, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";

interface Props {
  blogId: number;
  onAddComment: (comment: Comment) => void;
  onPendingComment: (msg: string) => void;
}

const CommentInputField = ({
  blogId,
  onAddComment,
  onPendingComment,
}: Props) => {
  const [commentContent, setcommentContent] = useState("");
  const commentSectionRef = useRef<HTMLDivElement | null>(null);
  const { isReadOnly } = useUserStore();

  const handleSubmit = async () => {
    if (commentContent.trim() === "") return;
    onPendingComment(commentContent);

    try {
      const response = await giveComment(blogId, commentContent);
      onAddComment(response);
      setcommentContent("");
    } catch (error) {
      console.log("comment error", error);
    } finally {
      // scroll to comment input
      setTimeout(() => {
        if (commentSectionRef.current) {
          commentSectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
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
      <div className='flex items-center border border-inputBorder  rounded-lg px-3 py-2 w-full bg-blogCommentBox'>
        <input
          type='text'
          placeholder='Write a comment...'
          className={`flex-1 bg-transparent outline-none placeholder-gray-400  ${isReadOnly && "pointer-events-none opacity-50"}`}
          value={commentContent}
          onChange={(e) => setcommentContent(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className={`text-gray-600 transition flex rounded-full p-1 ${isReadOnly ? "pointer-events-none opacity-50" : "cursor-pointer"}`}
          onClick={handleSubmit}
        >
          <AiOutlineSend
            size={20}
            className='text-primaryText'
          />
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
