"use client";

import SideBarBox from "@/components/sidebar/SidebarBox";

import { usePathname, useRouter } from "next/navigation";
import { AppRouter } from "@/router";

import Staff from "@/assets/svgs/staff.svg";
import StaffClicked from "@/assets/svgs/staff_clicked.svg";

import Tutor from "@/assets/svgs/tutor.svg";
import TutorClicked from "@/assets/svgs/tutor_clicked.svg";

import Student from "@/assets/svgs/student.svg";
import StudentClicked from "@/assets/svgs/student_clicked.svg";

import Allocate from "@/assets/svgs/allocate.svg";
import AllocateClicked from "@/assets/svgs/allocateClicked.svg";

import Board from "@/assets/svgs/board.svg";
import BoardClicked from "@/assets/svgs/boardclicked.svg";

import Chat from "@/assets/svgs/chat.svg";
import ChatClicked from "@/assets/svgs/chatclicked.svg";

import Meeting from "@/assets/svgs/meeting.svg";
import MeetingClicked from "@/assets/svgs/meetingclicked.svg";

import Note from "@/assets/svgs/note.svg";
import NoteClicked from "@/assets/svgs/noteclicked.svg";

import People from "@/assets/svgs/people.svg";
import PeopleClicked from "@/assets/svgs/peopleclicked.svg";

import AssignStudent from "@/assets/svgs/assignStudent.svg";
import AssignStudentClicked from "@/assets/svgs/assignStudentClicked.svg";
import SidebarBoxDropdown, { dropdownbtn } from "./SidebarBoxDropdown";
import ReportIcon from "@/assets/svgs/report.svg";
import { useState } from "react";



export default function SideBarContainer() {
  const pathName = usePathname();
  const router = useRouter();
  const [reportOpen, setReportOpen] = useState(false);

  const isStaffDashboard = pathName.includes(AppRouter.staffDashboard);
  const isStudentDashboard = pathName.includes(AppRouter.studentDashboard);
  const isTutorDashboard = pathName.includes(AppRouter.tutorDashboard);

  const reportBtnList : dropdownbtn[] = [
    {
      title : "Active Users",
      route : `${AppRouter.staffActiveUsers}?page=1`,
    },
    {
      title : "Browsers Usage",
      route : AppRouter.staffBrowsers,
    },
    {
      title : "Viewed Pages",
      route : AppRouter.staffPages,
    }
  ]; 

  return (
    <div className="w-full flex flex-col gap-3 pl-4">
      {isStaffDashboard && (
        <>
          <SideBarBox
            icon={Staff}
            selectedIcon={StaffClicked}
            isSelected={AppRouter.staffStaff === pathName}
            label="Staffs"
            onClick={() => {
              if(reportOpen){
                setReportOpen(false);
              }
              router.push(AppRouter.staffStaff);
            }}
          />
          <SideBarBox
            icon={Student}
            selectedIcon={StudentClicked}
            isSelected={ AppRouter.staffStudents === pathName }
            label="Students"
            onClick={() => {
              if(reportOpen){
                setReportOpen(false);
              }
              router.push(AppRouter.staffStudents);
            }}
          />
          <SideBarBox
            icon={Tutor}
            selectedIcon={TutorClicked}
            isSelected={AppRouter.staffTutors === pathName}
            label="Tutors"
            onClick={() => {
              if(reportOpen){
                setReportOpen(false);
              }
              router.push(AppRouter.staffTutors);
            }}
          />

          <SideBarBox
            icon={Allocate}
            selectedIcon={AllocateClicked}
            isSelected={
              AppRouter.staffAllocateTutor === pathName ||
              AppRouter.staffAllocateStudent === pathName
            }
            label="Allocate"
            onClick={() => {
              router.push(AppRouter.staffAllocateTutor);
            }}
          />

          <SidebarBoxDropdown 
            btnIcon={ReportIcon}
            btnTxt="Reports"
            btnList={reportBtnList}
            isOpen={reportOpen}
            setIsOpen={setReportOpen}
          />
        </>
      )}

      {isStudentDashboard && (
        <>
          <SideBarBox
            icon={Board}
            selectedIcon={BoardClicked}
            isSelected={AppRouter.studentBoard === pathName}
            label="Board"
            onClick={() => {
              router.push(AppRouter.studentBoard);
            }}
          />
          <SideBarBox
            icon={Meeting}
            selectedIcon={MeetingClicked}
            isSelected={AppRouter.studentMeeting === pathName}
            label="Meeting"
            onClick={() => {
              router.push(AppRouter.studentMeeting);
            }}
          />
          <SideBarBox
            icon={Chat}
            selectedIcon={ChatClicked}
            isSelected={AppRouter.studentChat === pathName}
            label="Chat"
            onClick={() => {
              router.push(AppRouter.studentChat);
            }}
          />
          <SideBarBox
            icon={Note}
            selectedIcon={NoteClicked}
            isSelected={AppRouter.studentNote === pathName}
            label="Note"
            onClick={() => {
              router.push(AppRouter.studentNote);
            }}
          />
          <SideBarBox
            icon={People}
            selectedIcon={PeopleClicked}
            isSelected={AppRouter.studentPeople === pathName}
            label="People"
            onClick={() => {
              router.push(AppRouter.studentPeople);
            }}
          />
        </>
      )}

      {isTutorDashboard && (
        <>
          <SideBarBox
            icon={Board}
            selectedIcon={BoardClicked}
            isSelected={AppRouter.tutorBoard === pathName}
            label="Board"
            onClick={() => {
              router.push(AppRouter.tutorBoard);
            }}
          />
          <SideBarBox
            icon={AssignStudent}
            selectedIcon={AssignStudentClicked}
            isSelected={AppRouter.tutorAllocatedStudents === pathName}
            label="Allocated students"
            onClick={() => {
              router.push(AppRouter.tutorAllocatedStudents);
            }}
          />
          <SideBarBox
            icon={Meeting}
            selectedIcon={MeetingClicked}
            isSelected={AppRouter.tutorMeeting === pathName}
            label="Meeting"
            onClick={() => {
              router.push(AppRouter.tutorMeeting);
            }}
          />
          <SideBarBox
            icon={Chat}
            selectedIcon={ChatClicked}
            isSelected={AppRouter.tutorChat === pathName}
            label="Chat"
            onClick={() => {
              router.push(AppRouter.tutorChat);
            }}
          />
          <SideBarBox
            icon={Note}
            selectedIcon={NoteClicked}
            isSelected={AppRouter.tutorNote === pathName}
            label="Note"
            onClick={() => {
              router.push(AppRouter.tutorNote);
            }}
          />
          <SideBarBox
            icon={People}
            selectedIcon={PeopleClicked}
            isSelected={AppRouter.tutorPeople === pathName}
            label="People"
            onClick={() => {
              router.push(AppRouter.tutorPeople);
            }}
          />
        </>
      )}
    </div>
  );
}
