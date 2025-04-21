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

import Home from "@/assets/svgs/home.svg";
import HomeClicked from "@/assets/svgs/home_selected.svg";

import ViewPages from "@/assets/svgs/reports/carbon_view.svg";
import ViewPagesClicked from "@/assets/svgs/reports/carbon_view-filled.svg";

import ActiveUsers from "@/assets/svgs/reports/fluent_people-queue-28-regular.svg";
import ActiveUsersClicked from "@/assets/svgs/reports/fluent_people-queue-28-filled.svg";

import Browser from "@/assets/svgs/reports/ph_browser-duotone.svg";
import BrowserClicked from "@/assets/svgs/reports/ph_browser-fill.svg";


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
      icon : ActiveUsers,
      iconClicked : ActiveUsersClicked,
    },
    {
      title : "Browsers Usage",
      route : AppRouter.staffBrowsers,
      icon : Browser,
      iconClicked : BrowserClicked,
    },
    {
      title : "Viewed Pages",
      route : AppRouter.staffPages,
      icon : ViewPages,
      iconClicked : ViewPagesClicked,
    },
    {
      title : "Students",
      route : `${AppRouter.staffUnassignStudent}?page=1&search=&type=`,
      icon : ActiveUsers,
      iconClicked : ActiveUsersClicked,
    },
    {
      title : "Messages",
      route : `${AppRouter.staffMessage}?page=1&search=&duration=&type=`,
      icon : Chat,
      iconClicked : ChatClicked,
    }
  ]; 

  return (
    <div className="w-full flex flex-col gap-3 pl-4">
      {isStaffDashboard && (
        <>
          <SideBarBox
            icon={Home}
            selectedIcon={HomeClicked}
            isSelected={AppRouter.staffDashboard === pathName}
            label="Home"
            onClick={() => {
              if(reportOpen){
                setReportOpen(false);
              }
              router.push(AppRouter.staffDashboard);
            }}
          />
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
            icon={Home}
            selectedIcon={HomeClicked}
            isSelected={AppRouter.studentDashboard === pathName}
            label="Home"
            onClick={() => {
              if(reportOpen){
                setReportOpen(false);
              }
              router.push(AppRouter.studentDashboard);
            }}
          />
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
            icon={Home}
            selectedIcon={HomeClicked}
            isSelected={AppRouter.tutorDashboard === pathName}
            label="Home"
            onClick={() => {
              if(reportOpen){
                setReportOpen(false);
              }
              router.push(AppRouter.tutorDashboard);
            }}
          />
          <SideBarBox
            icon={Board}
            selectedIcon={BoardClicked}
            isSelected={AppRouter.tutorBoard === pathName}
            label="Board"
            onClick={() => {
              router.push(AppRouter.tutorBoard);
            }}
          />
          {/* <SideBarBox
            icon={AssignStudent}
            selectedIcon={AssignStudentClicked}
            isSelected={AppRouter.tutorAllocatedStudents === pathName}
            label="Allocated students"
            onClick={() => {
              router.push(AppRouter.tutorAllocatedStudents);
            }}
          /> */}
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
