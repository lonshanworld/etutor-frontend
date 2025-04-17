"use client";

import { File } from "@/model/blog";

const ActionPopup = ({
  isOpen,
  onClose,
  file,
  onDownload,
  onDelete,
}: {
  isOpen: boolean;
  onClose: () => void;
  file: File;
  onDownload: (file: File) => void;
  onDelete: (file: File) => void;
}) => {
  return (
    <div
      className={`absolute bg-white border rounded-md shadow-lg top-0 right-0 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <ul className='p-2 space-y-2'>
        <li>
          <button
            onClick={() => {
              onDownload(file);
              onClose();
            }}
            className='block text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-100'
          >
            Download
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              onDelete(file);
              onClose();
            }}
            className='block text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100'
          >
            Delete
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ActionPopup;
