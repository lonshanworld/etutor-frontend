"use client";

import { addBlog, uploadFile } from "@/api/services/blogs";
import HorizontalDivider from "@/components/dividers/HorizontalDivider";
import ProfilePic from "@/components/ProfilePic";
import Spinner from "@/components/Spinner";
import { useBlogStore } from "@/stores/useBlogStore";
import { useToast } from "@/stores/useToast";
import { useState } from "react";
import {
  AiOutlineFile,
  AiOutlineFileExcel,
  AiOutlineFileImage,
  AiOutlineFilePdf,
  AiOutlineFilePpt,
  AiOutlineFileWord,
} from "react-icons/ai";
import { CgClose } from "react-icons/cg";
import { FaRegFileVideo } from "react-icons/fa";
import { GrAttachment } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";

interface FileData {
  file: File;
  previewUrl: string;
}

interface Props {
  profileUrl: string | null;
  username: string;
  onClose: () => void;
  onBlogPosted: (newBlog: any) => void;
}

const MAX_FILE_SIZE_MB = 4;
const MAX_FILES = 10;

const CreateNewBlogModal = ({
  profileUrl,
  username,
  onClose,
  onBlogPosted,
}: Props) => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [error, setError] = useState<string>("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const { setCommentCount, setIsLiked, setLikeCount } = useBlogStore();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    if (!selectedFiles.length) return;

    let newFiles: FileData[] = [];
    let errorMessage = "";

    if (files.length + selectedFiles.length > MAX_FILES) {
      setError(`You can only upload up to ${MAX_FILES} files.`);
      return;
    }

    selectedFiles.forEach((file) => {
      const fileSizeMB = file.size / 1024 / 1024;
      if (fileSizeMB > MAX_FILE_SIZE_MB) {
        errorMessage = `File "${file.name}" exceeds the ${MAX_FILE_SIZE_MB}MB limit.`;
        return;
      }
      newFiles.push({
        file,
        previewUrl: URL.createObjectURL(file),
      });
    });

    if (errorMessage) {
      setError(errorMessage);
    } else {
      setError("");
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!title || !content) {
      setError("Title and content are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      let uploadedData: { name: string; path: string }[] = [];

      if (files.length > 0) {
        const data = await uploadFile(files.map((f) => f.file));
        uploadedData = data?.data || [];
      }

      const response = await addBlog(title, content, uploadedData);

      if (response.message !== "success") {
        throw Error("error");
      }

      const formattedNewBlog = {
        id: response.id,
        authorId: response.author.id,
        profilePic: response.author.profile_picture,
        username: response.author.name,
        time: response.created_at,
        title: response.title,
        text: response.text,
        files: response.files,
        likes: response.likes,
        comments: response.comments,
        likeCount: response.likes.length,
        commentCount: response.comments.length,
        isOwnBlog: true,
        isLiked: false,
      };

      setLikeCount(response.id, 0);
      setCommentCount(response.comment, 0);
      setIsLiked(response.id, false);

      showToast("New blog posted successfully", "success");
      onBlogPosted(formattedNewBlog);

      onClose();
    } catch (err) {
      console.error(err);
      setError("Failed to post blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/"))
      return (
        <AiOutlineFileImage
          size={24}
          className='text-blue-500'
        />
      );
    if (fileType.startsWith("video/"))
      return (
        <FaRegFileVideo
          size={24}
          className='text-purple-500'
        />
      );
    if (fileType === "application/pdf")
      return (
        <AiOutlineFilePdf
          size={24}
          className='text-red-500'
        />
      );

    // Microsoft Office Formats (Word, Excel, PowerPoint)
    const wordTypes = [
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const excelTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    const pptTypes = [
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (wordTypes.includes(fileType))
      return (
        <AiOutlineFileWord
          size={24}
          className='text-blue-700'
        />
      );
    if (excelTypes.includes(fileType))
      return (
        <AiOutlineFileExcel
          size={24}
          className='text-green-600'
        />
      );
    if (pptTypes.includes(fileType))
      return (
        <AiOutlineFilePpt
          size={24}
          className='text-orange-500'
        />
      );

    // Default icon
    return (
      <AiOutlineFile
        size={24}
        className='text-gray-500'
      />
    );
  };

  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50'>
      <div className='bg-background w-[97%] max-w-[500px] h-auto flex flex-col rounded-lg'>
        <div className='flex items-center justify-center font-semibold text-lg w-full  relative py-3'>
          <div className='text-xl font-semibold'>Create Blog</div>
          <div
            className='rounded-full p-1.5 cursor-pointer absolute right-2 hover:bg-gray-400'
            onClick={onClose}
          >
            <RxCross2
              className={`${"text-theme"}`}
              size={23}
            />
          </div>
        </div>

        <HorizontalDivider />

        <div className='px-4 pt-4 pb-6'>
          <div className='flex'>
            <div className='flex items-center gap-2'>
              <div className='w-7 h-7 rounded-full overflow-hidden'>
                <ProfilePic
                  profileUrl={profileUrl}
                  size={28}
                />
              </div>
              <div>
                <p className='font-semibold'>{username}</p>
              </div>
            </div>
          </div>

          {/* Input fields */}
          <div className='flex flex-col gap-3 pt-4'>
            <input
              className='mt-1 h-10 w-full px-3 border bg-transparent border-gray-400 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-md text-primaryText'
              type='text'
              placeholder='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              rows={5}
              placeholder='Write something...'
              className='w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none bg-transparent transition-all duration-300 placeholder-gray-400 overflow-y-auto text-primaryText'
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          <div className='flex flex-col overflow-y-auto max-h-[350px] pt-3 pb-2'>
            {files.length > 0 && (
              <div className='space-y-2'>
                {files.map((fileData, index) => (
                  <div
                    key={index}
                    className='flex items-center bg-blogAttachmentBox p-2 rounded-lg'
                  >
                    {getFileIcon(fileData.file.type)}
                    <div className='ml-3 flex-1'>
                      <p className='text-sm font-medium'>
                        {fileData.file.name}
                      </p>
                      <p className='text-xs text-gray-500'>
                        {(fileData.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className='text-red-500'
                    >
                      <CgClose size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {error && <p className='text-red-500 text-sm my-1'>{error}</p>}

          <div className='flex flex-col gap-2 justify-end items-center pt-2'>
            <label className='flex items-center justify-center gap-2 cursor-pointer bg-blue-500 text-white px-4 py-1.5 w-full'>
              Add Attachment
              <GrAttachment />
              <input
                type='file'
                multiple
                className='hidden'
                onChange={handleFileSelect}
              />
            </label>

            <button
              // onClick={handleSubmit}
              onClick={handleSubmit}
              className={`${loading ? "bg-gray-400" : "bg-teal-600"}  text-background text-white px-5 py-1.5 w-full`}
              disabled={loading}
            >
              {loading ?
                <>
                  <span>Posting...</span> <Spinner />
                </>
              : "Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewBlogModal;
