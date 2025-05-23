"use client";

import Image from "next/image";
import { useState } from "react";

const ImageWithSkeleton = ({ src, alt }: { src: string; alt: string }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className='relative w-full h-full'>
      {isLoading && (
        <div className='absolute inset-0 bg-gray-300 animate-pulse md:rounded-md'></div>
      )}
      <Image
        src={src}
        alt={alt}
        loading='lazy'
        width={600}
        height={400}
        className={`object-cover w-full h-full md:rounded-md transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

export default ImageWithSkeleton;
