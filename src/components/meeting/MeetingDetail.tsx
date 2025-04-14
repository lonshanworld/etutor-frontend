"use client";

import { Meeting } from "@/model/meeting";
import { formatDate, formatLink, formatTime } from "@/utils/formatData";
import { IoChevronBackOutline } from "react-icons/io5";
import ProfilePic from "../ProfilePic";
import { useUserStore } from "@/stores/useUserStore";

interface Props {
  meeting: Meeting;
  onBack: () => void;
}

const MeetingDetail = ({ meeting, onBack }: Props) => {
  const { user } = useUserStore();
  return (
    <div className='flex flex-col w-full h-full overflow-y-auto scrollbar-none'>
      {/* Back btn */}
      <div className='flex items-center gap-1 py-2 pb-2'>
        <div
          onClick={onBack}
          className='rounded-2xl flex items-center hover:bg-secondaryBackground'
        >
          <IoChevronBackOutline
            size={22}
            className='text-theme'
          />
          <span className='pl-2 pr-6 py-1 cursor-pointer text-theme text-lg'>
            Back
          </span>
        </div>
      </div>

      <div className='bg-primary-foreground px-7 py-4 mt-1 rounded-lg w-full h-full'>
        <div className='py-3 text-2xl font-semibold'>{meeting.subject}</div>

        {/* tutor profile */}
        <div className='flex gap-4 py-3 items-center'>
          <div>
            <ProfilePic
              profileUrl={meeting.creator.profile_picture}
              size={50}
            />
          </div>
          <div className=''>
            <p className='font-semibold'>{meeting.creator.name}</p>
            {user?.role === "tutor" && <p className='text-sm'>You</p>}
            {user?.role === "student" && <p className='text-sm'>Your Tutor</p>}
          </div>
        </div>

        {meeting.link && (
          <div className='py-3 flex'>
            <a
              href={formatLink(meeting.link)}
              target='_blank'
              rel='noopener noreferrer'
              className='bg-theme px-5 py-2.5 text-white rounded-lg block'
            >
              Meeting Link
            </a>
          </div>
        )}

        <table className='w-auto text-left border-2 border-inputBorder text-primaryText mt-2 tracking-wide text-[15px] min-w-[80%]'>
          <tbody>
            <tr className='bg-secondaryBackground  text-primaryText'>
              <th className='p-2 w-40 font-semibold border-r border-inputBorder'>
                Subject
              </th>
              <td className='py-2 px-3'>{meeting.subject}</td>
            </tr>
            <tr className='bg-background'>
              <th className='p-2 font-semibold border-r border-inputBorder'>
                Time
              </th>
              <td className='py-2 px-3'>
                {`${formatDate(meeting.date)} ${formatTime(meeting.time)}`}
              </td>
            </tr>
            <tr className='bg-secondaryBackground'>
              <th className='p-2 font-semibold border-r border-inputBorder'>
                Students
              </th>
              <td className='py-2 px-3'>
                {meeting.participants.map((student) => student.name).join(", ")}
              </td>
            </tr>
            <tr className='bg-background'>
              <th className='p-2 font-semibold border-r border-inputBorder'>
                Meeting Type
              </th>
              <td className='py-2 px-3'>{meeting.type}</td>
            </tr>
            <tr className='bg-secondaryBackground'>
              <th className='p-2 font-semibold border-r border-inputBorder'>
                Location
              </th>
              <td className='py-2 px-3'>{meeting.location || "-"}</td>
            </tr>
            <tr className='bg-background'>
              <th className='p-2 font-semibold border-r border-inputBorder'>
                Platform
              </th>
              <td className='py-2 px-3'>{meeting.platform || "-"}</td>
            </tr>
            <tr className='bg-secondaryBackground'>
              <th className='p-2 font-semibold border-r border-inputBorder'>
                Meeting Link
              </th>
              <td className='py-2 px-3'>
                {meeting.link ?
                  <a
                    href={formatLink(meeting.link)}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-600 hover:underline'
                  >
                    {meeting.link}
                  </a>
                : "-"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MeetingDetail;
