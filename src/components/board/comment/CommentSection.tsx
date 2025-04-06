"use client";

import { useEffect, useState } from "react";
import CommentInputField from "./CommentInputField";
import PostComment from "./CommentCard";
import { Comment } from "@/model/blog";
import { formatTime } from "@/utils/formatData";
import { useUserStore } from "@/stores/useUserStore";

interface Props {
  blogId: number;
  comments: Comment[];
}

const CommentSection = ({ blogId, comments }: Props) => {
  const [commentList, setCommentList] = useState<Comment[]>(comments);
  const { isReadOnly } = useUserStore();

  const addComment = (newComment: Comment) => {
    setCommentList((prevComments) => [...prevComments, newComment]);
  };

  return (
    <div className="bg-background">
      <div className="p-4">
        {commentList.length > 0 ? (
          commentList.map((comment) => (
            <PostComment
              key={comment.id}
              profilePic={comment.user.profile_picture}
              username={comment.user.name}
              time={formatTime(comment.created_at)}
              comment={comment.content}
            />
          ))
        ) : (
          <div>No comments</div>
        )}
      </div>
      <div
        className={`mx-3 pt-1 pb-3 ${isReadOnly && "pointer-events-none opacity-50"}`}
      >
        <CommentInputField onAddComment={addComment} blogId={blogId} />
      </div>
    </div>
  );
};

export default CommentSection;
