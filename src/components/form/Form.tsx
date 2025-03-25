"use client";
import { FaCircle } from "react-icons/fa";
import { GiCircle } from "react-icons/gi";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { FiArrowLeft } from "react-icons/fi";
import FirstPage from "./createform/FirstPage";
import StudentPage from "./secondpage/StudentPage";
import { useFormStore } from "@/stores/useFormStore";
import TutorPage from "./secondpage/TutorPage";
import StaffPage from "./secondpage/StaffPage";
import { UserRole } from "@/model/user";
import UpdateFirstPage from "./updateform/UpdateFirstPage";

const Form = () => {
  const {
    showForm,
    createPage,
    updatePage,
    setShowForm,
    setCreatePage,
    setUpdatePage,
    role,
    isUpdateFormRendered,
    setIsBackClick,
  } = useFormStore();

  useEffect(() => {
    if (showForm) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [showForm]);
  const handleBack = () => {
    setIsBackClick(true);
    if (isUpdateFormRendered) {
      updatePage === 2 ? setUpdatePage(1) : setShowForm();
    } else {
      createPage === 2 ? setCreatePage(1) : setShowForm();
    }
  };

  const getSecondPage = () => {
    if (!isUpdateFormRendered) {
      switch (role) {
        case UserRole.student:
          return <StudentPage setPageForm={setCreatePage} />;
        case UserRole.tutor:
          return <TutorPage setPageForm={setCreatePage} />;
        case UserRole.staff:
          return <StaffPage setPageForm={setCreatePage} />;
      }
    } else {
      switch (role) {
        case UserRole.student:
          return <StudentPage setPageForm={setUpdatePage} />;
        case UserRole.tutor:
          return <TutorPage setPageForm={setUpdatePage} />;
        case UserRole.staff:
          return <StaffPage setPageForm={setUpdatePage} />;
      }
    }
  };
  return (
    <div>
      <div
        className={twMerge(
          "fixed top-0 w-full md:w-[750px]  min-h-svh h-svh overflow-y-auto max-lg:overflow-auto bg-formBackground p-14 z-20 transition-all duration-500 ease-in-out",
          showForm ? "right-0" : "-right-[900px]"
        )}
      >
        <div className="close" onClick={handleBack}>
          <FiArrowLeft className="text-backgroundOpposite text-5xl bg-transparent border border-backgroundOpposite rounded-full p-3 hover:text-theme hover:border-theme cursor-pointer transition-200" />
        </div>

        {/* page number */}
        <div className="flex justify-center items-center">
          <span className="flex relative items-center justify-center">
            <FaCircle className="text-3xl text-theme" />
            <span className="absolute text-white">1</span>
          </span>
          <hr
            className={`w-10 h-[1px] my-8 border-0 ${
              createPage === 1 || updatePage === 1
                ? "bg-backgroundOpposite"
                : "bg-theme"
            }`}
          ></hr>
          <span className="flex relative items-center justify-center">
            {createPage === 1 || updatePage === 1 ? (
              <GiCircle className={`text-3xl text-backgroundOpposite`} />
            ) : (
              <FaCircle className="text-3xl text-theme" />
            )}
            <span
              className={`absolute ${
                createPage === 1 || updatePage === 1
                  ? "text-backgroundOpposite"
                  : "text-white"
              }`}
            >
              2
            </span>
          </span>
        </div>

        {/* form start */}
        <div className="">
          <div className="title text-[32px] font-[700] mb-5 text-headingColor">
            {isUpdateFormRendered ? "Update Account" : "Create Account"}
          </div>
          {isUpdateFormRendered ? (
            updatePage === 1 ? (
              <UpdateFirstPage role={role} setPageForm={setUpdatePage} />
            ) : (
              getSecondPage()
            )
          ) : createPage === 1 ? (
            <FirstPage role={role} setPageForm={setCreatePage} />
          ) : (
            getSecondPage()
          )}
        </div>
      </div>
      <div
        className={twMerge(
          "bg-black/70 w-screen h-svh fixed top-0 left-0 z-10",
          !showForm && "hidden"
        )}
        // onClick={setShowForm}
      ></div>
    </div>
  );
};

export default Form;
