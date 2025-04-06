"use client";

import { useEffect, useState } from "react";
import CommentInputField from "./CommentInputField";
import CommentCard from "./CommentCard";
import { Comment } from "@/model/blog";
import { formatName, formatTime } from "@/utils/formatData";
import { fetchComments } from "@/api/services/blogs";
import { useBlogStore } from "@/stores/useBlogStore";
import { useUserStore } from "@/stores/useUserStore";

interface Props {
  blogId: number;
  comments: Comment[];
}

const CommentSection = ({ blogId, comments }: Props) => {
  const [commentList, setCommentList] = useState<Comment[]>(comments);
  const [loading, setLoading] = useState(false);
  const [pendingComment, setPendingComment] = useState<string | null>(null);
  const { incrementCommentCount, decrementLikeCount, setCommentCount } =
    useBlogStore();
  const { user } = useUserStore();

  useEffect(() => {
    const FetchLatestComments = async () => {
      setLoading(true);
      try {
        if (blogId) {
          const response = await fetchComments(blogId);
          setCommentList(response.comments);
          setCommentCount(blogId, response.comments.length);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    FetchLatestComments();
  }, [blogId]);

  const addComment = (newComment: Comment) => {
    setPendingComment(null);
    setCommentList((prevComments) => [...prevComments, newComment]);
    incrementCommentCount(blogId);
  };

  const handlePending = (message: string) => {
    setPendingComment(message);
  };

  return (
    <div className='bg-background'>
      <div className='p-4'>
        {loading ?
          <p className='text-center'>Loading...</p>
        : commentList.length > 0 ?
          <>
            {commentList.map((comment) => (
              <CommentCard
                key={comment.id}
                profilePic={comment.user.profile_picture}
                username={comment.user.name}
                time={formatTime(comment.created_at)}
                comment={comment.content}
              />
            ))}
            {pendingComment && (
              <CommentCard
                profilePic={user?.profileImagePath || null}
                username={formatName(
                  user?.firstName,
                  user?.middleName,
                  user?.lastName
                )}
                time='Just now'
                comment={pendingComment}
                isSending
              />
            )}
          </>
        : <div>No comment yet</div>}
      </div>
      <div className='mx-3 pt-1 pb-3'>
        <CommentInputField
          onAddComment={addComment}
          blogId={blogId}
          onPendingComment={handlePending}
        />
      </div>
    </div>
  );
};

export default CommentSection;
