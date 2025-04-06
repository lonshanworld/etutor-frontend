"use client";

import MeetingSummary from "@/components/home/MeetingSummary";
import { activeMeetingData } from "@/components/meeting/data";
import ProfilePic from "@/components/ProfilePic";
import { MdOutlineMessage } from "react-icons/md";

export default function StaffMainPage() {
  return (
    <div className='w-full h-full relative'>
      <div className='absolute top-0 left-0 right-0 bottom-0 h-full px-5 py-3 overflow-clip'>
        <div className='sm:grid max-sm:flex max-sm:flex-col justify-between grid-cols-1 grid-rows-10 space-y-5 w-full h-full'>
          <div className='w-full h-full flex flex-col row-span-6 sm:row-span-4'>
            <div className=''>
              <div className='text-2xl sm:hidden font-semibold text-secondaryText'>
                Home
              </div>
              <div className='bg-theme w-10 h-1'></div>
              <div className='pb-3'></div>
              <div className='flex w-full text-xl font-semibold pb-3 pl-5 max-sm:hidden'>
                My Tutor
              </div>
            </div>
            <div className='flex gap-5 h-full max-sm:flex-col'>
              {/* left */}
              <div className='flex flex-col rounded-3xl bg-homeItem basis-1/2 px-5 py-3 sm:py-5'>
                <div className='flex w-full text-base font-semibold pb-2 sm:hidden'>
                  My Tutor
                </div>
                {/* Profile */}
                <div className='flex gap-4 items-center pb-3'>
                  <div className='sm:hidden'>
                    <ProfilePic
                      profileUrl={"https://i.pravatar.cc/300?img=18"}
                      size={40}
                    />
                  </div>
                  <div className='max-sm:hidden'>
                    <ProfilePic
                      profileUrl={"https://i.pravatar.cc/300?img=18"}
                      size={60}
                    />
                  </div>
                  <div className='flex flex-col'>
                    <p className='sm:text-lg font-semibold text-primaryText'>
                      Kristin
                    </p>
                    <p className='text-sm'>active</p>
                  </div>
                </div>

                {/* info */}
                <div className='grid grid-cols-2 grid-rows-2 h-full gap-3'>
                  <div className='flex flex-col justify-center'>
                    <p className='text-base font-semibold pb-1'>Subject</p>
                    <p className='text-secondaryText text-md'>History</p>
                  </div>
                  <div className='flex flex-col justify-center'>
                    <p className='text-base font-semibold pb-1'>
                      Qualification
                    </p>
                    <p className='text-secondaryText text-md'>
                      B.Sc (Hons) Computing
                    </p>
                  </div>
                  <div className='flex flex-col justify-center'>
                    <p className='text-base font-semibold pb-1'>Start Date</p>
                    <p className='text-secondaryText text-md'>12/12/2000</p>
                  </div>
                  <div className='flex flex-col justify-center'>
                    <p className='text-base font-semibold pb-1'>Experience</p>
                    <p className='text-secondaryText text-md'>3 years</p>
                  </div>
                </div>
              </div>

              {/* right */}
              <div className='flex flex-col rounded-3xl bg-homeItem basis-1/2 px-5 py-3 sm:py-5'>
                {/* Profile */}
                <div className='flex gap-4 items-center sm:h-[60px] font-semibold'>
                  Contact Information
                </div>

                {/* info */}
                <div className='grid grid-cols-2 grid-rows-2 h-full'>
                  <div className='flex flex-col justify-center'>
                    <p className='font-semibold'>Email</p>
                    <p className='text-md'>kristin@example.com</p>
                  </div>
                  <div className='flex flex-col justify-center'>
                    <p className='font-semibold'>Phone No.</p>
                    <p className='text-md'>123-456-777</p>
                  </div>
                  <div className='pt-2'>
                    <button className='flex items-center gap-5 bg-grayToggle text-gray-600 rounded-lg shadow-md px-6 py-3'>
                      <MdOutlineMessage size={24} />

                      <span className='text-base text-iconGray'>Message</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-span-2 row-span-4 sm:row-span-6'>
            <MeetingSummary meetings={activeMeetingData} />
          </div>
        </div>
      </div>
    </div>
  );
}
