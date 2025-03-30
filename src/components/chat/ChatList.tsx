"use client";

import { useState, useEffect, useRef } from "react";
import { useMutation, usePaginatedQuery } from "convex/react";
import Image from "next/image";
import LinkAttachment from "@/assets/svgs/linkattachment.svg";
import SendIcon from "@/assets/svgs/Send icon.svg";
import MessageBox from "./MessageBox";
import { api } from "../../../convex/_generated/api";
import { Profile } from "@/model/profile";
import { IoCloseCircleSharp } from "react-icons/io5";
import { checkExist } from "@/lib/utils";


const itemCount = 10;

export default function ChatList({
  chat,
  user,
}: {
  chat?: {
    _id: string;
    _creationTime: number;
    user1: {
      userId: number;
      firstName: string;
      middleName?: string | null;
      lastName?: string | null;
      email: string;
      role: string;
      profileImagePath?: string | null;
      gender?: string | null;
    };
    user2: {
      userId: number;
      firstName: string;
      middleName?: string | null;
      lastName?: string | null;
      email: string;
      role: string;
      profileImagePath?: string | null;
      gender?: string | null;
    };
  };
  user: Profile;
}) {
  const [message, setMessage] = useState("");
  const sendMessage = useMutation(api.message.createMessage);
  const sendNote = useMutation(api.note.createNote);
  const markMessagesAsRead = useMutation(api.message.markMessagesAsRead);
  const [files, setFiles] = useState<File[]>([]); // Store multiple selected files
  const [filePreviews, setFilePreviews] = useState<string[]>([]); // Store preview URLs
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { results, isLoading, status, loadMore } = chat 
  ?
  usePaginatedQuery(
    api.message.getMessages,
    {
      conversationId: chat._id as any,
    },
    {
      initialNumItems: itemCount,
    }
  ) 
  :
  usePaginatedQuery(
    api.note.getNotes,
    {
      senderId: user.id,
    },
    {
      initialNumItems: itemCount,
    }
  );

  if(chat){
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
    console.log("here files", files);
    if (!message.trim()) return;

    if(chat){
      await sendMessage({
        conversation_id: chat._id as any,
        sender_id: user.id,
        context: message,
        fileUrls: [],
      });
    }else{
      await sendNote({
        sender_id: user.id,
        context: message,
        fileUrls: [],
      });
    }

    setMessage(""); 
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = () => {
    if (fileInputRef.current?.files) {
      const selectedFiles = Array.from(fileInputRef.current.files);
      setFiles(selectedFiles);
      const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
      setFilePreviews(previewUrls);
      fileInputRef.current.value = "";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setFilePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  return (
    <div className={`flex flex-col ${chat ? "h-[88%]" : "h-[90%]"} w-full relative`}>
      {/* Messages List */}
      <div className="absolute left-0 right-0 top-0 bottom-12 py-4 flex flex-col-reverse gap-2 overflow-y-auto scrollbar-none">
        
        
          {/* Show messages */}
      {results?.map((msg) => (
          <MessageBox key={msg._id} isChat={checkExist(chat)} isMine={msg.sender_id === user.id} message={msg as MessageType} />
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

        {
          files.length > 0 && (
            <div
            className="absolute bottom-11 right-0 w-[70%] sm:w-[60%] md:w-[50%] h-20 overflow-y-auto custom-scrollbar flex flex-row gap-2 bg-theme bg-opacity-10 rounded-t-md rounded-l-md shadow-cusShadow">
              {filePreviews.map((file, index) => (
          <div key={index} className="relative flex items-center">
            {files[index].type === "image" && (
              <img src={file} alt="Preview" className="w-20 h-20 object-cover rounded" />
            )}
            {files[index].type === "video" && (
              <video src={file} controls className="w-20 h-20 rounded" />
            )}
            {files[index].type === "audio" && (
              <audio controls>
                <source src={file} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
            {files[index].type !== "image" && files[index].type !== "video" && files[index].type !== "audio" && (
              <div className="p-2 bg-gray-200 rounded flex items-center">
                📄 {files[index].name}
              </div>
            )}
            <button
              onClick={() => removeFile(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
            >
              &times;
            </button>
          </div>
        ))}
            </div>
          )
        }

      {/* Input Section */}
      <div className="absolute bottom-0 left-0 right-0 border border-cusGray2 rounded-2xl flex flex-row justify-center items-center px-4 h-11">
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
        <Image onClick={openFileDialog} src={LinkAttachment} alt="Attach File" />
        <div className="w-[3px] h-6 rounded-t-full rounded-b-full mx-3 bg-cusGray"></div>
        <button  onClick={handleSendMessage}>
          <Image src={SendIcon} alt="Send" />
        </button>
      </div>

    </div>
  );
}
