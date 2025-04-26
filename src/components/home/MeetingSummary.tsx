import { Meeting } from "@/model/meeting";
import MeetingBox from "../meeting/MeetingBox";

interface Props {
  meetings: Meeting[];
  onClick: (meeting: Meeting) => void;
}

const MeetingSummary = ({ meetings, onClick }: Props) => {
  return (
    <div className='flex flex-col rounded-3xl bg-homeItem w-full h-full'>
      <div className='text-lg font-semibold pb-4 px-2'>Upcoming Meetings</div>
      <div className='max-sm:overflow-x-auto max-sm:overflow-y-hidden overflow-y-auto pb-2'>
        {meetings.length > 0 ?
          <div className='flex sm:grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-12 gap-y-6 scrollbar-none'>
            {meetings.map((meeting) => (
              <MeetingBox
                key={meeting.id}
                meetingName={meeting.subject}
                date={meeting.date}
                time={meeting.time}
                meetingType={meeting.type}
                platform={meeting.platform}
                onClick={() => onClick(meeting)}
              />
            ))}
          </div>
        : <div className='px-2 text-sm'>You have no upcoming meetings.</div>}
      </div>
    </div>
  );
};

export default MeetingSummary;
