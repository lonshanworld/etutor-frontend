"use client";

import forgetPassword from "@/assets/images/forget-password.png";
import Button from "@/components/buttons/Button";
import InputField from "@/components/inputfields/InputField";
import Image from "next/image";
import { RxCross1 } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { AppRouter } from "@/router";
import { useState } from "react";
import { errorStore } from "@/stores/errorStore";
import ErrorPopup from "@/components/ErrorPopup";
import { IoMdArrowBack } from "react-icons/io";
import Link from "next/link";
import router from "@/router";

const ForgetPasswordPage = () => {
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const { isError, setError, message } = errorStore();

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    setEmailError("");
  }

  function checkEmailExists(email: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate API response
        const emailExists = email === "test@gmail.com"; // Example email
        if (emailExists) {
          resolve(true); // Email exists
        } else {
          reject("Email not found!"); // Email not found
        }
      }, 1000); // Simulating network delay
    });
  }

  function sendOtp() {
    if (!email) {
      setEmailError("Email address is required.");
      return;
    }

    setSubmitting(true);
    checkEmailExists(email)
      .then(() => {
        setSubmitting(false);
        router.push(AppRouter.verifyOtp);
      })
      .catch((error) => {
        setSubmitting(false);
        setError(`Error: ${error}`);
      });
  }

  return (
    <>
      {isError && <ErrorPopup />}
      <div className='flex justify-center items-start sm:items-center w-full min-h-screen  bg-theme'>
        <div className='w-[90%] sm:w-[500px] h-auto flex flex-col items-center bg-secondaryBackground p-6 sm:p-9 mt-10 sm:mt-0 rounded-xl shadow-2xl'>
          <div className='w-full flex gap-3 items-center'>
            <Link className='text-theme text-3xl' href='/login'>
              <IoMdArrowBack />
            </Link>
            <h2 className='text-font font-bold text-2xl'>OTP Verification</h2>
            {/* <button className='text-theme text-3xl'>
              <RxCross1 />
            </button> */}
          </div>
          <Image
            src={forgetPassword}
            alt='OTP Verification Illustration'
            className='h-[180px] w-auto object-contain my-6'
          />
          <div className='flex flex-col w-full '>
            <h2 className='font-bold text-lg sm:text-xl text-font'>
              Enter Your Email Address
            </h2>
            <p className='text-sm text-font'>
              We will send you a confirmation code
            </p>
            <InputField
              id='email'
              type='email'
              onChange={handleEmailChange}
              error={emailError}
            />
            <div className='mt-5'></div>
            <Button
              disabled={isSubmitting}
              onClick={sendOtp}
              type='button'
              text='Send OTP'
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPasswordPage;
