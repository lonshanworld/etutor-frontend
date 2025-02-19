"use client"

import SideBarBox from "@/components/sidebar/SidebarBox";
import CreateAccountIcon from "@/assets/svgs/create-account-grey.svg";
import SelectedCreateAccountIcon from "@/assets/svgs/create-account-colored.svg";
import { usePathname, useRouter } from "next/navigation";
import { AppRouter } from "@/router";

export default function StaffDashboardTemplate({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    const pathName = usePathname();
    const router = useRouter();
    
    return (
        <div
        className="flex flex-row w-full h-full">
          <div
          className="w-56 h-full flex flex-col gap-2 items-start pr-5 bg-opacity-50">
            <SideBarBox 
              icon={CreateAccountIcon}
              selectedIcon={SelectedCreateAccountIcon}
              isSelected={AppRouter.staffDashboardStudents === pathName}
              label="Students"
              onClick={()=>{
                router.push(AppRouter.staffDashboardStudents)
              }}
            />
            <SideBarBox 
              icon={CreateAccountIcon}
              selectedIcon={SelectedCreateAccountIcon}
              isSelected={AppRouter.staffDashboardTutors === pathName}
              label="Tutors"
              onClick={()=>{
                router.push(AppRouter.staffDashboardTutors)
              }}
            />
          </div>
          <div
          className="bg-secondaryBackground w-full h-full block rounded-tl-3xl py-2 px-4 text-font">
            {children}
          </div>
        </div>
    );
}