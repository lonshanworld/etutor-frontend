"use client";
import { FaCircle } from "react-icons/fa";
import { GiCircle } from "react-icons/gi";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { FiArrowLeft } from "react-icons/fi";
import FirstPage from "./FirstPage";
import StudentPage from "./StudentPage";
import { useFormStore } from "@/stores/useFormStore";
import TutorPage from "./TutorPage";
import StaffPage from "./StaffPage";

const Form = () => {
  const { showForm, page, setShowForm, setPageForm, role } = useFormStore();

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
    switch (role) {
      case "student":
        return <StudentPage setPageForm={setPageForm} />;
      case "tutor":
        <TutorPage setPageForm={setPageForm} />;
      case "staff":
        <StaffPage setPageForm={setPageForm} />;
    }
  };
  return (
    <div>
      <div
        className={twMerge(
          "fixed top-0 w-full md:w-[750px]  min-h-screen h-screen overflow-y-auto max-lg:overflow-auto bg-formBackground p-14 z-10 transition-all duration-500 ease-in-out",
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
            Create Account
          </div>
          {page === 1 ? (
            <FirstPage role={role} setPageForm={setPageForm} />
          ) : (
            getSecondPage()
          )}
        </div>
      </div>
      <div
        className={twMerge(
          "bg-black/70 w-screen h-screen fixed top-0 left-0 z-1",
          !showForm && "hidden"
        )}
        onClick={setShowForm}
      ></div>
    </div>
  );
};

export default Form;
