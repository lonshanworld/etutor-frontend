"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { RxCross1 } from "react-icons/rx";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useEffect, useState } from "react";

interface ImageModalProps {
  imageUrls: string[];
  selectedIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const ImageModal = ({
  imageUrls,
  selectedIndex,
  onClose,
  onPrev,
  onNext,
}: ImageModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || selectedIndex === null) return null;

  return createPortal(
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center z-50'>
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

      <Image
        src={imageUrls[selectedIndex]}
        alt='Full image'
        width={1000}
        height={800}
      />

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

export default ImageModal;
