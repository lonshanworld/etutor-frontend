"use client";

import MeetingBox from "./MeetingBox";

interface Meeting {
  id: number;
  meetingName: string;
  time: string;
  meetingType: string;
}

interface Props {
  // activeTab: "active" | "history";
  meetings: Meeting[];
  viewDetail: (id: number) => void;
}

const MeetingList = ({ meetings, viewDetail }: Props) => {
  return (
    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 overflow-y-auto scrollbar-none pb-4 lg:mb-[78px] mb-16'>
      {meetings.map((meeting) => (
        <MeetingBox
          key={meeting.id}
          meetingName={meeting.meetingName}
          time={meeting.time}
          meetingType={meeting.meetingType}
          onClick={() => viewDetail(meeting.id)}
        />
      ))}
    </div>
  );
};

export default MeetingList;
