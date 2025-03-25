"use client";

import { Button } from "../ui/button";
import { FiEdit } from "react-icons/fi";

interface TopBarProps {
  onSelectSection: (section: "post" | "file") => void; // Accept prop to change selected section
  selectedSection: "post" | "file"; // Track the currently selected section
  viewNewPost: () => void;
}

const TopBar = ({
  onSelectSection,
  selectedSection,
  viewNewPost,
}: TopBarProps) => {
  // Scroll to top function
  const scrollToTop = () => {
    const container = document.getElementById("postContainer");
    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // handle Post button
  const handlePost = () => {
    onSelectSection("post");
    scrollToTop();
  };

  return (
    <div className='flex items-center md:w-1/2 w-full justify-between md:px-2  bg-secondaryBackground  max-md:px-4 py-2 absolute top-0 left-0'>
      <div className='flex gap-4 h-full'>
        <div className='flex items-baseline text-xl gap-4 h-full'>
          <div
            className={`p-1 cursor-pointer border-b-2 ${
              selectedSection === "post"
                ? "border-b-theme text-theme"
                : "text-secondaryText border-transparent"
            }`}
            onClick={handlePost}
          >
            Post
          </div>
          <div
            className={`p-1 cursor-pointer border-b-2  ${
              selectedSection === "file"
                ? "border-b-theme text-theme"
                : "text-secondaryText border-transparent"
            }`}
            onClick={() => onSelectSection("file")}
          >
            File
          </div>
        </div>
      </div>
      {selectedSection === "post" && (
        <div onClick={viewNewPost}>
          <Button
            size='lg'
            variant='default'
            className='max-md:hidden'
          >
            <FiEdit /> POST
          </Button>
          <Button
            size='default'
            variant='default'
            className='md:hidden'
          >
            <FiEdit /> POST
          </Button>
        </div>
      )}
    </div>
  );
};

export default TopBar;
