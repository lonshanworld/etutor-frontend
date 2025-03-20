import React from "react";
import InputFieldType1 from "../inputfields/InputFieldType1";
import { CgAttachment } from "react-icons/cg";
import { MdOutlineInsertPhoto } from "react-icons/md";
import { TfiVideoClapper } from "react-icons/tfi";
import { Button } from "../ui/button";
import { RxCross1 } from "react-icons/rx";
import Image from "next/image";

interface Props {
  profileUrl: string;
  username: string;
}

const NewPostPopup = ({ profileUrl, username }: Props) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center z-50'>
      <div className='bg-white w-[600px] h-[400px] p-4 flex flex-col'>
        <button className='flex justify-between'>
          <div className='flex items-center gap-2'>
            <div className='w-7 h-7 rounded-full overflow-hidden'>
              <Image
                src={profileUrl}
                alt={`${username}'s profile`}
                width={28}
                height={28}
                className='object-cover'
              />
            </div>
            <div>
              <p className='font-semibold'>{username}</p>
              <p className='text-xs text-gray-500'>{}</p>
            </div>
          </div>
          <RxCross1
            color='teal'
            size={20}
          />
        </button>
        <div>
          <InputFieldType1
            id='title'
            type='text'
            placeholder='Title'
          />
          <InputFieldType1
            id='title'
            type='text'
            placeholder='Title'
          />
        </div>

        <div className='flex gap-1 justify-end items-center pt-5'>
          <button className='border p-3 rounded-sm'>
            <TfiVideoClapper size={20} />
          </button>
          <button className='border p-3'>
            <MdOutlineInsertPhoto size={20} />
          </button>
          <button className='border p-3'>
            <CgAttachment size={20} />
          </button>
          <Button
            size='lg'
            variant='default'
          >
            POST
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewPostPopup;
