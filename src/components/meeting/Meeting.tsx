"use client";

import { getActiveMeetings, getHistoryMeetings } from "@/api/services/meeting";
import { Meeting as MeetingType } from "@/model/meeting";
import { useToast } from "@/stores/useToast";
import { useUserStore } from "@/stores/useUserStore";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import CreateMeetingForm from "./CreateMeetingForm";
import MeetingDetail from "./MeetingDetail";
import MeetingList from "./MeetingList";
import NavBar from "./NavBar";

const Meeting = () => {
  const [activeTab, setActiveTab] = useState<"active" | "history">("active");
  const [viewDetail, setViewDetail] = useState<MeetingType | null>(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [meetings, setMeetings] = useState<MeetingType[]>([]);
  const { user, getUserId, viewUser } = useUserStore();
  const [userId, setUserId] = useState<null | number>(null);
  const [isLoading, setLoading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const encodedUser = Cookies.get("viewUser");

    if (encodedUser) {
      const decodedUser = decodeURIComponent(encodedUser);
      const userObject = JSON.parse(decodedUser);
      const viewUserId = userObject.id;
      setUserId(viewUserId);
      return;
    }

    const userId = getUserId();
    if (userId) {
      setUserId(userId);
    }
  }, [user, viewUser]);

  const fetchActiveMeetings = async () => {
    setLoading(true);
    try {
      if (userId) {
        const response = await getActiveMeetings(userId);
        setMeetings(response.meetings);
      }
    } catch (error) {
      showToast("Error fetching active meetings", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchHistoryMeetings = async () => {
    setLoading(true);
    try {
      const userId = getUserId();
      if (userId) {
        const response = await getHistoryMeetings(userId);
        setMeetings(response.meetings);
      }
    } catch (error) {
      showToast("Error fetching meeting history", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleNewMeetingCreated = (newMeeting: any) => {
    if (activeTab === "active") {
      setMeetings((prevMeetings) => [newMeeting, ...prevMeetings]);
    }
  };

  const handleDeleteMeeting = (meetingId: any) => {
    setMeetings((prevMeetings) =>
      prevMeetings.filter((meeting) => meeting.id !== meetingId)
    );
    showToast("Meeting delete successfully", "success");
  };

  useEffect(() => {
    activeTab === "active" ? fetchActiveMeetings() : fetchHistoryMeetings();
  }, [activeTab, userId]);

  const handleViewDetail = (meeting: MeetingType) => {
    if (meeting) {
      setViewDetail(meeting);
    }
  };

  return (
    <>
      <div className='w-full h-full relative'>
        <div className='absolute top-0 left-0 right-0 bottom-0 flex flex-row sm:py-4 py-2 px-4'>
          {viewDetail ?
            <MeetingDetail
              meeting={viewDetail}
              onBack={() => setViewDetail(null)}
              onDelete={(meetingId) => handleDeleteMeeting(meetingId)}
            />
          : <div className='flex flex-col w-full'>
              <NavBar
                onSelectTab={setActiveTab}
                selectedTab={activeTab}
              />
              {isLoading ?
                <div className='flex justify-center items-center w-full h-full'>
                  Loading...
                </div>
              : <MeetingList
                  meetings={meetings}
                  viewDetail={(meeting) => handleViewDetail(meeting)}
                />
              }

              {user?.role === "tutor" && (
                <div className='flex justify-end pt-4 w-full bg-secondaryBackground absolute bottom-0 right-0'>
                  <Button
                    onClick={() => setOpenCreate(true)}
                    size='default'
                    className='mr-12 mb-8 max-lg:mb-4 max-md:mr-4 text-primaryText sm:text-lg md:p-6 text-white'
                  >
                    Create Meeting
                  </Button>
                </div>
              )}

              {user?.role === "tutor" && (
                <CreateMeetingForm
                  isOpen={openCreate}
                  onBack={() => setOpenCreate(false)}
                  onNewMeetingCreated={handleNewMeetingCreated}
                />
              )}
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default Meeting;
