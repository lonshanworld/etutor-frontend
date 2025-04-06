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
    <div className='flex flex-col w-full pl-6 pt-3'>
      {/* Back btn */}
      <div
        className='flex items-center gap-1 cursor-pointer'
        onClick={onBack}
      >
        <FiArrowLeft
          size={30}
          className='text-theme'
        />{" "}
        <span className='text-lg text-theme'>Back</span>
      </div>

      <div className='py-3 text-2xl font-semibold'>{subject}</div>

      {/* tutor profile */}
      <div className='flex gap-4 py-3'>
        <div>
          <ProfilePic
            profileUrl={profileUrl}
            size={50}
          />
        </div>
        <div className=''>
          <p className='font-semibold'>{tutorName}</p>
          <p className='text-sm'>{tutorQualification}</p>
        </div>
      </div>

      <div className='py-5'>
        <button className='bg-theme px-5 py-2.5 text-white rounded-lg'>
          Meeting Link
        </button>
      </div>

      <div className='flex w-[80%] border border-secondaryText'>
        <div className='pl-2 border-r border-r-secondaryText basis-60'>
          <div className='flex items-center gap-2 p-1'>
            {/* <IoBookOutline size={22} /> */}
            <span className='font-semibold'>Subject</span>
          </div>
          <div className='flex items-center gap-2 p-1'>
            <span className='font-semibold'>Time</span>
          </div>
          <div className='flex items-center gap-2 p-1'>
            <span className='font-semibold'>Students</span>
          </div>
          <div className='flex items-center gap-2 p-1'>
            <span className='font-semibold'>Meeting Type</span>
          </div>
          <div className='flex items-center gap-2 p-1'>
            <span className='font-semibold'>Location</span>
          </div>
          <div className='flex items-center gap-2 p-1'>
            <span className='font-semibold'>Platform</span>
          </div>
          <div className='flex items-center gap-2 p-1'>
            <span className='font-semibold'>Meeting Link</span>
          </div>
        </div>
        <div className='flex flex-col pl-2'>
          <div className='flex items-center gap-2 p-1'>
            {/* <IoBookOutline size={22} /> */}
            <span className=''>{subject}</span>
          </div>
          <div className='flex items-center gap-2 p-1'>
            <span className=''>{time}</span>
          </div>
          <div className='flex items-center gap-2 p-1'>
            <span className=''>{studentList}</span>
          </div>
          <div className='flex items-center gap-2 p-1'>
            <span className=''>{meetingType}</span>
          </div>
          <div className='flex items-center gap-2 p-1'>
            <span className=''>{location || "-"}</span>
          </div>
          <div className='flex items-center gap-2 p-1'>
            <span className=''>{platform || "-"}</span>
          </div>
          <div className='flex items-center gap-2 p-1'>
            <span className=''>{meetingLink || "-"}</span>
          </div>
        </div>
      </div>

      {/* <div className='mt-6 border border-gray-700'>
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
      </div> */}
    </div>
  );
};

export default MeetingDetail;
