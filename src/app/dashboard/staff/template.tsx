"use client"

import SideBarBox from "@/components/sidebar/SidebarBox";
import CreateAccountIcon from "@/assets/svgs/create-account-grey.svg";
import SelectedCreateAccountIcon from "@/assets/svgs/create-account-colored.svg";

export default function StaffDashboardTemplate({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return (
        <div
        className="flex flex-row w-full h-full">
          <div
          className="w-56 h-full flex flex-col gap-2 items-start pr-5 bg-opacity-50">
            <SideBarBox 
              icon={CreateAccountIcon}
              selectedIcon={SelectedCreateAccountIcon}
              isSelected={false}
              label="Students"
              onClick={()=>{}}
            />
          </div>
          <div
          className="bg-secondaryBackground w-full h-full block rounded-tl-3xl py-2 px-4 text-font">
            {children}
          </div>
        </div>
    );
}