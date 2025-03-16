"use client";

import { confirmOtp } from "@/api/services/authService";
import verifyOtp from "@/assets/images/verify-otp.png";
import Button from "@/components/buttons/Button";
import ErrorPopup from "@/components/ErrorPopup";
import { AppRouter } from "@/router";
import { errorStore } from "@/stores/errorStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";

const OTP_LENGTH = 6;

const ConfirmOtpPage = () => {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [otpError, setOtpError] = useState("");
  const { isError, setError, message } = errorStore();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  // Handle OTP digit change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.replace(/\D/, ""); // Allow only digits
    if (value) {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = value;
        return newOtp;
      });
      if (index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle Backspace key
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        if (newOtp[index]) {
          newOtp[index] = "";
        } else if (index > 0) {
          newOtp[index - 1] = "";
          inputRefs.current[index - 1]?.focus();
        }
        return newOtp;
      });
    }
  };

  // Handle paste event for OTP
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData("text")
      .slice(0, OTP_LENGTH)
      .replace(/\D/g, "");
    if (pasteData.length === OTP_LENGTH) {
      setOtp(pasteData.split(""));
      inputRefs.current[OTP_LENGTH - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const fullOtp = otp.join("");
    if (fullOtp.length < OTP_LENGTH) {
      setOtpError("Please enter a complete OTP.");
      return;
    }
    setOtpError("");

    console.log(email, fullOtp); // log

    try {
      const response = await confirmOtp(email, fullOtp);
      console.log("resp", response); // log
      if (response.message === "OTP Confirmed") {
        router.push(
          `${AppRouter.resetPassword}?email=${encodeURIComponent(email)}`
        );
      } else if (response.message === "Invalid OTP") {
        setError("The code you entered is invalid. Please try again.");
      } else {
        setError("An unknown error occurred. Please try again.");
      }
    } catch (error) {
      const errorMsg =
        error instanceof Error
          ? error.message
          : "An unknown error occurred. Please try again.";
      setError(errorMsg);
    }
  };

  return (
    <>
      {isError && <ErrorPopup />}
      <div className='flex justify-center items-center w-full min-h-screen bg-theme'>
        <div className='w-[90%] sm:w-[500px] h-auto flex flex-col items-center bg-secondaryBackground p-6 sm:py-9 mt-10 sm:mt-0 rounded-xl shadow-2xl'>
          <div className='w-full flex gap-3 items-center'>
            <Link
              className='text-theme text-3xl'
              href='/forget-password'
            >
              <IoMdArrowBack />
            </Link>
            <h2 className='text-font font-bold text-2xl'>Verify OTP</h2>
          </div>
          <Image
            src={verifyOtp}
            alt='OTP Verification Illustration'
            className='h-[180px] w-auto object-contain my-6'
          />
          <p className='text-sm text-font text-center'>
            We have sent a verification code to your email.
          </p>
          <div
            className='flex justify-between w-full mt-6'
            onPaste={handlePaste}
          >
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type='text'
                value={digit}
                maxLength={1}
                className='w-[45px] sm:w-[60px] h-[50px] sm:h-[65px] text-center text-2xl border border-gray-500 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-theme transition'
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                aria-label={`OTP digit ${index + 1}`}
              />
            ))}
          </div>
          {otpError && <p className='text-red-500 text-sm mt-2'>{otpError}</p>}
          <div className='mt-5'></div>
          <Button
            onClick={handleSubmit}
            type='button'
            text='Verify OTP'
          />
        </div>
      </div>
    </>
  );
};

export default ConfirmOtpPage;
