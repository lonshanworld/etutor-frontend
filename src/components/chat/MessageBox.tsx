import { checkExist, formatTimestamp } from "@/lib/utils";
import ProfileImageBox from "../ProfileImageBox"
import { FaCheckCircle } from "react-icons/fa";
import { isChatMessage, MessageType } from "@/model/message";
import PreviewBox from "./PreviewBox";


export default function MessageBox(
    {
        isMine,
        message,
        isChat
    } : {
        isMine : boolean,
        message : MessageType,
        isChat : boolean
    }
){
    return (
        <div
        className={`w-full flex flex-row gap-3 ${isMine ? "justify-end items-end" : "justify-start items-start"}`}>
            {
                isMine === false && <ProfileImageBox />
            }
            <div
            className={`flex flex-col min-w-20 max-w-[75%] md:max-w-[65%] lg:max-w-[50%] bg-gray-400 bg-opacity-30 px-3 py-2 ${isMine ? "rounded-l-2xl rounded-t-2xl " : "rounded-r-2xl rounded-b-2xl "}`}>
               
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
                className="text-base">{message.context}</span>
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
                isMine === true && <ProfileImageBox />
            }
        </div>
    );
}