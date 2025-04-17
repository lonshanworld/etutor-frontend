"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

interface MediaModalProps {
  imageUrls: string[];
  selectedIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  fileTypes: string[];
}

const MediaModal = ({
  imageUrls,
  selectedIndex,
  onClose,
  onPrev,
  onNext,
  fileTypes,
}: MediaModalProps) => {
  const [mounted, setMounted] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || selectedIndex === null) return null;

  const isImage = fileTypes[selectedIndex] === "image";
  const isVideo = fileTypes[selectedIndex] === "video";

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  // Handle touch move
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };

  // Handle touch end
  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const deltaX = touchStartX - touchEndX;
      if (deltaX > 50) {
        onNext(); // Swipe left (next)
      } else if (deltaX < -50) {
        onPrev(); // Swipe right (previous)
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  return createPortal(
    <div
      className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center z-50 select-none'
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <button
        className='text-white absolute md:top-4 md:right-4 top-2 max-md:left-2 hover:bg-gray-500 p-2 rounded-full'
        onClick={onClose}
      >
        <RxCross1 size={25} />
      </button>

      {selectedIndex > 0 && (
        <button
          className='absolute left-2 text-white'
          onClick={onPrev}
        >
          <FaChevronLeft size={30} />
        </button>
      )}

      <div className='sm:max-w-[90%]'>
        {isImage ?
          <Image
            src={imageUrls[selectedIndex]}
            alt='Full image'
            width={1000}
            height={800}
          />
        : isVideo ?
          <video
            controls
            className='max-w-full h-[80vh] object-contain'
          >
            <source
              src={imageUrls[selectedIndex]}
              type='video/mp4'
            />
            Your browser does not support the video tag.
          </video>
        : null}
      </div>

      {selectedIndex < imageUrls.length - 1 && (
        <button
          className='absolute right-2 text-white'
          onClick={onNext}
        >
          <FaChevronRight size={30} />
        </button>
      )}
    </div>,
    document.body // Mounting the modal at the root level
  );
};

export default MediaModal;
