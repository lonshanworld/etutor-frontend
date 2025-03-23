import React from "react";
import CommentInputField from "./CommentInputField";
import PostComment from "./PostComment";

interface Props {
  comments: [];
}

const CommentSection = ({ comments }: Props) => {
  return (
    <div>
      <div className='p-3'>
        {comments && comments.length > 0 ? (
          comments.map((comment: any) => (
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
      <div className='mx-3 mt-5 max-md:pb-20'>
        <CommentInputField />
      </div>
    </div>
  );
};

export default CommentSection;
