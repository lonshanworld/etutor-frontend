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
    page,
    setShowForm,
    setPageForm,
    role,
    isUpdateFormRendered,
  } = useFormStore();

  useEffect(() => {
    if (showForm) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [showForm]);
  const handleBack = () => {
    page === 2 ? setPageForm(1) : setShowForm();
  };

  const getSecondPage = () => {
    switch (Number(role)) {
      case UserRole.student:
        return <StudentPage setPageForm={setPageForm} />;
      case UserRole.tutor:
        return <TutorPage setPageForm={setPageForm} />;
      case UserRole.staff:
        return <StaffPage setPageForm={setPageForm} />;
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
              page === 1 ? "bg-backgroundOpposite" : "bg-theme"
            }`}
          ></hr>
          <span className="flex relative items-center justify-center">
            {page === 1 ? (
              <GiCircle className={`text-3xl text-backgroundOpposite`} />
            ) : (
              <FaCircle className="text-3xl text-theme" />
            )}
            <span
              className={`absolute ${
                page === 1 ? "text-backgroundOpposite" : "text-white"
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
          {page === 1 ? (
            isUpdateFormRendered ? (
              <UpdateFirstPage role={role} setPageForm={setPageForm} />
            ) : (
              <FirstPage role={role} setPageForm={setPageForm} />
            )
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
        onClick={setShowForm}
      ></div>
    </div>
  );
};

export default Form;
