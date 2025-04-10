"use client";

import { getMyTutor } from "@/api/services/home";
import { getActiveMeetings } from "@/api/services/meeting";
import MeetingSummary from "@/components/home/MeetingSummary";
import MeetingDetail from "@/components/meeting/MeetingDetail";
import ProfilePic from "@/components/ProfilePic";
import { MyTutor } from "@/model/home";
import { Meeting } from "@/model/meeting";
import { useEffect, useState } from "react";
import { MdOutlineMessage } from "react-icons/md";

export default function StudentMainPage() {
  const [activeMeetings, setActiveMeetings] = useState<Meeting[]>([]);
  const [myTutorInfo, setMyTutorInfo] = useState<MyTutor>();
  const [viewMeeting, setViewMeeting] = useState<Meeting | null>(null);

  useEffect(() => {
    fetchMyMeetings();
    fetchMyTutor();
  }, []);

  const fetchMyMeetings = async () => {
    try {
      const response = await getActiveMeetings();
      setActiveMeetings(response.meetings);
    } catch (error) {
      console.log("error fetching meetings");
    }
  };

  const fetchMyTutor = async () => {
    try {
      // const response = await getMyTutor();
      // setMyTutorInfo(response)
    } catch (error) {
      console.log(error);
    }
  };

  const handleView = (meeting: Meeting) => {
    if (meeting) {
      setViewMeeting(meeting);
    }
  };

  return (
    <div className='w-full h-full relative'>
      <div className='absolute inset-0 px-3 py-3 md:px-5 overflow-auto'>
        {viewMeeting ?
          <MeetingDetail
            meeting={viewMeeting}
            onBack={() => setViewMeeting(null)}
          />
        : <div className='flex flex-col gap-4 min-h-full'>
            {/* Header */}
            <div className='sm:hidden px-1'>
              <div className='text-2xl font-semibold text-secondaryText'>
                Home
              </div>
              <div className='bg-theme w-9 h-1'></div>
            </div>
            <div className='hidden sm:flex w-full text-xl font-semibold pl-5 mb-2'>
              My Tutor
            </div>

            {/* Top section */}
            <div className='flex flex-col md:flex-row gap-4 flex-1'>
              {/* Left card - Tutor Profile */}
              <div className='flex flex-col rounded-3xl bg-homeItem p-4 flex-1'>
                <div className='flex w-full text-base font-semibold pb-2 sm:hidden'>
                  My Tutor
                </div>

                {/* Profile */}
                <div className='flex gap-4 items-center pb-4'>
                  <div className='sm:hidden'>
                    <ProfilePic
                      profileUrl={"https://i.pravatar.cc/300?img=18"}
                      size={40}
                    />
                  </div>
                  <div className='hidden sm:block'>
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

                {/* Info */}
                <div className='grid grid-cols-2 gap-4 flex-1'>
                  <div className='flex flex-col'>
                    <p className='text-base font-semibold pb-1'>Subject</p>
                    <p className='text-secondaryText text-md'>History</p>
                  </div>
                  <div className='flex flex-col'>
                    <p className='text-base font-semibold pb-1'>
                      Qualification
                    </p>
                    <p className='text-secondaryText text-md'>
                      B.Sc (Hons) Computing
                    </p>
                  </div>
                  <div className='flex flex-col'>
                    <p className='text-base font-semibold pb-1'>Start Date</p>
                    <p className='text-secondaryText text-md'>12/12/2000</p>
                  </div>
                  <div className='flex flex-col'>
                    <p className='text-base font-semibold pb-1'>Experience</p>
                    <p className='text-secondaryText text-md'>3 years</p>
                  </div>
                </div>
              </div>

              {/* Right card - Contact Info */}
              <div className='flex flex-col rounded-3xl bg-homeItem p-4 flex-1'>
                <div className='font-semibold text-base sm:text-lg mb-4'>
                  Contact Information
                </div>

                <div className='grid sm:grid-cols-2 gap-4 mb-4 flex-1'>
                  <div className='flex flex-col'>
                    <p className='font-semibold'>Email</p>
                    <p className='text-md'>kristin@example.com</p>
                  </div>
                  <div className='flex flex-col'>
                    <p className='font-semibold'>Phone No.</p>
                    <p className='text-md'>123-456-777</p>
                  </div>
                </div>

                <div>
                  <button className='flex items-center gap-3 bg-grayToggle text-gray-600 rounded-lg shadow-md px-4 py-2'>
                    <MdOutlineMessage size={20} />
                    <span className='text-base text-iconGray'>Message</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom section - Meetings with fixed height on mobile */}
            <div className='flex flex-col rounded-3xl bg-homeItem p-4 h-[200px] md:h-auto md:flex-1 min-h-0 overflow-hidden'>
              <div className='col-span-2 row-span-4 sm:row-span-6 h-full'>
                <MeetingSummary
                  meetings={activeMeetings}
                  onClick={(meeting) => handleView(meeting)}
                />
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}
