import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { MdDeleteOutline, MdOutlineDelete } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

interface Props {
  onEdit: () => void;
  onDelete: () => void;
}

const PostOptionsMenu = ({ onEdit, onDelete }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className='relative'>
      <button
        onClick={toggleMenu}
        className='text-primaryText focus:outline-none'
      >
        <BsThreeDotsVertical size={20} />
      </button>

      {isOpen && (
        <div className='absolute right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg w-40'>
          <ul className='py-2'>
            <li>
              <button
                onClick={() => {
                  onEdit();
                  setIsOpen(false); // Close the menu after action
                }}
                className='flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
              >
                <FaRegEdit size={20} />
                Edit
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onDelete();
                  setIsOpen(false); // Close the menu after action
                }}
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
