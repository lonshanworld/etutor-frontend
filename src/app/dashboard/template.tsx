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
import { useEventStore } from "@/stores/useEventStore";
import { useUserStore } from "@/stores/useUserStore";

export default function DashboardTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [sidebarStyle, setSidebarStyle] = useState<string>("");
  const pathName = usePathname();
  const {user} = useUserStore()

  const { setMajors, setSubjects } = useMajor();

  const { initializeEcho, disconnect, session_login, session_logout,sendData, subscribeToChannel, connected, subscribeToPublicChannel } = useEventStore();


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

  function joinSocket(id : number){
    initializeEcho().then((_)=>{
      console.log('trying');
      if(connected){
        session_login();
        // console.log("it is connected");
        // // setTimeout(async() => {
        // //   await sendData('session-login-channel', 'SessionLoginEvent', { user_id: 1 });
          
        // // }, 2000);
        // connectPresense();
        // setTimeout(async()=>{
        //   console.log("trying to leave");
        //   leavePresense();
        // },5000);
      }
      
    });
  }

  useEffect(() => {
    const handleBeforeUnload = () => {
      if(user){
        navigator.sendBeacon(`${process.env.NEXT_PUBLIC_API_URL}/event/logout?id=${user.id}`);
      }
  
      session_logout();

    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    
    fetchMajors();
    
  }, []);

  useEffect(()=>{
    if(user){
      joinSocket(user.id);
      
    }
  },[user, connected])

  return (
    <>
      <p className="text-3xl">{}</p>
      <div className="py-3 pr-4 hidden lg:block">
        <DashboardAppbar />
      </div>
      <div
        className={`px-4 py-2 ${checkHaveAccess() ? "block lg:hidden" : "hidden sm:block lg:hidden"}`}
      >
        <DashboardAppbarMobile onClickMenu={openSidebar} />
      </div>
      <div className="flex flex-row w-full h-full">
        <div className="w-64 h-full hidden flex-col gap-2 items-start pr-4 bg-opacity-50 lg:flex">
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
