"use client";

import Button from "@/components/buttons/Button";
import Image from "next/image";
import verifyOtp from "@/assets/images/verify-otp.png";
import { RxCross1 } from "react-icons/rx";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { AppRouter } from "@/router";

const OTP_LENGTH = 6;

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.replace(/\D/, ""); // Allow only digits

    if (value) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault(); // Prevent browser's default backspace behavior

      if (otp[index]) {
        // Clear current input if there's a value
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // Move to previous input and clear it
        inputRefs.current[index - 1]?.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

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

  const handleSubmit = () => {
    const fullOtp = otp.join("");
    if (fullOtp.length < OTP_LENGTH) {
      setError("Please enter a complete OTP.");
      return;
    }
    setError("");
    console.log(fullOtp);
    router.push(AppRouter.resetPassword);
  };

  return (
    <div className='flex justify-center items-center w-full min-h-screen bg-theme'>
      <div className='w-[90%] sm:w-[500px] h-auto flex flex-col items-center bg-secondaryBackground p-6 sm:p-9 rounded-xl shadow-2xl'>
        <div className='w-full flex justify-between'>
          <h2 className='text-font font-bold text-2xl'>Verify OTP</h2>
          <button className='text-theme text-3xl'>
            <RxCross1 />
          </button>
        </div>
        <Image
          src={verifyOtp}
          alt='OTP Verification Illustration'
          className='h-[180px] w-auto object-contain my-6'
        />
        <p className='text-sm text-font text-center'>
          We have sent a verification code to your email.
        </p>
        <div className='flex justify-between w-full mt-6' onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
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
        {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
        <div className='mt-5'></div>
        <Button onClick={handleSubmit} type='button' text='Verify OTP' />
      </div>
    </div>
  );
};

export default VerifyOtpPage;
