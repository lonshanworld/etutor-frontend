"use client";
import { User } from "@/model/user";
import { FaUserCircle } from "react-icons/fa";
import Chat from "@/assets/svgs/chat.svg";
import Close from "@/assets/svgs/close.svg";
import Email from "@/assets/svgs/email.svg";
import Phone from "@/assets/svgs/phone.svg";
import StatusIcon from "../statusicon/StatusIcon";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function UserDetail({
  user,
  setShowDetail,
}: {
  user: User | null;
  setShowDetail: any;
}) {
  console.log("user", user);

  const [activeTab, setActiveTab] = useState(1);
  return (
    <div className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[350px] md:w-[500px] bg-background z-20 rounded-lg min-h-[600px]">
      <div className="h-[80px] bg-theme w-full"></div>
      {!user && <div className="text-2xl">User Not Found</div>}
      {user && (
        <div>
          {/* profile photo */}
          <div className="absolute top-6 left-[60px]">
            {user.profileImagePath ? (
              <img
                src={user?.profileImagePath}
                className="w-[100px] h-[100px]"
                alt=""
              />
            ) : (
              <FaUserCircle className="text-8xl bg-theme rounded-full text-white" />
            )}
          </div>

          {/* message box */}
          <div className="absolute top-14 right-[40px] messageIcon p-3 px-5 rounded-md bg-messageBg flex justify-between gap-5">
            <img src={Chat.src} className="" alt="" />
            <span className="   ">Message</span>
          </div>

          {/* User details */}
          <div className="mt-5 p-10 pb-5">
            <div className="flex gap-5 items-center">
              <h1 className="text-2xl text-profileHeading font-bold">
                {user.firstName + " " + user.middleName + " " + user.lastName}
              </h1>
              <div className="flex gap-2 items-center mt-1">
                <StatusIcon activeDays={0} />{" "}
                <span className="font-bold text-gray-500">Active</span>
              </div>
            </div>
            <div className="flex mt-5 gap-20 font-bold text-profileText">
              <div className="flex gap-2">
                <img src={Email.src} alt="" />
                {user.email}
              </div>
              <div className="flex gap-2">
                <img src={Phone.src} alt="" />
                {user.phoneNo}
              </div>
            </div>
          </div>

          {/* about me */}
          <div className="w-full px-5">
            <div className="bg-detailBg rounded-lg min-h-[300px] px-8 py-3">
              <div className="tag grid grid-cols-8 ">
                <p
                  className={twMerge(
                    "border-b-2 border-backgroundOpposite font-semibold py-2 col-span-2 cursor-pointer",
                    activeTab === 1
                      ? "text-theme border-theme"
                      : "border-backgroundOpposite text-backgroundOpposite"
                  )}
                  onClick={() => setActiveTab(1)}
                >
                  About Me
                </p>
                <p className="border-b-2 border-backgroundOpposite font-semibold py-2 col-span-1"></p>
                <p
                  className={twMerge(
                    "border-b-2 border-backgroundOpposite font-semibold py-2 col-span-3 cursor-pointer",
                    activeTab === 2
                      ? "text-theme border-theme"
                      : "border-backgroundOpposite text-backgroundOpposite"
                  )}
                  onClick={() => setActiveTab(2)}
                >
                  Emergency Contact
                </p>
                <p className="border-b-2 border-backgroundOpposite font-semibold py-2 col-span-2"></p>
              </div>
              {activeTab === 1 && (
                <div className="my-5">
                  <div className="mt-3">
                    <p className="font-bold text-base">Date of Birth</p>
                    <p className="text-sm font-bold text-profileText">
                      10/6/2000
                    </p>
                  </div>
                  <div className="mt-3">
                    <p className="font-bold text-base">Gender</p>
                    <p className="text-sm font-bold text-profileText">Male</p>
                  </div>
                  <div className="mt-3">
                    <p className="font-bold text-base">Start Date</p>
                    <p className="text-sm font-bold text-profileText">
                      10/6/2000
                    </p>
                  </div>
                  <div className="mt-3">
                    <p className="font-bold text-base">Nationality</p>
                    <p className="text-sm font-bold text-profileText">
                      Myanmar
                    </p>
                  </div>
                  <div className="mt-3">
                    <p className="font-bold text-base">Nationality</p>
                    <p className="text-sm font-bold text-profileText">
                      Myanmar
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="float-right mb-5 mt-3 me-5">
            <button className="bg-theme px-5 py-3 rounded-md text-white font-bold">
              View Dashboard
            </button>
          </div>
        </div>
      )}

      {/* close icon */}
      <div
        className="absolute top-5 right-5 cursor-pointer"
        onClick={() => setShowDetail(false)}
      >
        <img src={Close.src} className="text-backgroundOpposite" alt="" />
      </div>
    </div>
  );
}
