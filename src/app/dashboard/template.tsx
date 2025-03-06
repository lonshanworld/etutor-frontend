"use client";

import DashboardAppbar from "@/components/appbar/DashboardAppbar";
import DashboardAppbarMobile from "@/components/appbar/DashboardAppbarMobile";
import LogoBox from "@/components/LogoBox";
import MobileSideBar from "@/components/sidebar/MobileSideBar";

import SideBarContainer from "@/components/sidebar/SidebarContainer";

import { useState } from "react";

export default function DashboardTemplate({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    const [showMobileSidebar, setShowMobileSidebar] = useState(false);

    return (
     
        <>
          <div
            className="py-2 pr-4 hidden md:block">
            <DashboardAppbar />
            
          </div>
          <div
            className="px-4 py-2 block md:hidden">
            <DashboardAppbarMobile onClickMenu={()=>setShowMobileSidebar(true)}/>
          </div>
          <div
            className="flex flex-row w-full h-full">
          <div
          className="w-56 h-full hidden flex-col gap-2 items-start pr-5 bg-opacity-50 md:flex">
            <SideBarContainer />
          </div>
          {
            showMobileSidebar && <MobileSideBar onBackClick={()=>setShowMobileSidebar(false)}/>
          }
          <div
          className="bg-secondaryBackground w-full h-full block md:rounded-tl-3xl py-2 px-4 text-font">
            {children}
          </div>
        </div>
        
        </>
    );
}