"use client";

import forgetPassword from "@/assets/images/forget-password.png";
import Button from "@/components/buttons/Button";
import ErrorPopup from "@/components/ErrorPopup";
import FormInputField from "@/components/inputfields/FormInputField";
import { AppRouter } from "@/router";
import { errorStore } from "@/stores/errorStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { checkEmailExists } from "@/api/services/authService";

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

  const handleSendOtp = async () => {
    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }

    setSubmitting(true);
    try {
      const response = await checkEmailExists(email);
      console.log(response);

      const { message, otp } = response; // temp add otp for testing, remove afterward

      console.log("OTP", otp); // log

      if (message === "email found !") {
        router.push(
          `${AppRouter.confirmOtp}?email=${encodeURIComponent(email)}`
        );
        return;
      }

      if (message === "email not found!") {
        setError("Email not found");
      }
    } catch (error) {
      const errorMsg =
        error instanceof Error
          ? error.message
          : "An unknown error occurred. Please try again.";
      setError(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {isError && <ErrorPopup />}
      <div className='flex justify-center items-start sm:items-center w-full min-h-screen  bg-theme'>
        <div className='w-[90%] sm:w-[500px] h-auto flex flex-col items-center bg-secondaryBackground p-6 sm:py-9 mt-10 sm:mt-0 rounded-xl shadow-2xl'>
          <div className='w-full flex gap-3 items-center'>
            <Link
              className='text-theme text-3xl'
              href='/login'
            >
              <IoMdArrowBack />
            </Link>
            <h2 className='text-font font-bold text-2xl'>OTP Verification</h2>
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
            <FormInputField
              id='email'
              type='email'
              placeholder='user@example.com'
              ariaLabel='Email address input'
              onChange={handleEmailChange}
              error={emailError}
            />
            <div className='mt-5'></div>
            <Button
              disabled={isSubmitting}
              onClick={handleSendOtp}
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
