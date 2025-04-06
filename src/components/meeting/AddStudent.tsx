"use client";

import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { RxCross1, RxCross2 } from "react-icons/rx";
import ProfilePic from "../ProfilePic";
import StudentListItem from "./StudentListItem";
import { getMyStudents } from "@/api/services/meeting";
import { useUserStore } from "@/stores/useUserStore";

interface myStudent {
  userId: number;
  studentId: number;
  name: string;
  profile_picture: string;
}

interface Props {
  onBack: () => void;
  onAdd: (assignedStudents: myStudent[]) => void;
  preSelectedStudents?: myStudent[];
}

const AddStudent = ({ onBack, onAdd, preSelectedStudents = [] }: Props) => {
  const [myStudentList, setMyStudentList] = useState<myStudent[]>([]);
  const [assignedStudents, setAssignedStudents] =
    useState<myStudent[]>(preSelectedStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const { user, getUserId } = useUserStore();

  const fetchMyStudent = async () => {
    if (user) {
      const response = await getMyStudents(user.id);
      setMyStudentList(response.myStudent);
    }
  };

  useEffect(() => {
    fetchMyStudent();
  }, []);

  useEffect(() => {
    setAssignedStudents(preSelectedStudents);
  }, [preSelectedStudents]);

  const handleSelect = (student: myStudent) => {
    setAssignedStudents((prev) => {
      return prev.some((s) => s.studentId === student.studentId) ?
          prev.filter((s) => s.studentId !== student.studentId)
        : [...prev, student];
    });
  };

  const handleRemove = (id: number) => {
    setAssignedStudents((prev) => prev.filter((s) => s.studentId !== id));
  };

  const filteredStudents = myStudentList.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div
        className='w-full h-full fixed top-0 left-0 z-10'
        onClick={onBack}
      ></div>

      <div className='fixed top-0 right-0 h-screen bg-formBackground md:w-[750px] p-14 w-svw z-20'>
        <div className='flex flex-col h-full'>
          {/* Back Button */}
          <div className='pb-8 flex justify-between items-center'>
            <FiArrowLeft
              size={48}
              className='text-backgroundOpposite bg-transparent border border-backgroundOpposite rounded-full p-3 hover:text-theme hover:border-theme cursor-pointer transition-200'
              onClick={onBack}
            />
            <button
              className='bg-theme px-4 py-2 text-white'
              onClick={() => onAdd(assignedStudents)}
            >
              Add
            </button>
          </div>

          {/* Assigned Student Box */}
          <p className='pb-1 text-primaryText font-semibold'>
            Assigned Students
          </p>
          <div className='border border-inputBorder h-36 w-full flex flex-wrap content-start gap-x-2 gap-y-2 p-1 overflow-y-auto scrollbar-cus-1 select-none'>
            {assignedStudents.length > 0 ?
              assignedStudents.map((student) => (
                <div
                  key={student.studentId}
                  className='flex items-center gap-2 px-3 bg-meetingCard h-8 text-white rounded-sm'
                >
                  <ProfilePic
                    profileUrl={student.profile_picture}
                    size={20}
                  />
                  <span className=''>{student.name}</span>
                  <RxCross2
                    size={22}
                    className='cursor-pointer'
                    onClick={() => handleRemove(student.studentId)}
                  />
                </div>
              ))
            : <p className='text-sm text-secondaryText p-1'>
                No student assigned to the meeting yet
              </p>
            }
          </div>

          {/* Search Input Box */}
          <div className='mt-4 flex justify-end items-center relative'>
            <label
              htmlFor=''
              className='pr-3 text-[17px] text-secondaryText'
            >
              Search:{" "}
            </label>
            <input
              type='text'
              className='text-primaryText bg-transparent border-b border-theme px-2 py-1 focus:outline-none'
              placeholder=''
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <RxCross1
              size={18}
              className='absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-black'
              onClick={() => setSearchTerm("")} // Clear input on click
            />
          </div>

          {/* Student List */}
          <p className='py-2 text-primaryText font-semibold'>Your Students</p>
          <div className='flex flex-col gap-2 overflow-y-auto scrollbar-cus-1'>
            {filteredStudents.length > 0 ?
              filteredStudents.map((student) => (
                <StudentListItem
                  key={student.studentId}
                  id={student.studentId}
                  name={student.name}
                  profileUrl={student.profile_picture}
                  onSelect={() => handleSelect(student)}
                  isSelected={assignedStudents.some(
                    (s) => s.studentId === student.studentId
                  )}
                />
              ))
            : <p className='text-sm text-primaryText pt-4'>
                No students found...
              </p>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
