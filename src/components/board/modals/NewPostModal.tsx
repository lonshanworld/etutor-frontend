"use client";

import InputFieldType1 from "../../inputfields/InputFieldType1";
import { CgAttachment } from "react-icons/cg";
import { MdOutlineInsertPhoto } from "react-icons/md";
import { TfiVideoClapper } from "react-icons/tfi";
import { Button } from "../../ui/button";
import { RxCross1 } from "react-icons/rx";
import Image from "next/image";

interface Props {
  profileUrl: string;
  username: string;
  onClose: () => void;
}

const NewPostModal = ({ profileUrl, username, onClose }: Props) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50'>
      <div className='bg-background w-[97%] md:w-[600px] h-auto p-4 flex flex-col rounded-lg'>
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
          <div
            className='rounded-full p-1 cursor-pointer hover:bg-gray-300'
            onClick={onClose}
          >
            <RxCross1
              color='teal'
              size={20}
            />
          </div>
        </button>
        <div className='flex flex-col gap-4 pt-6'>
          <input
            className='mt-1 h-10 w-full px-3 border bg-transparent border-gray-400 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-md'
            type='text'
            placeholder='Title'
          />
          <div className=''>
            <textarea
              id='comment'
              rows={6}
              placeholder='Write something...'
              className='w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none bg-transparent transition-all duration-300 placeholder-gray-400 overflow-y-auto'
            ></textarea>
          </div>
        </div>

        <div className='flex gap-1 justify-end items-center pt-5'>
          <button className='border p-3 rounded-sm bg-secondaryBackground'>
            <TfiVideoClapper size={20} />
          </button>
          <button className='border p-3 bg-secondaryBackground'>
            <MdOutlineInsertPhoto size={20} />
          </button>
          <button className='border p-3 bg-secondaryBackground'>
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

export default NewPostModal;
