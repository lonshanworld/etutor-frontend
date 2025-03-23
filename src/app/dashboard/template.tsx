"use client";

import { getProfile } from "@/api/services/getProfile";
import DashboardAppbar from "@/components/appbar/DashboardAppbar";
import DashboardAppbarMobile from "@/components/appbar/DashboardAppbarMobile";
import MobileSideBar from "@/components/sidebar/MobileSideBar";

import SideBarContainer from "@/components/sidebar/SidebarContainer";
import { AppRouter } from "@/router";
import { usePathname } from "next/navigation";

import { useState } from "react";

export default function DashboardTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [sidebarStyle, setSidebarStyle] = useState<string>("");
  const pathName = usePathname();

  const openSidebar = () => {
    setSidebarStyle("left-0");
    setShowMobileSidebar(true);
  };
  const closeSidebar = () => {
    setSidebarStyle("left-[-300px]");
    setShowMobileSidebar(false);
  };

  function checkHaveAccess(): boolean {
    if (
      pathName.includes(AppRouter.studentChatBox) ||
      pathName.includes(AppRouter.tutorChatBox)
    ) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <>
      <div className="py-3 pr-4 hidden lg:block">
        <DashboardAppbar />
      </div>
      {checkHaveAccess() && (
        <div className="px-4 py-2 block lg:hidden">
          <DashboardAppbarMobile onClickMenu={openSidebar} />
        </div>
      )}
      <div className="flex flex-row w-full h-full">
        <div className="w-56 h-full hidden flex-col gap-2 items-start pr-5 bg-opacity-50 lg:flex">
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
        <div className="bg-secondaryBackground w-full overflow-clip lg:rounded-tl-3xl text-font h-full">
          {children}
        </div>
      </div>
    </>
  );
}
