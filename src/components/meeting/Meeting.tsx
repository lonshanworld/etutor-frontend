import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import MeetingList from "./MeetingList";
import { Button } from "../ui/button";
import CreateMeetingForm from "./CreateMeetingForm";
import { activeMeetingData, historyMeetingData } from "./data";
import MeetingDetail from "./MeetingDetail";
import { meetingProps } from "./MeetingDetail";
import { Meeting as MeetingType } from "@/model/meeting";

const Meeting = () => {
  const [activeTab, setActiveTab] = useState<"active" | "history">("active");
  const [viewDetail, setViewDetail] = useState<meetingProps | null>(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [meetings, setMeetings] = useState<MeetingType[]>(activeMeetingData);

  useEffect(() => {
    setMeetings(
      activeTab === "active" ? activeMeetingData : historyMeetingData
    );
  }, [activeTab]);

  const handleViewDetail = (id: number) => {
    console.log("ID", id);
    // route.push?

    const meetingDetail: meetingProps = {
      id: 1,
      profileUrl: "https://i.pravatar.cc/300?img=18",
      tutorName: "Serius Black",
      tutorQualification: "Qualification",
      subject: "Mobile App Development",
      time: "12/2/2025 12:00pm",
      studentList: ["student 1", "student 2"],
      meetingType: "Virtual",
      location: "",
      platform: "Google Meet",
      meetingLink: "www.google.com",
    };

    setViewDetail(meetingDetail);
  };

  return (
    <>
      <div className='w-full h-full relative'>
        <div className='absolute top-0 left-0 right-0 bottom-0 flex flex-row sm:py-4 py-2 px-4'>
          {viewDetail ?
            <MeetingDetail
              onBack={() => setViewDetail(null)}
              {...viewDetail}
            />
          : <div className='flex flex-col md:px-8 w-full'>
              <NavBar
                onSelectTab={setActiveTab}
                selectedTab={activeTab}
              />

              <MeetingList
                meetings={meetings}
                viewDetail={handleViewDetail}
              />

              <div className='flex justify-end pt-4 w-full bg-secondaryBackground absolute bottom-0 right-0'>
                <Button
                  onClick={() => setOpenCreate(true)}
                  size='default'
                  className='mr-12 mb-8 max-lg:mb-4 max-md:mr-4 text-primaryText text-lg md:p-6'
                >
                  Create Meeting
                </Button>
              </div>

              <CreateMeetingForm
                isOpen={openCreate}
                onBack={() => setOpenCreate(false)}
              />
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default Meeting;
