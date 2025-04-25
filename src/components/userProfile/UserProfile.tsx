"use client";
import { UserRole } from "@/model/user";
import { FaUserCircle } from "react-icons/fa";
import Close from "@/assets/svgs/close.svg";
import Email from "@/assets/svgs/email.svg";
import Phone from "@/assets/svgs/phone.svg";
import StatusIcon from "../statusicon/StatusIcon";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useUserStore } from "@/stores/useUserStore";
import { Profile } from "@/model/profile";
import TabComponent from "./TabComponent";
import UserIcon from "@/assets/svgs/user.svg";
import ChangePasswordInput from "./ChangePasswordInput";
import DataComponent from "./DataComponent";
import { tabLabels } from "./profileConstants";
import {
  getCurrentUserAbout,
  getEmgContact,
  getOtherUserAbout,
  getStaffInfo,
  getStudentInfo,
  getTutorInfo,
} from "./tabData";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ChangePasswordSchema,
  ChangePasswordSchemaType,
} from "@/utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  changePassword,
  getProfile,
  updateProfile,
} from "@/api/services/getProfile";
import { useToast } from "@/stores/useToast";
import Image from "next/image";
import MessageIcon from "@/assets/svgs/chat.svg";
import { useRouter } from "next/navigation";
import { AppRouter } from "@/router";
import useLoading from "@/stores/useLoading";
import { createConversation } from "../../../convex/chatRoom";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Cookies from "js-cookie";
import { MdOutlineEdit } from "react-icons/md";

import DefaultProfile from "@/assets/images/default_profile.jpg";

export type UserType = {
  label: string;
  value: any;
};

type ErrorType = {
  message: string;
};

export default function UserProfile({
  profileData,
  showDetail = false,
  setShowDetail,
  setProfileDetailPopup,
}: {
  profileData: Profile | null;
  showDetail?: boolean;
  setShowDetail?: any;
  setProfileDetailPopup?: any;
}) {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const [tabs, setTabs] = useState<string[]>([]);
  const [about, setAbout] = useState<UserType[] | null>(null);
  const [info, setInfo] = useState<UserType[] | null>(null);
  const router = useRouter();
  const { showLoading, hideLoading } = useLoading();
  const { user, setViewUser, setUser } = useUserStore();
  const [isProfileHover, setProfileHover] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(ChangePasswordSchema),
  });
  const otherUserAbout: UserType[] = getOtherUserAbout(profileData);
  const currentUserAbout: UserType[] = getCurrentUserAbout(profileData);
  const emgContacts: UserType[] = getEmgContact(profileData);
  const staffInfo: UserType[] = getStaffInfo(profileData);
  const studentInfo: UserType[] = getStudentInfo(profileData);
  const tutorInfo: UserType[] = getTutorInfo(profileData);
  const createConversation = useMutation(api.chatRoom.createConversation);

  const getInfoName = (role: any) => {
    switch (role) {
      case "staff":
        return tabLabels.staffInfo;
      case "student":
        return tabLabels.studentInfo;
      case "tutor":
        return tabLabels.tutorInfo;
    }
  };

  const staffTabs = [tabLabels.aboutMe, tabLabels.emgContact];
  const studentTabs = [...staffTabs, tabLabels.studentInfo];
  const tutorTabs = [tabLabels.aboutMe, tabLabels.tutorInfo];
  const profileTabs = [
    tabLabels.about,
    getInfoName(profileData?.role) ?? "",
    tabLabels.changePassword,
  ];

  useEffect(() => {
    if (!showDetail) {
      setAbout(currentUserAbout);
      setTabs(profileTabs);
      setActiveTab(tabLabels.about);
    } else {
      setAbout(otherUserAbout);
      setActiveTab(tabLabels.aboutMe);
      if (profileData?.role === UserRole.staff) {
        setTabs(staffTabs);
      } else if (profileData?.role === UserRole.tutor) {
        setTabs(tutorTabs);
      } else if (profileData?.role === UserRole.student) {
        setTabs(studentTabs);
      }
    }

    if (profileData?.role === UserRole.staff) {
      setInfo(staffInfo);
    } else if (profileData?.role === UserRole.tutor) {
      setInfo(tutorInfo);
    } else if (profileData?.role === UserRole.student) {
      setInfo(studentInfo);
    }
    console.log("profile", user);
  }, [profileData, showDetail]);

  const onSubmit: SubmitHandler<any> = async (data, e: any) => {
    const body = {
      old_password: data.currentPassword,
      password: data.newPassword,
      password_confirmation: data.confirmPassword,
    };
    try {
      const response = await changePassword(body);
      if (response.message === "success") {
        showToast("Password changed successfully", "success");
      }
      reset();
      setProfileDetailPopup(false);
    } catch (error: any) {
      showToast(error.message, "error");
    }
  };

  const viewDashboard = (profileData: Profile) => {
    // setViewUser(profileData);
    Cookies.set("viewUser", JSON.stringify(profileData), { expires: 7 });
    if (profileData.role === UserRole.student) {
      router.push(AppRouter.studentDashboard);
    } else if (profileData.role == UserRole.tutor) {
      router.push(AppRouter.tutorDashboard);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // const reader = new FileReader();
    // reader.onloadend = () => {
    //   setImageUrl(reader.result as string);
    // };
    // reader.readAsDataURL(file);

    if (!file) return;

    setImageFile(file); // Save the File object for upload

    // Optional: Show preview
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
  };

  const changeProfile = async () => {
    try {
      if (imageFile) {
        const formData = new FormData();
        formData.append("1_profile_picture", imageFile);

        console.log("profile", formData);

        const response = await updateProfile(formData);
        if (response.errorCode) {
          showToast("Profile update failed", "error");
        } else {
          showToast("Profile updated successfully", "success");
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!profileData) return <div>Loading...</div>;
  return (
    <div>
      <div
        className={twMerge(
          "fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]  bg-grayToggle z-20 sm:rounded-lg max-sm:w-svw max-sm:h-svh overflow-auto",
          showDetail
            ? "w-[90%] md:w-[500px] min-h-[600px]"
            : "w-[90%] lg:w-[800px] h-[500px]"
        )}
      >
        <div className="h-[80px] bg-theme w-full sm:rounded-t-lg relative">
          {profileData && user?.role !== "staff" && user?.role !== "admin" && (user?.id !== profileData.id) && (
            <button
              onClick={async () => {
                if (user && profileData) {
                  showLoading();
                  try {
                    const chatId = await createConversation({
                      user1Id: user.id,
                      user2Id: profileData.id,
                    });
                    hideLoading();
                    if (user.role === "student") {
                      router.push(`${AppRouter.studentChatBox}?id=${chatId}`);
                    } else if (user.role === "tutor") {
                      router.push(`${AppRouter.tutorChatBox}?id=${chatId}`);
                    }
                  } catch (err) {
                    hideLoading();
                    showToast(
                      "Unexpected error occured. Please try again later",
                      "error"
                    );
                  }
                }
              }}
              className="absolute flex flex-row justify-center items-center gap-3 -bottom-5 right-[60px] bg-grayToggle text-gray-600 rounded-lg shadow-md px-4 py-2"
            >
              <div className="relative w-7 h-7 opacity-80">
                <Image src={MessageIcon} alt="Message" fill={true} />
              </div>
              <span className="text-base text-iconGray">Message</span>
            </button>
          )}
        </div>
        {!profileData && (
          <div className="text-2xl text-center mt-40">User Not Found</div>
        )}
        {profileData && (
          <div>
            {/* profile photo */}
            {/* <div className="relative"> */}
            <div
              className="absolute top-6 left-[60px] w-[100px] h-[100px] rounded-full overflow-hidden group"
              onMouseEnter={() =>
                window.innerWidth >= 640 && setProfileHover(true)
              }
              onMouseLeave={() =>
                window.innerWidth >= 640 && setProfileHover(false)
              }
            >
              {/* Profile Image */}
              {profileData.profileImagePath || previewUrl ? (
                <img
                  src={
                    previewUrl ?? profileData?.profileImagePath ?? UserIcon.src
                  }
                  className="w-full h-full object-cover sm:cursor-pointer"
                  alt=""
                />
              ) : (
                // <img
                //   src={DefaultProfile.src}
                //   className="w-full h-full object-cover pointer-events-none"
                //   alt="Default Profile"
                // />

                <FaUserCircle className="text-[100px] text-white bg-theme cursor-pointer" />
              )}

              {/* Hover Overlay */}
              {!showDetail && isProfileHover && (
                <div
                  className="absolute inset-0 bg-black/50 flex items-center justify-center z-10 sm:cursor-pointer flex-col"
                  onClick={() => inputFileRef.current?.click()}
                >
                  <MdOutlineEdit className="text-4xl text-gray-200" />
                  <div className="text-[12px] text-white">Choose Photo</div>
                </div>
              )}
            </div>

            <div
              className="sm:hidden px-1.5 py-1 text-gray-500 bg-white border border-gray-300 absolute left-[130px] top-[90px] rounded-md"
              onClick={() => inputFileRef.current?.click()}
            >
              <MdOutlineEdit className="text-lg cursor-pointer" />
            </div>

            {!showDetail && (
              <button
                className={twMerge(
                  "px-2 sm:px-5 max-sm:text-sm py-1 rounded-md absolute left-[170px] top-[90px]",
                  imageFile
                    ? "bg-theme hover:bg-themeHover text-white"
                    : "bg-gray-300 text-gray-500"
                )}
                disabled={imageFile ? false : true}
                onClick={changeProfile}
              >
                Save Profile
              </button>
            )}

            <input
              type="file"
              className="hidden"
              name=""
              ref={inputFileRef}
              onChange={handleImageChange}
              id=""
            />

            {/* </div> */}

            {/* User details */}
            <div
              className={twMerge(
                "mt-5 p-10",
                showDetail ? "pb-5" : "pb-0 px-[52px]"
              )}
            >
              <div className="flex gap-5 items-center">
                <h1 className="text-2xl text-profileHeading font-bold">
                  {profileData.firstName +
                    " " +
                    (profileData.middleName ?? "") +
                    " " +
                    profileData.lastName}
                </h1>
                {showDetail && (
                  <div className="flex gap-2 items-center mt-1">
                    <StatusIcon status={profileData.status} activeDays={0} />
                    <span className="font-bold text-gray-500">
                      {profileData.status}
                    </span>
                  </div>
                )}
              </div>

              {showDetail && (
                <div className="flex flex-wrap mt-5 gap-x-20 gap-y-3 font-bold text-profileText text-sm">
                  <div className="flex gap-2">
                    <img src={Email.src} className="w-5 h-5" alt="" />
                    {profileData.email}
                  </div>
                  {profileData.phoneNumber && (
                    <div className="flex gap-2">
                      <img src={Phone.src} className="w-5 h-5" alt="" />
                      {profileData.phoneNumber}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Tab Component */}
            <div className="w-full px-5">
              <div
                className={twMerge(
                  "rounded-lg px-8 py-3",
                  showDetail ? "bg-detailBg sm:h-[280px] min-h-[300px]" : ""
                )}
              >
                {/* tabs */}
                <TabComponent
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  tabs={tabs}
                />

                {/* tab Content */}
                <div className="">
                  {/* about tab */}
                  {(activeTab === tabLabels.about ||
                    activeTab === tabLabels.aboutMe) && (
                    <DataComponent data={about} showDetail={showDetail} />
                  )}

                  {/* Emergency Contact tab */}
                  {activeTab === tabLabels.emgContact && (
                    <DataComponent data={emgContacts} showDetail={showDetail} />
                  )}

                  {/* info tab */}
                  {(activeTab === tabLabels.staffInfo ||
                    activeTab === tabLabels.tutorInfo ||
                    activeTab === tabLabels.studentInfo) && (
                    <DataComponent data={info} showDetail={showDetail} />
                  )}

                  {/* change password tab */}
                  {activeTab === tabLabels.changePassword && (
                    <div
                      className={twMerge(
                        " flex items-center justify-center",
                        errors.currentPassword ||
                          errors.newPassword ||
                          errors.confirmPassword
                          ? "mt-3"
                          : "mt-5"
                      )}
                    >
                      <form action="" onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-[300px] sm:w-[400px] flex flex-col gap-y-3">
                          <ChangePasswordInput
                            label="Current"
                            placeholder="Enter Your Current Password"
                            register={register("currentPassword")}
                            error={errors.currentPassword}
                          />
                          <ChangePasswordInput
                            label="New"
                            placeholder="Enter Your New Password"
                            register={register("newPassword")}
                            error={errors.newPassword}
                          />
                          <ChangePasswordInput
                            label="Confirm"
                            placeholder="Confirm Your Current Password"
                            register={register("confirmPassword")}
                            error={errors.confirmPassword}
                          />
                          {/* {error && <p className="p-0 m-0">{error.message}</p>} */}
                          {errors.currentPassword && (
                            <p className="p-0 m-0 text-red-500 text-sm">
                              {errors.currentPassword.message}
                            </p>
                          )}
                          {!errors.currentPassword && errors.newPassword && (
                            <p className="p-0 m-0 text-red-500 text-sm">
                              {errors.newPassword.message}
                            </p>
                          )}
                          {!errors.currentPassword &&
                            !errors.newPassword &&
                            errors.confirmPassword && (
                              <p className="p-0 m-0 text-red-500 text-sm">
                                {errors.confirmPassword.message}
                              </p>
                            )}

                          <button
                            type="submit"
                            className={twMerge(
                              "w-full bg-theme hover:bg-themeHover py-3 text-white font-bold rounded-lg transition-200",
                              errors.currentPassword ||
                                errors.newPassword ||
                                errors.confirmPassword
                                ? ""
                                : "mt-4"
                            )}
                          >
                            Confirm
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {showDetail && user?.role === UserRole.staff && (
              <div
                className="float-right mb-5 mt-3 me-5"
                onClick={() => viewDashboard(profileData)}
              >
                <button className="bg-theme px-5 py-3 rounded-md text-white font-bold">
                  View Dashboard
                </button>
              </div>
            )}
          </div>
        )}

        {/* close icon */}
        <div
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => {
            setProfileDetailPopup && setProfileDetailPopup(false);
            showDetail && setShowDetail(false);
          }}
        >
          <img src={Close.src} className="text-backgroundOpposite" alt="" />
        </div>
      </div>
      <div
        className="fixed bg-black/70 z-[15] top-0 left-0 w-svw h-svh"
        onClick={() => {
          setProfileDetailPopup && setProfileDetailPopup(false);
          showDetail && setShowDetail(false);
        }}
      ></div>
    </div>
  );
}
