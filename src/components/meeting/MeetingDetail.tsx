"use client";

import Image from "next/image";
import { FiArrowLeft } from "react-icons/fi";
import ProfilePic from "../ProfilePic";
import { IoBookOutline, IoTimeOutline } from "react-icons/io5";

export interface meetingProps {
  id: number;
  profileUrl: string;
  tutorName: string;
  tutorQualification: string;
  subject: string;
  time: string;
  studentList: string[];
  meetingType: "Virtual" | "Physical";
  location: string;
  platform: "Google Meet" | "Microsoft Teams" | "Zoom";
  meetingLink: string;
}

interface Props extends meetingProps {
  onBack: () => void;
}

const MeetingDetail = ({
  profileUrl,
  tutorName,
  tutorQualification,
  subject,
  time,
  studentList,
  meetingType,
  location,
  platform,
  meetingLink,
  onBack,
}: Props) => {
  return (
    <div className='flex flex-col w-full'>
      {/* Back btn */}
      <div
        className='flex items-center gap-1'
        onClick={onBack}
      >
        <FiArrowLeft size={30} /> <span className='text-lg'>Back</span>
      </div>

      <div className='py-3 text-2xl font-semibold'>{subject}</div>

      {/* tutor profile */}
      <div className='flex gap-4'>
        <div>
          <ProfilePic
            profileUrl={profileUrl || profileUrl}
            size={50}
          />
        </div>
        <div className=''>
          <p className='font-semibold'>{tutorName}</p>
          <p className='text-sm'>{tutorQualification}</p>
        </div>
      </div>

      <div>
        <button className=''>Meeting Link</button>
      </div>

      <div className='grid grid-cols-2 border border-black'>
        <div className='border-r border-r-black w-2/5'>
          <div className='flex items-center gap-2 p-1'>
            <IoBookOutline size={22} />
            <span className='font-semibold'>Subject</span>
          </div>
          <div>Subject</div>
          <div>Subject</div>
        </div>
        <div className='w-3/5'>
          <div>{subject}</div>
          <div>{subject}</div>
          <div>{subject}</div>
        </div>
      </div>

      <div className='mt-6 border border-gray-700'>
        <div className='flex justify-between border-b border-b-black'>
          <div className='flex items-center gap-2 mb-2 border-r border-r-black'>
            <IoBookOutline size={22} />
            <span className='font-semibold text-lg'>Subject</span>
          </div>
          <span className=''>{subject}</span>
        </div>

        <div className='flex justify-between'>
          <div className='flex items-center gap-2 mb-2'>
            <IoTimeOutline size={22} />
            <span className='font-semibold text-lg'>Time</span>
          </div>
          <span className=''>{time}</span>
        </div>

        <div className='flex justify-between'>
          <p className='font-semibold'>Students</p>
          <p>{studentList?.join(", ")}</p>
        </div>
        <div className='flex justify-between'>
          <p className='font-semibold'>Meeting Type</p>
          <p>{meetingType}</p>
        </div>
        <div className='flex justify-between'>
          <p className='font-semibold'>Location</p>
          <p>{location ? location : "-"}</p>
        </div>
        <div className='flex justify-between'>
          <p className='font-semibold'>Platform</p>
          <p>{platform} icon here</p>
        </div>
        <div className='flex justify-between'>
          <p className='font-semibold'>Meeting Link</p>
          <a
            href={meetingLink}
            target='_blank'
            rel='noopener noreferrer'
            className='text-teal-400 hover:underline'
          >
            {meetingLink}
          </a>
        </div>
      </div>
    </div>
  );
};

export default MeetingDetail;
