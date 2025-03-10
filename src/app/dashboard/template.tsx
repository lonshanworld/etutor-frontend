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
}>) {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [sidebarStyle, setSidebarStyle] = useState<string>("");

  const openSidebar = () => {
    setSidebarStyle("left-0");
    setShowMobileSidebar(true);
  };
  const closeSidebar = () => {
    setSidebarStyle("left-[-300px]");
    setShowMobileSidebar(false);
  };

  return (
    <>
      <div className="py-3 pr-4 hidden md:block">
        <DashboardAppbar />
      </div>
      <div className="px-4 py-2 block md:hidden">
        <DashboardAppbarMobile onClickMenu={openSidebar} />
      </div>
      <div className="flex flex-row w-full h-full">
        <div className="w-56 h-full hidden flex-col gap-2 items-start pr-5 bg-opacity-50 md:flex">
          <SideBarContainer />
        </div>
        <div>
          <MobileSideBar style={sidebarStyle} onBackClick={closeSidebar} />
          {showMobileSidebar && (
            <div
              className="fixed top-0 left-0 w-screen h-screen bg-black/30 z-[15]"
              onClick={closeSidebar}
            ></div>
          )}
        </div>
        <div className="bg-secondaryBackground w-full overflow-y-scroll mb-10 md:rounded-tl-3xl sm:py-8 py-5 pb-10 sm:px-4 text-font">
          {children}
        </div>
      </div>
    </>
  );
}
