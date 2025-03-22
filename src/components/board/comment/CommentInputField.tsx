"use client";

import { useState } from "react";
import { Send } from "lucide-react";

interface Props {
  onAddComment: (comment: {
    id: number;
    profilePic: string;
    username: string;
    time: string;
    text: string;
  }) => void;
}

const CommentInputField = ({ onAddComment }: Props) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim() === "") return;

    // Will need to change with data from store
    const newComment = {
      id: Date.now(),
      profilePic: "",
      username: "You",
      time: "Just now",
      text,
    };

    onAddComment(newComment);
    setText("");
  };

  return (
    <div className='flex items-center border border-gray-500 rounded-lg px-3 py-2 w-full'>
      <input
        type='text'
        placeholder='Comment...'
        className='flex-1 bg-transparent outline-none placeholder-gray-400'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className='text-gray-600 transition'
        onClick={handleSubmit}
      >
        <Send size={18} />
      </button>
    </div>
  );
};

export default CommentInputField;
