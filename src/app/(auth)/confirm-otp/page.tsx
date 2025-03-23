"use client";

import { confirmOtp } from "@/api/services/authService";
import verifyOtp from "@/assets/images/verify-otp.png";
import Button from "@/components/buttons/Button";
import { AppRouter } from "@/router";
import { errorStore } from "@/stores/errorStore";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useRef, useState } from "react";
import ForgetLayout from "@/components/resetpassword/ForgetLayout";

const OTP_LENGTH = 6;

const ConfirmOtpPage = () => {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [otpError, setOtpError] = useState("");
  const { setError } = errorStore();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [isSubmitting, setSubmitting] = useState(false);

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

    try {
      setSubmitting(true);
      await confirmOtp(email, fullOtp);
      router.push(
        `${AppRouter.resetPassword}?email=${encodeURIComponent(
          email
        )}&otp=${encodeURIComponent(fullOtp)}`
      );
    } catch (error: any) {
      setError(
        error.errorText ||
          error.message ||
          "An unknown error occurred. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ForgetLayout
      type='1'
      backUrl='/forget-password'
      mainHeader='Verify OTP'
      img={verifyOtp}
      imgAlt='Verify OTP Illustration'
      txt=' We have sent a verification code to your email.'
      txtCenter={true}
    >
      <div
        className='flex justify-center sm:gap-4 gap-2 w-full mt-6'
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
            className='text-gray-900 w-[45px] sm:w-[60px] h-[50px] sm:h-[65px] text-center text-2xl border border-gray-500 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition'
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            aria-label={`OTP digit ${index + 1}`}
          />
        ))}
      </div>
      {otpError && <p className='text-errorMessage text-sm mt-2'>{otpError}</p>}
      <div className='mt-5'></div>
      <Button
        disabled={isSubmitting}
        onClick={handleSubmit}
        type='button'
        text='Verify OTP'
        ariaLabel='Verify OTP button'
      />
    </ForgetLayout>
  );
};

export default function ConfirmPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmOtpPage />
    </Suspense>
  );
}
