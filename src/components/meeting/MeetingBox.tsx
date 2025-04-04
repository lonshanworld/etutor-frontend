"use client";

import Image from "next/image";
import React from "react";
import googleMeet from "@/assets/svgs/meeting-icons/googleMeet2.svg";
// import zoom from "@/assets/svgs/meeting-icons/googleMeet.svg";
// import teams from "@/assets/svgs/meeting-icons/googleMeet.svg";

interface Props {
  meetingName: string;
  time: string;
  meetingType: string;
  onClick: () => void;
}

const meetingIcons: { [key: string]: string } = {
  google: googleMeet,
  // zoom: zoom,
  // teams: teams,
};

const MeetingBox = ({ meetingName, time, meetingType, onClick }: Props) => {
  return (
    <div
      className='p-4 bg-background shadow-md rounded-lg border hover:shadow-lg transition duration-300 cursor-pointer'
      onClick={onClick}
    >
      <div className='flex items-center gap-4'>
        <div className='w-16 h-16 flex-shrink-0 bg-blue-100 p-1 rounded-lg'>
          <Image
            src={meetingIcons[meetingType] || googleMeet} // need fallback default icon
            alt='Meeting Icon'
            loading='lazy'
            width={64}
            height={64}
          />
        </div>

        <div className='flex flex-col w-full overflow-hidden'>
          <span className='text-lg font-semibold text-primaryText truncate'>
            {meetingName}
          </span>
          <span className='text-sm text-secondaryText truncate'>{time}</span>
        </div>
      </div>
    </div>
  );
};

export default MeetingBox;
