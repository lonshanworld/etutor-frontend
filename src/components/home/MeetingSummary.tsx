import React from "react";
import MeetingList from "../meeting/MeetingList";
import { Meeting } from "@/model/meeting";
import MeetingBox from "../meeting/MeetingBox";

interface Props {
  meetings: Meeting[];
}

const MeetingSummary = ({ meetings }: Props) => {
  return (
    <div className='flex flex-col rounded-3xl bg-homeItem w-full h-full p-6'>
      <div className='text-xl font-semibold pb-4'>Today Meeting</div>
      <div className='max-sm:overflow-x-auto max-sm:overflow-y-hidden overflow-y-auto'>
        <div className='flex sm:grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-12 gap-y-6 scrollbar-none'>
          {meetings.map((meeting) => (
            <MeetingBox
              key={meeting.id}
              meetingName={meeting.subject}
              date={meeting.date}
              time={meeting.time}
              meetingType={meeting.type}
              platform={meeting.platform}
              onClick={() => undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeetingSummary;
