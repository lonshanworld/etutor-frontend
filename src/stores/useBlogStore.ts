import { create } from "zustand";

type State = {
  isLiked: Record<number, boolean>;
  likeCounts: Record<number, number>;
  commentCounts: Record<number, number>;
};

type Action = {
  setIsLiked: (blogId: number, liked: boolean) => void;
  toggleIsLiked: (blogId: number) => void;

  setLikeCount: (blogId: number, count: number) => void;
  incrementLikeCount: (blogId: number) => void;
  decrementLikeCount: (blogId: number) => void;

  setCommentCount: (blogId: number, count: number) => void;
  incrementCommentCount: (blogId: number) => void;
};

export const useBlogStore = create<State & Action>((set) => ({
  isLiked: {},
  likeCounts: {},
  commentCounts: {},

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
}));
