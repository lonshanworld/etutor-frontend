"use client";

import { Meeting } from "@/model/meeting";
import MeetingBox from "./MeetingBox";

interface Props {
  meetings: Meeting[];
  viewDetail: (meeting: Meeting) => void;
}

const MeetingList = ({ meetings, viewDetail }: Props) => {
  return (
    <>
      {meetings.length > 0 ?
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-12 gap-y-6 overflow-y-auto scrollbar-none pb-4 lg:mb-[78px] mb-16'>
          {meetings.map((meeting) => (
            <MeetingBox
              key={meeting.id}
              meetingName={meeting.subject}
              date={meeting.date}
              time={meeting.time}
              meetingType={meeting.type}
              platform={meeting.platform}
              onClick={() => viewDetail(meeting)}
            />
          ))}
        </div>
      : <div className=''>No meetings</div>}
    </>
  );
};

export default MeetingList;
