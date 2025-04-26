"use client";

import { getMyStudents } from "@/api/services/home";
import { getActiveMeetings } from "@/api/services/meeting";
import MeetingSummary from "@/components/home/MeetingSummary";
import MyStudentsTable from "@/components/home/MyStudentsTable";
import MeetingDetail from "@/components/meeting/MeetingDetail";
import { MyStudent } from "@/model/home";
import { Meeting } from "@/model/meeting";
import { useToast } from "@/stores/useToast";
import { useUserStore } from "@/stores/useUserStore";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function TutorMainPage() {
  const [studentLoading, setStudentLoading] = useState(false);
  const [meetingLoading, setMeetingLoading] = useState(false);
  const [myStudents, setMyStudents] = useState<MyStudent[]>([]);
  const [activeMeetings, setActiveMeetings] = useState<Meeting[]>([]);
  const [viewMeeting, setViewMeeting] = useState<Meeting | null>(null);
  const { user, getUserId, viewUser } = useUserStore();
  const [userId, setUserId] = useState<number | null>(null);
  const { showToast } = useToast();

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
    setStudentLoading(true);
    try {
      if (userId) {
        const response = await getMyStudents(userId);
        setMyStudents(response.myStudents);
      }
    } catch (error) {
      console.log("error fetching students", error);
    } finally {
      setStudentLoading(false);
    }
  };

  const fetchMyMeetings = async () => {
    setMeetingLoading(true);
    try {
      if (userId) {
        const response = await getActiveMeetings(userId);
        setActiveMeetings(response.meetings);
      }
    } catch (error) {
      console.log("error fetching meetings", error);
    } finally {
      setMeetingLoading(false);
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

  const handleDeleteMeeting = (meetingId: any) => {
    setActiveMeetings((prevMeetings) =>
      prevMeetings.filter((meeting) => meeting.id !== meetingId)
    );
    showToast("Meeting delete successfully", "success");
  };

  return (
    <div className="w-full h-full relative">
      <div className="absolute top-0 left-0 right-0 bottom-0 sm:py-4 py-2 px-4">
        {viewMeeting ? (
          <MeetingDetail
            meeting={viewMeeting}
            onBack={() => setViewMeeting(null)}
            onDelete={(meetingId) => handleDeleteMeeting(meetingId)}
          />
        ) : (
          <div className="flex flex-col gap-5 h-full">
            <div className="flex flex-col min-h-0 overflow-hidden sm:flex-1 flex-grow rounded-3xl bg-homeItem basis- px-5 py-3 sm:py-5">
              <MyStudentsTable
                loading={studentLoading}
                myStudents={myStudents}
              />
            </div>
            <div className="flex flex-col sm:h-auto h-[240px] overflow-hidden sm:flex-1 rounded-3xl bg-homeItem p-4 sm:py-5">
              <div className="col-span-2 row-span-4 sm:row-span-6 h-full">
                <MeetingSummary
                  meetings={activeMeetings}
                  onClick={(meeting) => handleViewMeetingDetail(meeting)}
                  loading={meetingLoading}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
