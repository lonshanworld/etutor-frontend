"use client";

import { checkExist, formatTimestamp } from "@/lib/utils";
import ProfileImageBox from "../ProfileImageBox"
import { FaCheckCircle } from "react-icons/fa";
import { isChatMessage, MessageType } from "@/model/message";
import PreviewBox from "./PreviewBox";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useUserStore } from "@/stores/useUserStore";
import { Id } from "../../../convex/_generated/dataModel";
import { useToast } from "@/stores/useToast";
import ImageBox from "../ImageBox";
import { useChatProfileListStore } from "@/stores/useChatListProfile";


export default function MessageBox(
    {
        isMine,
        message,
        isChat,
        senderId,
    } : {
        isMine : boolean,
        message : MessageType,
        isChat : boolean
        senderId : number,
    }
){
    const [showDelete, setShowDelete] = useState(false);
    const longPressTimeout = useRef<NodeJS.Timeout | null>(null);
    const touchStartTime = useRef<number>(0);
    const messageRef = useRef<HTMLDivElement>(null);
    const {user} = useUserStore();
    const deleteMessage = useMutation(api.message.deleteMessage);
    const deleteNote = useMutation(api.note.deleteNote);
    const {showToast} = useToast();
    const {getOneProfileById} = useChatProfileListStore();

    // Handle click outside
    useEffect(() => {
        if(isMine){
            const handleClickOutside = (event: any) => {
                if (messageRef.current && !messageRef.current.contains(event.target as Node)) {
                    setShowDelete(false);
                }
            };
    
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart',   handleClickOutside);
    
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
                document.removeEventListener('touchstart', handleClickOutside);
            };
        }
    }, []);

    const handleTouchStart = useCallback(() => {
        if(isMine){
            touchStartTime.current = Date.now();
            longPressTimeout.current = setTimeout(() => {
                setShowDelete(true);
            }, 1000);
        }
    }, []);

    const handleTouchEnd = useCallback(() => {
        if(isMine){
            if (longPressTimeout.current) {
                clearTimeout(longPressTimeout.current);
            }
        }
    }, []);

    const handleDelete = async() => {
        
        try{
            if(isChat){
                if(checkExist(message._id)){
                    await deleteMessage({
                        userId: user!.id,
                        messageId: message._id as Id<"messages">,
                        sender_id: message.sender_id,
                    });
                }
            }else{
                if(checkExist(message._id)){
                    await deleteNote({
                        noteId : message._id as Id<"notes">
                    });
                }
            }
        }catch(err){
            showToast("Unexpected error occured", "error");
        }finally{
            setShowDelete(false);
        }
    };

    return (
        <div
        className={`w-full flex flex-row gap-3 ${isMine ? "justify-end items-end" : "justify-start items-start"}`}>
            {
                isMine === false && <ImageBox imageUrl={getOneProfileById(senderId)?.profile_picture} />
            }
            <div
            ref={messageRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleTouchStart}
            onMouseUp={handleTouchEnd}
            onMouseLeave={handleTouchEnd}
            className={`relative flex flex-col min-w-20 max-w-[75%] md:max-w-[65%] lg:max-w-[50%] bg-gray-400 bg-opacity-30 px-3 py-2 ${isMine ? "rounded-l-2xl rounded-t-2xl " : "rounded-r-2xl rounded-b-2xl "}`}>
                { (isMine=== true) && showDelete && (
                    <button
                        onClick={handleDelete}
                        className="absolute bottom-10 right-2 z-20 px-4 py-2 bg-white rounded-md shadow-lg text-red-500 flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition-colors"
                    >
                        <span
                        className="text-base">Delete</span>
                        <FaTrash className="text-base" />
                    </button>
                )}
                {
                    message.fileUrls && message.fileUrls.length > 0 && (
                        <div
                        className={`min-w-28 md:min-w-36 max-w-full ${message.fileUrls.length > 1 ? "grid grid-cols-2 lg:grid-cols-3 gap-2" : "flex"} `}>
                            {
                                message.fileUrls.map((file, index) => {
                                    return (
                                        <div key={index} className="w-28 md:w-36 aspect-square relative rounded-sm overflow-clip mb-2">
                                            <PreviewBox file={file} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                    
                }
                
                <span
                className={`text-base ${message.deleted_at ? "text-red-500" : "text-font"}`}>{message.context}</span>
                <div
                className={`w-full ${isMine ? "justify-end" : "justify-start"} flex flex-row items-center gap-2`}>
                    <span
                    className={`${isMine ? "text-end" : "text-start"} text-xs opacity-50`}>{formatTimestamp(message._creationTime).time}</span>
                    {
                        isChat && isChatMessage(message) && isMine && <FaCheckCircle className={`text-xs ${message.is_read ? "text-green-500" : "text-gray-500"}`} />
                    }
                </div>
            </div>
            {
                isMine === true && <ImageBox imageUrl={user?.profileImagePath} />
            }
        </div>
    );
}