"use client";

import { formatDate, formatTime } from "@/utils/formatData";
import { getMeetingIcon } from "@/utils/getMeetingIcon";
import Image from "next/image";
import React from "react";

interface Props {
  meetingName: string;
  date: string;
  time: string;
  meetingType: string;
  platform: string | null;
  onClick: () => void;
}

const MeetingBox = ({
  meetingName,
  date,
  time,
  meetingType,
  platform,
  onClick,
}: Props) => {
  return (
    <div
      className='p-4 bg-background shadow-md rounded-lg border hover:shadow-lg transition duration-300 cursor-pointer w-full'
      onClick={onClick}
    >
      <div className='flex items-center gap-4'>
        <div className='w-20 h-20 flex-shrink-0 bg-blue-100 p-1 rounded-lg'>
          <Image
            src={getMeetingIcon(meetingType, platform)}
            alt='Meeting Icon'
            loading='lazy'
            width={80}
            height={80}
            className='p-2'
          />
        </div>

        <div className='flex flex-col w-full overflow-hidden justify-between'>
          <span className='h-10 font-semibold text-primaryText line-clamp-2 text-base leading-5'>
            {meetingName}
          </span>
          <div className='flex justify-between gap-4'>
            <span className='text-sm text-secondaryText truncate'>
              {formatTime(time)}
            </span>
            <span className='text-sm text-secondaryText truncate'>
              {formatDate(date)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingBox;
