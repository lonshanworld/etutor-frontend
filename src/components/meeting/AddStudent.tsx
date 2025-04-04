"use client";

import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { RxCross1, RxCross2 } from "react-icons/rx";
import { studentData } from "./data";
import ProfilePic from "../ProfilePic";
import StudentListItem from "./StudentListItem";

interface Student {
  id: number;
  name: string;
  profileUrl: string;
}

interface Props {
  onBack: () => void;
  onAdd: (assignedStudents: Student[]) => void;
  preSelectedStudents?: Student[];
}

const AddStudent = ({ onBack, onAdd, preSelectedStudents = [] }: Props) => {
  const [assignedStudents, setAssignedStudents] =
    useState<Student[]>(preSelectedStudents);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setAssignedStudents(preSelectedStudents);
  }, [preSelectedStudents]);

  const handleSelect = (student: Student) => {
    setAssignedStudents((prev) => {
      return prev.some((s) => s.id === student.id) ?
          prev.filter((s) => s.id !== student.id)
        : [...prev, student];
    });
  };

  const handleRemove = (id: number) => {
    setAssignedStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const filteredStudents = studentData.filter((student) =>
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
                  key={student.id}
                  id={student.id}
                  name={student.name}
                  profileUrl={student.profileUrl}
                  onSelect={() => handleSelect(student)}
                  isSelected={assignedStudents.some((s) => s.id === student.id)}
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
