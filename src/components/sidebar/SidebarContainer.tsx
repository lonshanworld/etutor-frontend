"use client";

import SideBarBox from "@/components/sidebar/SidebarBox";
import CreateAccountIcon from "@/assets/svgs/create-account-grey.svg";
import SelectedCreateAccountIcon from "@/assets/svgs/create-account-colored.svg";
import { usePathname, useRouter } from "next/navigation";
import { AppRouter } from "@/router";

export default function SideBarContainer() {
  const pathName = usePathname();
  const router = useRouter();

  const isStaffDashboard = pathName.includes(AppRouter.staffDashboard);

  return (
    <div className="w-full flex flex-col gap-3">
      {isStaffDashboard && (
        <>
          <SideBarBox
            icon={CreateAccountIcon}
            selectedIcon={SelectedCreateAccountIcon}
            isSelected={
              AppRouter.staffDashboardStudents === pathName ||
              AppRouter.staffDashboard === pathName
            }
            label="Students"
            onClick={() => {
              router.push(AppRouter.staffDashboardStudents);
            }}
          />
          <SideBarBox
            icon={CreateAccountIcon}
            selectedIcon={SelectedCreateAccountIcon}
            isSelected={AppRouter.staffDashboardTutors === pathName}
            label="Tutors"
            onClick={() => {
              router.push(AppRouter.staffDashboardTutors);
            }}
          />

          <SideBarBox
            icon={CreateAccountIcon}
            selectedIcon={SelectedCreateAccountIcon}
            isSelected={AppRouter.staffDashboardStaff === pathName}
            label="Staffs"
            onClick={() => {
              router.push(AppRouter.staffDashboardStaff);
            }}
          />
        </>
      )}
    </div>
  );
}
