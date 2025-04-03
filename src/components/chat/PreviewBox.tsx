"use client"

import { getFileType, getFileTypeByExtension } from "@/utils/ls_fileChecker";
import Image from "next/image";
import { useRef, useState } from "react";
import { FaRegCirclePlay } from "react-icons/fa6";


export default function PreviewBox(
    {
        file
    } : {
        file: File | string;
    }
){  const check = typeof file === 'string';
    const fileType = check ? getFileTypeByExtension(file).toLowerCase() : getFileType(file);
    const previewFile = check ? file : URL.createObjectURL(file);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayClick = (event: React.MouseEvent) => {
        event.stopPropagation(); // Prevents accidental clicks on other parts
        if (videoRef.current) {
          videoRef.current.play();
          setIsPlaying(true);
        }
      };

      const openInNewTab = (event: React.MouseEvent) => {
        event.stopPropagation(); 
        if (fileType === "image") {
          window.open(previewFile, "_blank");
        } else if (fileType === "video") {
          window.open(previewFile, "_blank");
        } else {
          window.open(previewFile, "_blank");
        }
      };

    switch (fileType) {
            case 'image':
              return <Image
              onClick={openInNewTab} 
              src={previewFile} fill={true} alt={check ? file : file.name} />;
            case 'video':
              return <div
              onClick={openInNewTab} 
              className="relative w-full h-full overflow-clip rounded-sm">
                
                <video
            ref={videoRef}
            src={previewFile}
            className="absolute left-0 right-0 top-0 bottom-0 w-full h-full object-cover rounded-sm"
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            controls={isPlaying} // Show controls when video is playing
          />
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
              <FaRegCirclePlay 
                className="text-[40px] text-white opacity-70 cursor-pointer"
                onClick={handlePlayClick}
              />
            </div>
          )}
              </div>;
            
            default:
              return (
                <div
                onClick={openInNewTab}  
                className="p-2 bg-gray-200 rounded flex flex-col items-center justify-center h-full w-full">
                  <span className="text-lg mb-1">📄</span>
                  <span className="text-xs w-full break-words text-center">
                    {check ? file : file.name}
                  </span>
                </div>
              );
          }
}