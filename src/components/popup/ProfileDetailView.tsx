"use client";

import { ProfileData } from "@/stores/useProfileStore";
import { useUserStore } from "@/stores/useUserStore";
import { capitalizeFirstLetter, formatName } from "@/utils/formatData";
import { useState } from "react";
import { createPortal } from "react-dom";
import { BiSolidPhone } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { MdEmail, MdOutlineMessage } from "react-icons/md";
import ProfilePic from "../ProfilePic";

type TabOption = "About" | "Student Info" | "Tutor Info" | "Emergency Contact";

interface ProfileDetailViewProps {
  profile: ProfileData;
  onClose: () => void;
  onChat: () => void;
  isOwnProfile: boolean;
  isStaff?: boolean;
  isTutor?: boolean;
}

const ProfileDetailView = ({
  profile,
  onClose,
  onChat,
  isOwnProfile,
  isStaff = false,
  isTutor = false,
}: ProfileDetailViewProps) => {
  const [activeTab, setActiveTab] = useState<TabOption>("About");
  const { isReadOnly } = useUserStore();

  // Determine which tabs to show based on role
  const getTabs = (): TabOption[] => {
    const tabs: TabOption[] = ["About"];

    if (profile.role === "student") {
      if (isTutor || isStaff || isOwnProfile) {
        tabs.push("Student Info");
        if (isStaff || isOwnProfile) {
          tabs.push("Emergency Contact");
        }
      }
    } else if (profile.role === "tutor") {
      tabs.push("Tutor Info");
    }

    return tabs;
  };

  const tabs = getTabs();

  return createPortal(
    <>
      {/* Overlay */}
      <div
        className='fixed inset-0 bg-black bg-opacity-50 z-50'
        onClick={onClose}
      ></div>

      {/* Detail View */}
      <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background shadow-xl rounded-lg z-50 w-[600px] max-w-[90vw] min-h-[690px] max-h-[90vh] overflow-hidden'>
        {/* Header */}
        <div className='h-[120px] bg-theme w-full rounded-t-lg relative'>
          <button
            onClick={onClose}
            className='absolute top-3 right-3 text-white hover:bg-opacity-80 p-1.5 rounded-full'
          >
            <IoClose size={24} />
          </button>

          {/* Message button for other users' profiles */}
          {!isOwnProfile && (
            <button
              onClick={onChat}
              className={`absolute -bottom-5 right-8 bg-secondaryBackground flex items-center gap-2 px-4 py-2 rounded-lg shadow-md text-primaryText hover:bg-opacity-80 transition-colors ${isReadOnly ? "pointer-events-none" : "cursor-pointer"}`}
            >
              <div
                className={`flex items-end gap-1.5 ${isReadOnly && "opacity-50"}`}
              >
                <MdOutlineMessage size={20} />
                <span>Message</span>
              </div>
            </button>
          )}
        </div>

        {/* Profile content */}
        <div className='relative'>
          {/* Profile photo */}
          <div className='absolute top-[-120px] left-8'>
            <div className='rounded-full bg-background p-1.5'>
              <ProfilePic
                profileUrl={profile?.profileUrl || ""}
                size={100}
              />
            </div>
          </div>

          {/* User details */}
          <div className='mt-16 px-8 py-1'>
            <div className='flex items-center gap-3'>
              <h1 className='text-2xl font-semibold text-primaryText'>
                {formatName(
                  profile.firstName,
                  profile.middleName,
                  profile.lastName
                )}
              </h1>
              <div className='text-sm px-2 py-0.5 bg-theme rounded-sm text-white'>
                {capitalizeFirstLetter(profile.role)}
              </div>
              <div className='flex items-center gap-1 ml-2'>
                <div
                  className={`rounded-full h-2.5 w-2.5 ${profile.status === "activated" ? "bg-green-600" : "bg-red-600"}`}
                ></div>
                <span className='text-sm'>
                  {capitalizeFirstLetter(profile.status)}
                </span>
              </div>
            </div>

            <div className='mt-2 space-y-2'>
              <div className='flex items-center gap-2'>
                <MdEmail
                  className='text-theme'
                  size={18}
                />
                <p className='text-sm text-secondaryText'>{profile.email}</p>
              </div>
              <div className='flex items-center gap-2'>
                <BiSolidPhone
                  className='text-theme'
                  size={18}
                />
                <p className='text-sm text-secondaryText'>
                  {profile.phone || "-"}
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className='px-8 pb-6 pt-3'>
            <div className='flex border-b border-secondaryBackground mb-4'>
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-4 text-sm font-medium ${
                    activeTab === tab ?
                      "border-b-2 border-theme text-theme"
                    : "text-secondaryText hover:text-secondaryBackgroundOpposite"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className='bg-secondaryBackground p-4 rounded-lg'>
              {activeTab === "About" && (
                <div className='space-y-4'>
                  <div>
                    <h3 className='font-semibold text-sm mb-1'>
                      Date of Birth
                    </h3>
                    <p className='text-sm'>{profile.dob || "-"}</p>
                  </div>
                  <div>
                    <h3 className='font-semibold text-sm mb-1'>Gender</h3>
                    <p className='text-sm'>{profile.gender || "-"}</p>
                  </div>
                  <div>
                    <h3 className='font-semibold text-sm mb-1'>Nationality</h3>
                    <p className='text-sm'>{profile.nationality || "-"}</p>
                  </div>
                  {/* Only show address and passport for staff or own profile */}
                  {(isOwnProfile || isStaff) && (
                    <>
                      <div>
                        <h3 className='font-semibold text-sm mb-1'>Address</h3>
                        <p className='text-sm'>{profile.address || "-"}</p>
                      </div>
                      <div>
                        <h3 className='font-semibold text-sm mb-1'>Passport</h3>
                        <p className='text-sm'>{profile.passport || "-"}</p>
                      </div>
                    </>
                  )}
                </div>
              )}

              {activeTab === "Student Info" && profile.role === "student" && (
                <div className='space-y-4'>
                  <div>
                    <h3 className='font-semibold text-sm mb-1'>Major</h3>
                    <p className='text-sm'>{profile.major || "-"}</p>
                  </div>
                  <div>
                    <h3 className='font-semibold text-sm mb-1'>
                      Enrollment Date
                    </h3>
                    <p className='text-sm'>{profile.enrollDate || "-"}</p>
                  </div>
                </div>
              )}

              {activeTab === "Tutor Info" && profile.role === "tutor" && (
                <div className='space-y-4'>
                  <div>
                    <h3 className='font-semibold text-sm mb-1'>
                      Qualification
                    </h3>
                    <p className='text-sm'>{profile.qualification || "-"}</p>
                  </div>
                  <div>
                    <h3 className='font-semibold text-sm mb-1'>Experience</h3>
                    <p className='text-sm'>{profile.experience || "-"}</p>
                  </div>
                  <div>
                    <h3 className='font-semibold text-sm mb-1'>Subject</h3>
                    <p className='text-sm'>{profile.subject || "-"}</p>
                  </div>
                </div>
              )}

              {activeTab === "Emergency Contact" &&
                profile.role === "student" && (
                  <div className='space-y-4'>
                    <div>
                      <h3 className='font-semibold text-sm mb-1'>
                        Emergency Contact Name
                      </h3>
                      <p className='text-sm'>{profile.emergencyName || "-"}</p>
                    </div>
                    <div>
                      <h3 className='font-semibold text-sm mb-1'>
                        Emergency Contact Phone
                      </h3>
                      <p className='text-sm'>{profile.emergencyPhone || "-"}</p>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

export default ProfileDetailView;
