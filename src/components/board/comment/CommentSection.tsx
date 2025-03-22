"use client";

import { useState, useEffect } from "react";
import CommentInputField from "./CommentInputField";
import PostComment from "./CommentCard";

interface Comment {
  id: number;
  profilePic: string;
  username: string;
  time: string;
  text: string;
}

interface Props {
  comments: Comment[];
}

const CommentSection = ({ comments }: Props) => {
  const addComment = (newComment: Comment) => {
    // add
  };

  return (
    <div className='bg-background'>
      <div className='p-4'>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <PostComment
              key={comment.id}
              profilePic={comment.profilePic}
              username={comment.username}
              time={comment.time}
              comment={comment.text}
            />
          ))
        ) : (
          <div>No comments</div>
        )}
      </div>
      <div className='mx-3 pt-1 md:pb-10 pb-20'>
        <CommentInputField onAddComment={addComment} />
      </div>
    </div>
  );
};

export default CommentSection;
