"use client";

import { getMyTutor } from "@/api/services/home";
import { getActiveMeetings } from "@/api/services/meeting";
import MeetingSummary from "@/components/home/MeetingSummary";
import MeetingDetail from "@/components/meeting/MeetingDetail";
import ProfilePic from "@/components/ProfilePic";
import { MyTutor } from "@/model/home";
import { Meeting } from "@/model/meeting";
import { AppRouter } from "@/router";
import { useToast } from "@/stores/useToast";
import { useUserStore } from "@/stores/useUserStore";
import { formatName } from "@/utils/formatData";
import { useMutation } from "convex/react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineMessage } from "react-icons/md";
import { api } from "../../../../convex/_generated/api";

export default function StudentMainPage() {
  const createConversation = useMutation(api.chatRoom.createConversation);
  const [meetingLoading, setMeetingLoading] = useState(false);
  const [tutorLoading, setTutorLoading] = useState(false);
  const [activeMeetings, setActiveMeetings] = useState<Meeting[]>([]);
  const [myTutorInfo, setMyTutorInfo] = useState<MyTutor | null>(null);
  const [viewMeeting, setViewMeeting] = useState<Meeting | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const { user, getUserId, viewUser } = useUserStore();
  const { showToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    // for staff accessing other ppl dashboard
    if (viewUser) {
      const encodedUser = Cookies.get("viewUser");
      if (encodedUser) {
        const decodedUser = decodeURIComponent(encodedUser);
        const userObject = JSON.parse(decodedUser);
        const viewUserId = userObject.id;

        setUserId(viewUserId);
      }
      return;
    }

    const userId = getUserId();
    if (userId) {
      setUserId(userId);
    }
  }, [user, viewUser]);

  useEffect(() => {
    fetchMyMeetings();
    fetchMyTutor();
  }, [userId]);

  const fetchMyMeetings = async () => {
    setMeetingLoading(true);
    try {
      if (userId) {
        const response = await getActiveMeetings(userId);
        setActiveMeetings(response.meetings);
      }
    } catch (error) {
      showToast("Error fetching meetings", "error");
    } finally {
      setMeetingLoading(false);
    }
  };

  const fetchMyTutor = async () => {
    setTutorLoading(true);
    try {
      if (userId) {
        const response = await getMyTutor(userId);
        setMyTutorInfo(response);
      }
    } catch (error) {
      // showToast("Error fetching my tutor info", "error");
    } finally {
      setTutorLoading(false);
    }
  };

  const handleView = (meeting: Meeting) => {
    if (meeting) {
      setViewMeeting(meeting);
    }
  };

  const handleChat = async () => {
    if (!user || !myTutorInfo) return;

    try {
      const chatId = await createConversation({
        user1Id: user.id,
        user2Id: myTutorInfo.user_id,
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
            onDelete={() => undefined}
          />
        : <div className='flex flex-col min-h-full'>
            {/* Header */}
            <div className='sm:hidden px-1 pb-3'>
              <div className='text-2xl font-semibold text-secondaryText'>
                Home
              </div>
              <div className='bg-theme w-9 h-1'></div>
            </div>
            <div className='hidden sm:flex w-full text-2xl font-semibold pl-3 py-1 mb-2'>
              My Tutor
            </div>
            {tutorLoading ?
              <div className='rounded-3xl bg-homeItem p-4 sm:min-h-[300px] flex items-center justify-center'>
                Loading...
              </div>
            : myTutorInfo ?
              <>
                {/* Top section */}
                <div className='flex flex-col md:flex-row gap-4 min-h-[300px]'>
                  {/* Left card - Tutor Profile */}

                  <div className='flex flex-col rounded-3xl bg-homeItem p-4 flex-1'>
                    <div className='flex w-full text-lg font-semibold pb-3 sm:hidden'>
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
                    <div className='grid grid-cols-2 gap-4 flex-1 sm:p-4'>
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
                        <p className='text-base font-semibold pb-1'>
                          Experience
                        </p>
                        <p className='text-secondaryText text-md'>
                          {myTutorInfo?.experience ?
                            `${myTutorInfo?.experience} year${myTutorInfo?.experience > 1 && "s"}`
                          : "-"}
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
                    <div className='font-semibold text-base sm:text-xl sm:mb-8 mb-4 mt-2'>
                      Contact Information
                    </div>

                    <div className='grid sm:grid-cols-2 gap-4 mb-4 h-auto sm:p-4'>
                      <div className='flex flex-col'>
                        <p className='font-semibold pb-1'>Email</p>
                        <p
                          className={`text-md text-secondaryText ${myTutorInfo?.email && "underline"}`}
                        >
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

                    <div className='flex sm:pt-10 pt-3 sm:pl-4'>
                      <button
                        onClick={handleChat}
                        className='flex items-center gap-4 bg-grayToggle text-gray-600 rounded-lg shadow-md px-6 py-3'
                      >
                        <MdOutlineMessage
                          size={24}
                          className='text-secondaryText'
                        />
                        <span className='text-[17px] text-secondaryText'>
                          Message
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            : <div className='rounded-3xl bg-homeItem p-4 sm:h-[250px] h-[150px] flex items-center justify-center sm:text-lg'>
                No Tutor assigned to you yet
              </div>
            }

            {/* Bottom section */}
            <div className='flex flex-col rounded-3xl bg-homeItem p-4 h-[200px] md:h-auto md:flex-1 min-h-0 overflow-hidden mt-4'>
              <div className='col-span-2 row-span-4 sm:row-span-6 h-full'>
                <MeetingSummary
                  meetings={activeMeetings}
                  onClick={(meeting) => handleView(meeting)}
                  loading={meetingLoading}
                />
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}
