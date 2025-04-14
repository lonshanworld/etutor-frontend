"use client";
import ThemeCloseIcon from "@/assets/svgs/themeClose.svg";
import { useAllocate } from "@/stores/useAllocate";
import UserIcon from "@/assets/svgs/user.svg";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import AssignedStudents from "./AssignedStudents";
import AvailableStudents from "./AvailableStudents";
import { twMerge } from "tailwind-merge";
import AllocateSearchBar from "../searchbar/AllocateSearchBar";
import { AppRouter } from "@/router";
import PopupSearchBar from "../searchbar/PopupSearchBar";

const TutorAllocationPopup = ({
  setIsTutorPopupShown,
  setTutorData,
}: {
  setIsTutorPopupShown: any;
  setTutorData: any;
}) => {
  const { activeUser, setUserList } = useAllocate();
  const [activeTab, setActiveTab] = useState(1);

  const [searchData, setSearchData] = useState("");

  const tabs = [
    {
      id: 1,
      label: "My Assigned Students",
      component: (
        <AssignedStudents
          activeUser={activeUser}
          setActiveTab={setActiveTab}
          setTutorData={setTutorData}
          searchData={searchData}
        />
      ),
    },
    {
      id: 2,
      label: "Available Students",
      component: (
        <AvailableStudents
          setActiveTab={setActiveTab}
          searchData={searchData}
        />
      ),
    },
  ];

  const getTabComponent = () => {
    const tab = tabs.filter((tab) => tab.id === activeTab);
    return tab[0].component;
  };
  return (
    <div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-[788px] h-screen md:h-[700px] md:rounded-lg bg-white z-20 p-10">
        <div className="profile flex items-center gap-3">
          <div className="w-[105px] h-[105px]">
            {activeUser?.profileImagePath ? (
              <img
                src={activeUser?.profileImagePath ?? UserIcon.src}
                className="w-[100px] h-[100px]"
                alt=""
              />
            ) : (
              <FaUserCircle className="text-8xl bg-theme rounded-full text-white" />
            )}
          </div>
          <div>
            <div className="name text-2xl font-bold">
              {activeUser &&
                activeUser?.firstName +
                  " " +
                  activeUser?.middleName +
                  " " +
                  activeUser?.lastName}
            </div>
            <div className="student-count">
              Students - {activeUser?.studentCount}/10
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-5">
          <div className="flex gap-5">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={twMerge(
                  "font-bold cursor-pointer pb-1",
                  activeTab === tab.id
                    ? "text-theme border-b-2 border-theme"
                    : ""
                )}
              >
                {tab.label}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="text-lg">Search:</div>
            <PopupSearchBar
              placeholder="Search Students"
              setSearchData={setSearchData}
              className="!bg-gray-100 sm:!min-w-[200px]"
            />
          </div>
        </div>
        <div className="mt-3">{getTabComponent()}</div>
        {/* <div>{activeTab === 2 && <AvailableStudents />}</div> */}
        <div
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => setIsTutorPopupShown(false)}
        >
          <img src={ThemeCloseIcon.src} alt="" />
        </div>
      </div>

      <div className="fixed top-0 left-0 w-svw h-svh bg-black/30 transition-300 z-10"></div>
    </div>
  );
};

export default TutorAllocationPopup;
