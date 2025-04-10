import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import MeetingList from "./MeetingList";
import { Button } from "../ui/button";
import CreateMeetingForm from "./CreateMeetingForm";
import MeetingDetail from "./MeetingDetail";
import { Meeting as MeetingType } from "@/model/meeting";
import { useUserStore } from "@/stores/useUserStore";
import { getActiveMeetings, getHistoryMeetings } from "@/api/services/meeting";

const Meeting = () => {
  const [activeTab, setActiveTab] = useState<"active" | "history">("active");
  const [viewDetail, setViewDetail] = useState<MeetingType | null>(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [meetings, setMeetings] = useState<MeetingType[]>([]);
  const { user } = useUserStore();

  const fetchActiveMeetings = async () => {
    try {
      const response = await getActiveMeetings();
      setMeetings(response.meetings);
    } catch (error) {
      console.log("Error Fetching active meetings");
    }
  };

  const fetchHistoryMeetings = async () => {
    try {
      const response = await getHistoryMeetings();
      setMeetings(response.meetings);
    } catch (error) {
      console.log("Error Fetching history meetings");
    }
  };

  const handleNewMeetingCreated = (newMeeting: any) => {
    setMeetings((prevMeetings) => [newMeeting, ...prevMeetings]);
  };

  useEffect(() => {
    activeTab === "active" ? fetchActiveMeetings() : fetchHistoryMeetings();
  }, [activeTab]);

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
              onBack={() => setViewDetail(null)}
              meeting={viewDetail}
            />
          : <div className='flex flex-col w-full'>
              <NavBar
                onSelectTab={setActiveTab}
                selectedTab={activeTab}
              />

              <MeetingList
                meetings={meetings}
                viewDetail={(meeting) => handleViewDetail(meeting)}
              />

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
