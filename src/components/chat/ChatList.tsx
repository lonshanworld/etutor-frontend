"use client";

import { useState, useEffect, useRef } from "react";
import { useMutation, usePaginatedQuery } from "convex/react";
import Image from "next/image";
import LinkAttachment from "@/assets/svgs/linkattachment.svg";
import SendIcon from "@/assets/svgs/Send icon.svg";
import MessageBox from "./MessageBox";
import { api } from "../../../convex/_generated/api";
import { Profile } from "@/model/profile";
import { checkExist } from "@/lib/utils";
import { MessageType } from "@/model/message";
import { getFileType, hasMaxFileSizeForChat } from "@/utils/ls_fileChecker";
import { ImCross } from "react-icons/im";
import { useToast } from "@/stores/useToast";
import Toast from "../customtoast/CustomToast";
import { sendChatFiles } from "@/api/services/chatService";
import { isErrorModel } from "@/model/ErrorModel";
import useLoading from "@/stores/useLoading";
import PreviewBox from "./PreviewBox";
import { useUserStore } from "@/stores/useUserStore";

const itemCount = 10;

export default function ChatList({
  chat,
  user,
}: {
  chat?: {
    _id: string;
    _creationTime: number;
    user1Id: number;
    user2Id: number;
  };
  user: Profile;
}) {
  const [message, setMessage] = useState("");
  const sendMessage = useMutation(api.message.createMessage);
  const sendNote = useMutation(api.note.createNote);
  const markMessagesAsRead = useMutation(api.message.markMessagesAsRead);
  const [files, setFiles] = useState<File[]>([]); // Store multiple selected files
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast, showToast } = useToast();
  const { showLoading, hideLoading } = useLoading();
  const { isReadOnly } = useUserStore();

  const { results, isLoading, status, loadMore } = chat
    ? usePaginatedQuery(
        api.message.getMessages,
        {
          conversationId: chat._id as any,
        },
        {
          initialNumItems: itemCount,
        }
      )
    : usePaginatedQuery(
        api.note.getNotes,
        {
          senderId: user.id,
        },
        {
          initialNumItems: itemCount,
        }
      );

  if (chat) {
    useEffect(() => {
      if (results.length > 0) {
        markMessagesAsRead({
          conversationId: chat._id as any,
          userId: user.id,
        });
      }
    }, [results]);
  }

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!message.trim() && files.length < 1) return;
    try {
      let fileUrls: string[] = [];
      if (files.length > 0) {
        showLoading();

        const formData = new FormData();
        files.forEach((file, index) => {
          formData.append(`attachments[${index}]`, file);
        });
        const data = await sendChatFiles(formData);
        if (!isErrorModel(data)) {
          data.forEach((item: string) => {
            fileUrls.push(item);
          });
          console.log("checking urls", fileUrls);
        } else {
          throw new Error(data.errorText);
        }
      }

      if (chat) {
        await sendMessage({
          conversation_id: chat._id as any,
          sender_id: user.id,
          context: message,
          fileUrls: fileUrls,
        });
      } else {
        await sendNote({
          sender_id: user.id,
          context: message,
          fileUrls: fileUrls,
        });
      }
    } catch (err: any) {
      console.log("check err", err);
      showToast(
        "Error sending message: " + err.errorText ||
          err.message ||
          "An unknown error occurred. Please try again.",
        "error"
      );
    } finally {
      setMessage("");
      setFiles([]);
      hideLoading();
    }
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = () => {
    if (fileInputRef.current?.files) {
      const selectedFiles = Array.from(fileInputRef.current.files);

      const maxFileList = hasMaxFileSizeForChat(selectedFiles);

      if (selectedFiles.length > 10) {
        showToast("Maximum 10 files can be selected", "warning");
        return;
      }

      if (maxFileList.length > 0) {
        console.log("reach here???");
        showToast(
          `Some files exceed 4MB limit: ${maxFileList.map((f) => f.name).join(", ")}`,
          "warning"
        );
        return;
      }

      setFiles(selectedFiles);
      const previewUrls = selectedFiles.map((file) =>
        URL.createObjectURL(file)
      );

      fileInputRef.current.value = "";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // e.preventDefault();
      handleSendMessage();
    }
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    // setFilePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  return (
    <div
      className={`flex flex-col ${chat ? "h-[88%]" : "h-[95%]"} w-full relative`}
    >
      {/* Messages List */}

      <div className="absolute left-0 right-0 top-0 bottom-12 py-4 flex flex-col-reverse gap-2 overflow-y-auto scrollbar-none">
        {/* Show messages */}
        {results?.map((msg) => (
          <MessageBox
            key={msg._id}
            isChat={checkExist(chat)}
            isMine={msg.sender_id === user.id}
            message={msg as MessageType}
            senderId={msg.sender_id}
          />
        ))}

        {/* Show "No messages yet" */}
        {results?.length === 0 && !isLoading && (
          <div className="text-center text-gray-500">No messages yet</div>
        )}

        {/* Show loading indicator */}
        {isLoading && (
          <div className="text-center text-gray-500">Loading...</div>
        )}

        {/* Show "End of messages" when no more data */}
        {status === "Exhausted" && results.length > 0 && (
          <div className="text-center text-gray-500 mt-2">End of messages</div>
        )}

        {/* "Load More Messages" Button (at the top) */}
        {status !== "Exhausted" && !isLoading && results.length > 0 && (
          <button
            onClick={() => loadMore(itemCount)}
            className="self-center text-theme hover:underline mb-2"
          >
            Load More Messages
          </button>
        )}
      </div>

      {files.length > 0 && (
        <div className="absolute bottom-12 right-0 max-w-[75%] sm:max-w-[65%] md:max-w-[55%] min-w-28 h-28 overflow-x-auto custom-scrollbar flex flex-row gap-2 bg-background rounded-t-md rounded-l-md shadow-cusShadow">
          {files.map((file, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 rounded-sm w-28 h-full overflow-clip"
            >
              <PreviewBox file={file} />
              <button
                onClick={() => removeFile(index)}
                className="absolute top-0 right-0 w-5 h-5 flex justify-center items-center bg-red-500 text-white rounded-full p-1"
              >
                <ImCross className="text-xss text-white" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input Section */}
      <div
        className={`absolute bottom-0 left-0 right-0 border border-cusGray2 rounded-2xl flex flex-row justify-center items-center px-4 h-11 ${isReadOnly && "pointer-events-none opacity-30"}`}
      >
        <input
          placeholder="Type your message here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="outline-none focus:outline-none w-full bg-transparent text-base placeholder:text-base"
          onKeyDown={handleKeyPress}
        />
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
        />
        <Image
          onClick={openFileDialog}
          src={LinkAttachment}
          alt="Attach File"
        />
        <div className="w-[3px] h-6 rounded-t-full rounded-b-full mx-3 bg-cusGray"></div>
        <button onClick={handleSendMessage}>
          <Image src={SendIcon} alt="Send" />
        </button>
      </div>
    </div>
  );
}
