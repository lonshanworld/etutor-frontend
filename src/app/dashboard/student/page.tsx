"use client";

import { getMyTutor } from "@/api/services/home";
import { getActiveMeetings } from "@/api/services/meeting";
import MeetingSummary from "@/components/home/MeetingSummary";
import MeetingDetail from "@/components/meeting/MeetingDetail";
import ProfilePic from "@/components/ProfilePic";
import { MyTutor } from "@/model/home";
import { Meeting } from "@/model/meeting";
import { useUserStore } from "@/stores/useUserStore";
import { formatName } from "@/utils/formatData";
import { useMutation } from "convex/react";
import { useEffect, useState } from "react";
import { MdOutlineMessage } from "react-icons/md";
import { api } from "../../../../convex/_generated/api";
import { AppRouter } from "@/router";
import { useRouter } from "next/navigation";

export default function StudentMainPage() {
  const [activeMeetings, setActiveMeetings] = useState<Meeting[]>([]);
  const [myTutorInfo, setMyTutorInfo] = useState<MyTutor | null>(null);
  const [viewMeeting, setViewMeeting] = useState<Meeting | null>(null);
  const { user } = useUserStore();
  const createConversation = useMutation(api.chatRoom.createConversation);
  const router = useRouter();

  useEffect(() => {
    fetchMyMeetings();
    fetchMyTutor();
  }, []);

  const fetchMyMeetings = async () => {
    try {
      const response = await getActiveMeetings();
      setActiveMeetings(response.meetings);
    } catch (error) {
      console.log("error fetching meetings", error);
    }
  };

  const fetchMyTutor = async () => {
    try {
      const response = await getMyTutor();
      setMyTutorInfo(response);
    } catch (error) {
      console.log("error fetching my tutor", error);
    }
  };

  const handleView = (meeting: Meeting) => {
    if (meeting) {
      setViewMeeting(meeting);
    }
  };

  const handleChat = async () => {
    if (!user || !myTutorInfo) return;

    const user1 = {
      userId: user.id,
      firstName: user.firstName!,
      middleName: user.middleName ?? undefined,
      lastName: user.lastName ?? undefined,
      email: user.email,
      role: user.role!,
      profileImagePath: user.profileImagePath ?? undefined,
      gender: user.gender,
    };
    const user2 = {
      userId: myTutorInfo.user_id,
      firstName: myTutorInfo.first_name!,
      middleName: myTutorInfo.middle_name ?? undefined,
      lastName: myTutorInfo.last_name ?? undefined,
      email: myTutorInfo.email,
      role: myTutorInfo.role_name!,
      profileImagePath: myTutorInfo.profile_picture ?? undefined,
      gender: myTutorInfo.gender ?? undefined,
    };

    try {
      const chatId = await createConversation({
        user1,
        user2,
      });

      if (user.role === "student") {
        router.push(`${AppRouter.studentChatBox}?id=${chatId}`);
      } else if (user.role === "tutor") {
        router.push(`${AppRouter.tutorChatBox}?id=${chatId}`);
      }
    } catch (error) {
      console.error("error in chat", error);
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
                      profileUrl={myTutorInfo?.profile_picture || null}
                      size={40}
                    />
                  </div>
                  <div className='hidden sm:block'>
                    <ProfilePic
                      profileUrl={myTutorInfo?.profile_picture || null}
                      size={60}
                    />
                  </div>
                  <div className='flex flex-col'>
                    <p className='sm:text-lg font-semibold text-primaryText'>
                      {formatName(
                        myTutorInfo?.first_name,
                        myTutorInfo?.middle_name,
                        myTutorInfo?.last_name
                      )}
                    </p>
                    {/* <p className='text-sm'>active</p> */}
                  </div>
                </div>

                {/* Info */}
                <div className='grid grid-cols-2 gap-4 flex-1'>
                  <div className='flex flex-col'>
                    <p className='text-base font-semibold pb-1'>Subject</p>
                    <p className='text-secondaryText text-md'>
                      {myTutorInfo?.subject_name || "-"}
                    </p>
                  </div>
                  <div className='flex flex-col'>
                    <p className='text-base font-semibold pb-1'>
                      Qualification
                    </p>
                    <p className='text-secondaryText text-md'>
                      {myTutorInfo?.qualification || "-"}
                    </p>
                  </div>
                  <div className='flex flex-col'>
                    <p className='text-base font-semibold pb-1'>Experience</p>
                    <p className='text-secondaryText text-md'>
                      {myTutorInfo?.experience || "-"}
                    </p>
                  </div>
                  <div className='flex flex-col'>
                    {/* <p className='text-base font-semibold pb-1'>Start Date</p>
                    <p className='text-secondaryText text-md'>-</p> */}
                  </div>
                </div>
              </div>

              {/* Right card - Contact Info */}
              <div className='flex flex-col rounded-3xl bg-homeItem p-4 flex-1'>
                <div className='font-semibold text-base sm:text-lg sm:mb-10 mb-4'>
                  Contact Information
                </div>

                <div className='grid sm:grid-cols-2 gap-4 mb-4 h-auto'>
                  <div className='flex flex-col'>
                    <p className='font-semibold pb-1'>Email</p>
                    <p className='text-md text-secondaryText'>
                      {myTutorInfo?.email || "-"}
                    </p>
                  </div>
                  <div className='flex flex-col'>
                    <p className='font-semibold pb-1'>Phone No.</p>
                    <p className='text-md text-secondaryText'>
                      {myTutorInfo?.phone_number || "-"}
                    </p>
                  </div>
                </div>

                <div className='flex sm:pt-10'>
                  <button
                    onClick={handleChat}
                    className='flex items-center gap-3 bg-grayToggle text-gray-600 rounded-lg shadow-md px-4 py-2'
                  >
                    <MdOutlineMessage size={20} />
                    <span className='text-base text-black'>Message</span>
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
