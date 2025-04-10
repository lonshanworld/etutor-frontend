"use client";

import { getMyStudents } from "@/api/services/home";
import { getActiveMeetings } from "@/api/services/meeting";
import MeetingSummary from "@/components/home/MeetingSummary";
import MeetingDetail from "@/components/meeting/MeetingDetail";
import ProfilePic from "@/components/ProfilePic";
import { MyStudent } from "@/model/home";
import { Meeting } from "@/model/meeting";
import { formatName } from "@/utils/formatData";
import { useEffect, useState } from "react";

export default function TutorMainPage() {
  const [loading, setLoading] = useState(false);
  const [myStudents, setMyStudents] = useState<MyStudent[]>([]);
  const [activeMeetings, setActiveMeetings] = useState<Meeting[]>([]);
  const [viewMeeting, setViewMeeting] = useState<Meeting | null>(null);

  useEffect(() => {
    fetchMyStudents();
    fetchMyMeetings();
  }, []);

  const fetchMyStudents = async () => {
    try {
      const response = await getMyStudents();
      setMyStudents(response.myStudents);
    } catch (error) {
      console.log("error fetching students");
    }
  };

  const fetchMyMeetings = async () => {
    try {
      const response = await getActiveMeetings();
      setActiveMeetings(response.meetings);
    } catch (error) {
      console.log("error fetching meetings");
    }
  };

  const handleView = (meeting: Meeting) => {
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
              <h2 className='font-semibold text-primaryText px-2 pb-3 text-lg'>
                My Students
              </h2>
              <div className='sm:rounded-t-xl overflow-hidden'>
                <div className='h-full w-full overflow-auto'>
                  <div className='min-w-[700px]'>
                    <table className='w-full table-auto bg-background sm:rounded-t-lg'>
                      <thead className='bg-theme py-3 h-[45px] text-white'>
                        <tr className='border border-theme'>
                          <th className='ps-5 sm:w-[70px] text-left'>No</th>
                          <th className='text-left'>Name</th>
                          <th className='text-left'>Email</th>
                          <th className='text-left max-md:hidden'>Phone</th>
                          <th className=''>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ?
                          <tr>
                            <td
                              colSpan={5}
                              className='text-center py-10'
                            >
                              Loading...
                            </td>
                          </tr>
                        : myStudents.length > 0 ?
                          myStudents.map((student, index) => (
                            <tr
                              key={student.user_id}
                              className='border border-tableRowBorder h-[50px] sm:h-[70px] text-sm'
                            >
                              <td className='ps-5'>{index + 1}</td>
                              <td>
                                <div className='flex gap-2 items-center'>
                                  <ProfilePic
                                    profileUrl={student.profile_picture}
                                    size={26}
                                  />
                                  <span>
                                    {formatName(
                                      student.first_name,
                                      student.middle_name,
                                      student.last_name
                                    )}
                                  </span>
                                </div>
                              </td>
                              <td>{student.email}</td>
                              <td className='max-md:hidden'>
                                {student.phone_number}
                              </td>
                              <td className='text-center'>
                                <button className='px-2 py-1.5 rounded-md text-white bg-theme hover:bg-optionBgHover'>
                                  View profile
                                </button>
                              </td>
                            </tr>
                          ))
                        : <tr>
                            <td
                              colSpan={5}
                              className='text-center h-[200px]'
                            >
                              No students assigned to you yet.
                            </td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col sm:h-auto h-[200px] overflow-hidden sm:flex-1 rounded-3xl bg-homeItem px-5 py-3 sm:py-5'>
              <div className='col-span-2 row-span-4 sm:row-span-6 h-full'>
                <MeetingSummary
                  meetings={activeMeetings}
                  onClick={(meeting) => handleView(meeting)}
                />
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}
