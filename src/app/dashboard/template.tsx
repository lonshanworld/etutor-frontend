"use client";

import DashboardAppbar from "@/components/appbar/DashboardAppbar";
import DashboardAppbarMobile from "@/components/appbar/DashboardAppbarMobile";
import MobileSideBar from "@/components/sidebar/MobileSideBar";

import SideBarContainer from "@/components/sidebar/SidebarContainer";
import { AppRouter } from "@/router";
import { usePathname } from "next/navigation";

import { getMajors } from "@/api/services/students";
import { getSubjects } from "@/api/services/tutors";
import { majorSubjectFromJson } from "@/model/major";

import { useEffect, useState } from "react";
import { useMajor } from "@/stores/useMajor";

export default function DashboardTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [sidebarStyle, setSidebarStyle] = useState<string>("");
  const pathName = usePathname();

  const { setMajors, setSubjects } = useMajor();

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

  let majors: any = [];
  let subjects: any = [];
  const fetchMajors = async () => {
    try {
      const majorResponse = await getMajors();
      const subjectResponse = await getSubjects();
      majors = majorResponse?.data.map(majorSubjectFromJson);
      subjects = subjectResponse?.data.map(majorSubjectFromJson);

      if (majors && subjects) {
        setMajors(majors);
        setSubjects(subjects);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchMajors();
  }, []);

  return (
    <>
      <div className="py-3 pr-4 hidden lg:block">
        <DashboardAppbar />
      </div>
      <div
        className={`px-4 py-2 ${checkHaveAccess() ? "block lg:hidden" : "hidden sm:block lg:hidden"}`}
      >
        <DashboardAppbarMobile onClickMenu={openSidebar} />
      </div>
      <div className="flex flex-row w-full h-full">
        <div className="w-56 h-full hidden flex-col gap-2 items-start pr-5 bg-opacity-50 lg:flex">
          <SideBarContainer />
        </div>
        <div>
          <MobileSideBar style={sidebarStyle} onBackClick={closeSidebar} />
          {showMobileSidebar && (
            <div
              className="fixed top-0 left-0 w-svw h-svh bg-black/30 z-[15]"
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
