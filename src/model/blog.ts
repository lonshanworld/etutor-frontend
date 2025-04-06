type User = {
  id: number;
  name: string;
  profile_picture: string | null;
};

export type File = {
  id: number;
  file_name: string | null;
  url_link: string;
  created_at: string;
  user: User;
};

export type Like = {
  id: number;
  user: User;
  created_at: string;
};

export type Comment = {
  id: number;
  content: string;
  user: User;
  created_at: string;
};

export type Blog = {
  id: number;
  title: string;
  text: string;
  files: File[];
  likes: Like[];
  comments: Comment[];
  author: User;
  created_at: string;
};

type Meta = {
  path: string;
  per_page: number;
  next_cursor: string | null;
  prev_cursor: string | null;
};

export type BlogResponse = {
  blogs: Blog[];
  meta: Meta;
};

export function blogFromJson(jsonData: any): BlogResponse {
  return {
    blogs: jsonData.data.map((blog: Blog) => ({
      id: blog.id,
      title: blog.title,
      text: blog.text,
      files: blog.files.map((file: File) => ({
        id: file.id,
        file_name: file.file_name,
        url_link: file.url_link,
        created_at: file.created_at,
        user: {
          id: file.user.id,
          name: file.user.name,
          profile_picture: file.user.profile_picture,
        },
      })),
      likes: blog.likes.map((like: Like) => ({
        id: like.id,
        user: {
          id: like.user.id,
          name: like.user.name,
          profile_picture: like.user.profile_picture,
        },
        created_at: like.created_at,
      })),
      comments: blog.comments.map((comment: Comment) => ({
        id: comment.id,
        content: comment.content,
        user: {
          id: comment.user.id,
          name: comment.user.name,
          profile_picture: comment.user.profile_picture,
        },
        created_at: comment.created_at,
      })),
      author: {
        id: blog.author.id,
        name: blog.author.name,
        profile_picture: blog.author.profile_picture,
      },
      created_at: blog.created_at,
    })),

    meta: jsonData.meta as Meta,
  };
}

export function newBlogFromJson(jsonData: any) {
  return {
    id: jsonData.data.blog.id,
    title: jsonData.data.blog.title,
    text: jsonData.data.blog.text,
    files: jsonData.data.blog.files.map((file: File) => ({
      id: file.id,
      file_name: file.file_name,
      url_link: file.url_link,
      created_at: file.created_at,
      user: {
        id: file.user.id,
        name: file.user.name,
        profile_picture: file.user.profile_picture,
      },
    })),
    likes: jsonData.data.blog.likes.map((like: Like) => ({
      id: like.id,
      user: {
        id: like.user.id,
        name: like.user.name,
        profile_picture: like.user.profile_picture,
      },
      created_at: like.created_at,
    })),
    comments: jsonData.data.blog.comments.map((comment: Comment) => ({
      id: comment.id,
      content: comment.content,
      user: {
        id: comment.user.id,
        name: comment.user.name,
        profile_picture: comment.user.profile_picture,
      },
      created_at: comment.created_at,
    })),
    author: {
      id: jsonData.data.blog.author.id,
      name: jsonData.data.blog.author.name,
      profile_picture: jsonData.data.blog.author.profile_picture,
    },
    created_at: jsonData.data.blog.created_at,
    updated_at: jsonData.data.blog.updated_at,

    message: jsonData.message,
  };
}

export type FileData = {
  data: { name: string; path: string }[];
};

export function fileDataFromJson(jsonData: any): FileData {
  const fileUrls: FileData = {
    data: jsonData.data,
  };

  return fileUrls;
}

export function newCommentFromJson(jsonData: any) {
  const data = jsonData.data.comment;
  return {
    id: data.id,
    content: data.content,
    user: data.user,
    created_at: data.created_at,
  };
}

export function likedListFromJson(jsonData: any) {
  return {
    likes: jsonData.data.likes.map((like: Like) => ({
      id: like.id,
      user: {
        id: like.user.id,
        name: like.user.name,
        profile_picture: like.user.profile_picture,
      },
    })),
  };
}

export function commentsFromJson(jsonData: any) {
  return {
    comments: jsonData.data.comments.map((comment: Comment) => ({
      id: comment.id,
      content: comment.content,
      user: {
        id: comment.user.id,
        name: comment.user.name,
        profile_picture: comment.user.profile_picture,
      },
      created_at: comment.created_at,
    })),
  };
}
