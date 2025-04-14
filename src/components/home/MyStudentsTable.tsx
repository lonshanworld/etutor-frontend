import { MyStudent } from "@/model/home";
import ProfilePic from "../ProfilePic";
import { formatName } from "@/utils/formatData";
import { useUserStore } from "@/stores/useUserStore";
import { useState } from "react";
import ProfileBoxPopup from "../popup/ProfileBoxPopup";

interface Props {
  loading: boolean;
  myStudents: MyStudent[];
}

const MyStudentsTable = ({ loading, myStudents }: Props) => {
  const { user } = useUserStore();
  const [profilePopup, setProfilePopup] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  const handleViewProfile = (userId: number) => {
    setProfilePopup(true);
    setUserId(userId);
  };

  return (
    <>
      <h2 className='font-semibold text-primaryText px-2 pb-3 text-lg'>
        My Students
      </h2>
      <div className='sm:rounded-t-xl overflow-hidden'>
        <div className='h-full w-full overflow-auto'>
          <div className='min-w-[700px]'>
            {profilePopup && (
              <ProfileBoxPopup
                className='right-40'
                userId={userId || 0}
                onClose={() => setProfilePopup(false)}
              />
            )}
            <table className='w-full table-auto bg-background sm:rounded-t-lg relative'>
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
                      <td className='max-md:hidden'>{student.phone_number}</td>
                      <td className='text-center realtive'>
                        <button
                          onClick={() => handleViewProfile(student.user_id)}
                          className='px-2 py-1.5 rounded-md text-white bg-theme hover:bg-optionBgHover'
                        >
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
    </>
  );
};

export default MyStudentsTable;
