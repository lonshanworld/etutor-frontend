import {
  blogFromJson,
  BlogResponse,
  commentsFromJson,
  filesFromJson,
  likedListFromJson,
  newBlogFromJson,
  newCommentFromJson,
} from "@/model/blog";
import { isErrorModel } from "@/model/ErrorModel";
import { APIS } from "../api-constants";
import { GetRequest, PostRequest } from "../general-api-services";

export async function getBlogs(cursor: string | null): Promise<BlogResponse> {
  const url =
    cursor ? `${APIS.GET.getBlogs}?cursor=${cursor}` : APIS.GET.getBlogs;
  const response = await GetRequest(url);

  if (isErrorModel(response)) {
    throw response;
  }

  const data = blogFromJson(response);
  return data;
}

export async function giveLike(id: number): Promise<any> {
  const response = await PostRequest(
    {
      blog_id: id,
    },
    APIS.POST.giveLike
  );

  if (isErrorModel(response)) {
    throw response;
  }
  const data = response.jsonData;
  return data;
}

export async function giveComment(
  blogId: number,
  comment: string
): Promise<any> {
  const response = await PostRequest(
    {
      blog_id: blogId,
      content: comment,
    },
    APIS.POST.giveComment
  );

  if (isErrorModel(response)) {
    throw response;
  }
  const data = newCommentFromJson(response);
  return data;
}

export async function uploadFile(files: File[]): Promise<any> {
  const formData = new FormData();

  files.forEach((file, index) => {
    formData.append(`attachments[${index}]`, file);
  });

  const response = await PostRequest(formData, APIS.POST.uploadAttachment);

  if (isErrorModel(response)) {
    throw response;
  }

  return response;
}

export async function addBlog(
  title: string,
  text: string,
  attachments: { name: string; path: string }[]
): Promise<any> {
  const response = await PostRequest(
    {
      title: title,
      text: text,
      attachments: attachments,
    },
    APIS.POST.addBlog
  );

  if (isErrorModel(response)) {
    throw response;
  }

  const data = newBlogFromJson(response);
  return data;
}

export async function fetchLikedList(blogId: number): Promise<any> {
  const response = await GetRequest(APIS.GET.getBlogById(blogId));

  if (isErrorModel(response)) {
    throw response;
  }

  const data = likedListFromJson(response);
  return data;
}

export async function fetchComments(blogId: number): Promise<any> {
  const response = await GetRequest(APIS.GET.getBlogById(blogId));

  if (isErrorModel(response)) {
    throw response;
  }

  const data = commentsFromJson(response);
  return data;
}

export async function deleteBlog(blogId: number): Promise<any> {
  const response = await PostRequest({}, APIS.POST.deleteBlog(blogId));

  if (isErrorModel(response)) {
    throw response;
  }

  return response;
}

export async function getFiles(page: number): Promise<any> {
  const url = page ? `${APIS.GET.getFiles}?page=${page}` : APIS.GET.getFiles;
  const response = await GetRequest(url);

  if (isErrorModel(response)) {
    throw response;
  }

  const data = filesFromJson(response);

  console.log(data);
  return data;
}
