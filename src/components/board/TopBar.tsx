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
  return (
    <div className='flex items-center md:w-1/2 w-full justify-between md:pr-2 sticky bg-secondaryBackground top-0 z-10 px-6 max-md:px-4 py-2 min-h-[56px]'>
      <div className='flex gap-4'>
        <div className='flex text-xl gap-4'>
          <div
            className={`p-1 cursor-pointer border-b-2 ${
              selectedSection === "post"
                ? "border-b-theme text-theme"
                : "text-secondaryText border-transparent"
            }`}
            onClick={() => onSelectSection("post")}
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
        <div
          className=''
          onClick={viewNewPost}
        >
          <Button
            size='lg'
            variant='default'
          >
            <FiEdit /> POST
          </Button>
        </div>
      )}
    </div>
  );
};

export default TopBar;
