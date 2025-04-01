import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import MeetingDropdown from "./MeetingDropdown";
import AddStudent from "./AddStudent";
import { FiArrowLeft } from "react-icons/fi";
import ProfilePic from "./ProfilePic";
import { RxCross1, RxCross2 } from "react-icons/rx";
import InputFieldType1 from "../inputfields/InputFieldType1";

interface Student {
  id: number;
  name: string;
  profileUrl: string;
}

interface Props {
  onBack: () => void;
  isOpen: boolean;
}

const CreateMeetingForm = ({ onBack, isOpen }: Props) => {
  const [studentOverlay, setStudentOverlay] = useState(false);
  const [assignedStudents, setAssignedStudents] = useState<Student[]>([]);

  const handleRemove = (id: number) => {
    setAssignedStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const handleCreate = () => {};

  return (
    <div>
      {/* Background Overlay */}
      {isOpen && (
        <div
          className='bg-black/70 w-full h-full fixed top-0 left-0 z-10'
          onClick={onBack}
        ></div>
      )}

      {/* Sliding Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen bg-formBackground md:w-[750px] p-14 w-svw z-20 
        transform transition-transform duration-500 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"} `}
      >
        <div className='flex flex-col'>
          {/* Back Button */}

          <div className='pb-8'>
            <FiArrowLeft
              size={48}
              className='text-backgroundOpposite bg-transparent border border-backgroundOpposite rounded-full p-3 hover:text-theme hover:border-theme cursor-pointer transition-200'
              onClick={onBack}
            />
          </div>

          {/* Header */}
          <div className='pb-8'>
            <h2 className='text-3xl font-semibold text-primaryText'>
              Create Meeting
            </h2>
            <div className='bg-theme w-16 h-1'></div>
          </div>

          {/* Form */}
          <div className='grid grid-cols-2 w-full gap-x-10 gap-y-6'>
            <div className='flex flex-col'>
              <label htmlFor=''>Time</label>
              <input
                className='border p-2 rounded-lg border-inputBorder bg-transparent'
                type='time'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor=''>Date</label>
              <input
                className='border p-2 rounded-lg border-inputBorder bg-transparent'
                type='date'
              />
            </div>
            <MeetingDropdown
              label='Meeting Type'
              options={["Virtual", "Physical"]}
              placeholder='Meeting Type'
            />
            <div className='flex flex-col'>
              <label htmlFor=''>Loation</label>
              <input
                className='border p-2 rounded-lg border-inputBorder bg-transparent'
                type='text'
              />
            </div>
            <MeetingDropdown
              label='Platform'
              options={["Zoom", "Teams", "Google Meet"]}
              placeholder='Platform'
            />
            <div className='flex flex-col'>
              <label htmlFor=''>Link</label>
              <input
                className='border p-2 rounded-lg border-inputBorder bg-transparent'
                type='text'
              />
            </div>

            <div className='col-span-2'>
              <button
                className='p-2 bg-theme text-white'
                onClick={() => setStudentOverlay(true)}
              >
                {assignedStudents.length > 0 ? "Edit" : "Assign"} Student
              </button>
              {/* Assigned Student Box */}
              <div className='border border-inputBorder h-24 w-full flex flex-wrap content-start gap-x-2 gap-y-2 p-1 overflow-y-auto scrollbar-cus-1 select-none'>
                {assignedStudents.length > 0 ?
                  assignedStudents.map((student) => (
                    <div
                      key={student.id}
                      className='flex items-center gap-2 px-3 bg-meetingCard h-8 text-white rounded-sm'
                    >
                      <ProfilePic
                        profileUrl={student.profileUrl}
                        size={20}
                      />
                      <span className=''>{student.name}</span>
                      <RxCross2
                        size={22}
                        className='cursor-pointer'
                        onClick={() => handleRemove(student.id)}
                      />
                    </div>
                  ))
                : <p className='text-sm text-secondaryText p-1'>
                    No student assigned to the meeting yet
                  </p>
                }
              </div>
            </div>
          </div>
          <div className='pt-5'>
            <button
              className='p-2 bg-theme w-full text-white'
              onClick={handleCreate}
            >
              Create
            </button>
          </div>
        </div>
      </div>

      {studentOverlay && (
        <AddStudent
          onBack={() => setStudentOverlay(false)}
          onAdd={(students) => {
            setAssignedStudents(students);
            setStudentOverlay(false);
          }}
          preSelectedStudents={assignedStudents}
        />
      )}
    </div>
  );
};

export default CreateMeetingForm;
