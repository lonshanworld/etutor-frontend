"use client";

import { deleteBlog } from "@/api/services/blogs";
import WarningPopup from "@/components/warningpopup/WarningPopup";
import { errorStore } from "@/stores/errorStore";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";

interface Props {
  blogId: number;
  onDelete: () => void;
}

const PostOptionsMenu = ({ blogId, onDelete }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showWarningPopup, setWarningPopup] = useState(false);
  const { isError, setError } = errorStore();

  const toggleMenu = () => setIsOpen(!isOpen);

  const confirmDelete = () => {
    setIsOpen(false);
    setWarningPopup(true);
  };

  const handleDelete = async () => {
    try {
      await deleteBlog(blogId);

      onDelete();
    } catch (error: any) {
      setError(
        error.errorText ||
          error.message ||
          "Error fetching blogs. Please refresh the page and try again."
      );
    }
    setWarningPopup(false);
  };

  return (
    <div className='relative'>
      <button
        onClick={toggleMenu}
        className='text-primaryText focus:outline-none'
      >
        <BsThreeDotsVertical size={20} />
      </button>

      {showWarningPopup && (
        <WarningPopup
          message='Are you sure you want to delete this blog?'
          onContinue={handleDelete}
          setShowWarning={setWarningPopup}
          title=''
        />
      )}

      {isOpen && (
        <div className='absolute right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg w-40'>
          <ul className='py-2'>
            <li>
              <button
                onClick={confirmDelete}
                className='flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
              >
                <FaRegTrashAlt size={18} />
                Delete
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default PostOptionsMenu;
