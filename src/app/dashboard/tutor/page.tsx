"use client";

import { getMyStudents } from "@/api/services/home";
import { getActiveMeetings } from "@/api/services/meeting";
import MeetingSummary from "@/components/home/MeetingSummary";
import MyStudentsTable from "@/components/home/MyStudentsTable";
import MeetingDetail from "@/components/meeting/MeetingDetail";
import { MyStudent } from "@/model/home";
import { Meeting } from "@/model/meeting";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function TutorMainPage() {
  const [loading, setLoading] = useState(false);
  const [myStudents, setMyStudents] = useState<MyStudent[]>([]);
  const [activeMeetings, setActiveMeetings] = useState<Meeting[]>([]);
  const [viewMeeting, setViewMeeting] = useState<Meeting | null>(null);
  const { user, getUserId, viewUser } = useUserStore();
  const [userId, setUserId] = useState<number | null>(null);

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
    setUserId(userId);
  }, [user, viewUser]);

  useEffect(() => {
    fetchMyStudents();
    fetchMyMeetings();
  }, [userId]);

  const fetchMyStudents = async () => {
    try {
      if (userId) {
        const response = await getMyStudents(userId);
        setMyStudents(response.myStudents);
      }
    } catch (error) {
      console.log("error fetching students", error);
    }
  };

  const fetchMyMeetings = async () => {
    try {
      if (userId) {
        const response = await getActiveMeetings(userId);
        setActiveMeetings(response.meetings);
      }
    } catch (error) {
      console.log("error fetching meetings", error);
    }
  };

  const handleViewProfile = async (userId: number) => {
    // const response = await
  };

  const handleViewMeetingDetail = (meeting: Meeting) => {
    if (meeting) {
      setViewMeeting(meeting);
    }
  };

  return (
    <div className='w-full h-full relative'>
      <div className='absolute top-0 left-0 right-0 bottom-0 sm:py-4 py-2 px-4'>
        {viewMeeting ?
          <MeetingDetail
            meeting={viewMeeting}
            onBack={() => setViewMeeting(null)}
          />
        : <div className='flex flex-col gap-5 h-full'>
            <div className='flex flex-col min-h-0 overflow-hidden sm:flex-1 flex-grow rounded-3xl bg-homeItem basis- px-5 py-3 sm:py-5'>
              <MyStudentsTable
                loading={loading}
                myStudents={myStudents}
              />
            </div>
            <div className='flex flex-col sm:h-auto h-[240px] overflow-hidden sm:flex-1 rounded-3xl bg-homeItem p-4 sm:py-5'>
              <div className='col-span-2 row-span-4 sm:row-span-6 h-full'>
                <MeetingSummary
                  meetings={activeMeetings}
                  onClick={(meeting) => handleViewMeetingDetail(meeting)}
                />
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}
