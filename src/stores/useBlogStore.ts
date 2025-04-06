import { create } from "zustand";

type BlogStore = {
  commentCounts: Record<number, number>;
  setCommentCount: (blogId: number, count: number) => void;
  incrementCommentCount: (blogId: number) => void;

  likeCounts: Record<number, number>;
  setLikeCount: (blogId: number, count: number) => void;
  incrementLikeCount: (blogId: number) => void;
  decrementLikeCount: (blogId: number) => void;

  isLiked: Record<number, boolean>;
  setIsLiked: (blogId: number, liked: boolean) => void;
  toggleIsLiked: (blogId: number) => void;
};

export const useBlogStore = create<BlogStore>((set) => ({
  commentCounts: {},
  setCommentCount: (blogId, count) =>
    set((state) => ({
      commentCounts: { ...state.commentCounts, [blogId]: count },
    })),
  incrementCommentCount: (blogId) =>
    set((state) => ({
      commentCounts: {
        ...state.commentCounts,
        [blogId]: (state.commentCounts[blogId] || 0) + 1,
      },
    })),

  likeCounts: {},
  setLikeCount: (blogId, count) =>
    set((state) => ({
      likeCounts: { ...state.likeCounts, [blogId]: count },
    })),
  incrementLikeCount: (blogId) =>
    set((state) => ({
      likeCounts: {
        ...state.likeCounts,
        [blogId]: (state.likeCounts[blogId] || 0) + 1,
      },
    })),
  decrementLikeCount: (blogId) =>
    set((state) => ({
      likeCounts: {
        ...state.likeCounts,
        [blogId]: Math.max((state.likeCounts[blogId] || 1) - 1, 0),
      },
    })),

  isLiked: {},
  setIsLiked: (blogId, liked) =>
    set((state) => ({
      isLiked: { ...state.isLiked, [blogId]: liked },
    })),
  toggleIsLiked: (blogId) =>
    set((state) => ({
      isLiked: {
        ...state.isLiked,
        [blogId]: !(state.isLiked[blogId] || false),
      },
    })),
}));
