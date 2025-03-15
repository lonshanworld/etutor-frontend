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

export default function SideBarContainer() {
  const pathName = usePathname();
  const router = useRouter();

  const isStaffDashboard = pathName.includes(AppRouter.staffDashboard);
  const isStudentDashboard = pathName.includes(AppRouter.studentDashboard);
  const isTutorDashboard = pathName.includes(AppRouter.tutorDashboard);

  return (
    <div className="w-full flex flex-col gap-3">
      {isStaffDashboard && (
        <>
          <SideBarBox
            icon={Staff}
            selectedIcon={StaffClicked}
            isSelected={AppRouter.staffDashboardStaff === pathName}
            label="Staffs"
            onClick={() => {
              router.push(AppRouter.staffDashboardStaff);
            }}
          />
          <SideBarBox
            icon={Student}
            selectedIcon={StudentClicked}
            isSelected={ AppRouter.staffDashboardStudents === pathName }
            label="Students"
            onClick={() => {
              router.push(AppRouter.staffDashboardStudents);
            }}
          />
          <SideBarBox
            icon={Tutor}
            selectedIcon={TutorClicked}
            isSelected={AppRouter.staffDashboardTutors === pathName}
            label="Tutors"
            onClick={() => {
              router.push(AppRouter.staffDashboardTutors);
            }}
          />

          
        </>
      )}

      {/* {
        isStudentDashboard && (
          <>
            <SideBarBox
              icon={CreateAccountIcon}
              selectedIcon={SelectedCreateAccountIcon}
              isSelected={AppRouter.studentBoard === pathName }
              label="Students"
              onClick={() => {
                router.push(AppRouter.staffDashboardStudents);
              }}
            />
          </>
        )
      } */}
    </div>
  );
}
