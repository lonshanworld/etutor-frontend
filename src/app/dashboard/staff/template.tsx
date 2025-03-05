"use client";

import SideBarBox from "@/components/sidebar/SidebarBox";
import CreateAccountIcon from "@/assets/svgs/create-account-grey.svg";
import SelectedCreateAccountIcon from "@/assets/svgs/create-account-colored.svg";
import Staff from "@/assets/svgs/staff.svg";
import Staff_Clicked from "@/assets/svgs/staff_clicked.svg";
import Student from "@/assets/svgs/student.svg";
import Student_Clicked from "@/assets/svgs/student_clicked.svg";
import Tutor from "@/assets/svgs/tutor.svg";
import Tutor_Clicked from "@/assets/svgs/tutor_clicked.svg";
import Chat from "@/assets/svgs/chat.svg";
// import Chat_Clicked from "@/assets/svgs/chat_clicked.svg";
import { usePathname, useRouter } from "next/navigation";
import { AppRouter } from "@/router";

export default function StaffDashboardTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  const router = useRouter();

  return (
    <div className="flex flex-row w-full h-full">
      <div className="w-56 mt-3 h-full flex flex-col gap-2 items-start text-left pr-5 bg-opacity-50 ">
        <SideBarBox
          icon={Student}
          selectedIcon={Student_Clicked}
          isSelected={AppRouter.staffDashboardStudents === pathName}
          label="Students"
          onClick={() => {
            router.push(AppRouter.staffDashboardStudents);
          }}
        />
        <SideBarBox
          icon={Tutor}
          selectedIcon={Tutor_Clicked}
          isSelected={AppRouter.staffDashboardTutors === pathName}
          label="Tutors"
          onClick={() => {
            router.push(AppRouter.staffDashboardTutors);
          }}
        />

        <SideBarBox
          icon={Staff}
          selectedIcon={Staff_Clicked}
          isSelected={AppRouter.staffDashboardStaff === pathName}
          label="Staffs"
          onClick={() => {
            router.push(AppRouter.staffDashboardStaff);
          }}
        />

        <SideBarBox
          icon={Chat}
          selectedIcon={Staff_Clicked}
          isSelected={AppRouter.chat === pathName}
          label="Chat"
          onClick={() => {
            router.push(AppRouter.chat);
          }}
        />
      </div>
      <div className="bg-secondaryBackground w-full min-h-screen h-full block rounded-tl-3xl p-10 text-font">
        {children}
      </div>
    </div>
  );
}
