"use client";

import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import ProfilePic from "../ProfilePic";

interface Props {
  id: number;
  profileUrl: string | null;
  name: string;
  onSelect: (id: number) => void;
  isSelected: boolean;
}

const StudentListItem = ({
  id,
  profileUrl,
  name,
  onSelect,
  isSelected,
}: Props) => {
  return (
    <div
      className={`flex items-center gap-2 p-3 border-b border-b-gray-600 cursor-pointer mr-3`}
      onClick={() => onSelect(id)}
    >
      <div>
        {isSelected ?
          <MdOutlineCheckBox
            size={24}
            className='text-teal-600'
          />
        : <MdOutlineCheckBoxOutlineBlank
            size={24}
            color='gray'
            className='text-secondaryText'
          />
        }
      </div>

      <div className='flex items-center gap-3 select-none'>
        <ProfilePic
          profileUrl={profileUrl}
          size={36}
        />
        <p className='text-primaryText'>{name}</p>
      </div>
    </div>
  );
};

export default StudentListItem;
