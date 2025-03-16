"use client";

import { resetPassword } from "@/api/services/authService";
import resetPasswordImg from "@/assets/images/reset-password.png";
import Button from "@/components/buttons/Button";
import ErrorPopup from "@/components/ErrorPopup";
import FormInputField from "@/components/inputfields/FormInputField";
import { AppRouter } from "@/router";
import { errorStore } from "@/stores/errorStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { isError, setError, message } = errorStore();

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
    setPasswordError("");
  }

  function handleRePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRepassword(e.target.value);
    setPasswordError("");
  }

  const handleSubmit = async () => {
    // Check password
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return;
    }

    if (password !== repassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    try {
      const response = await resetPassword(email, password);
      console.log(response); // log
      if (response.message == "success") {
        console.log("Password changed success"); // log
        router.push(AppRouter.loginPage);
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

  const router = useRouter();
  return (
    <>
      {isError && <ErrorPopup />}
      <div className='flex justify-center items-start sm:items-center w-full min-h-screen  bg-theme'>
        <div className='w-[90%] sm:w-[500px] h-auto flex flex-col items-center bg-secondaryBackground p-6 sm:py-9 mt-10 sm:mt-0 rounded-xl shadow-2xl'>
          <div className='w-full flex justify-between'>
            <h2 className='text-font font-bold text-2xl'>Reset Password</h2>
            <Link
              href='/login'
              className='text-theme text-3xl'
            >
              <RxCross1 />
            </Link>
          </div>
          <Image
            src={resetPasswordImg}
            alt='OTP Verification Illustration'
            className='h-[140px] w-auto object-contain my-6'
          />
          <div className='flex flex-col w-full '>
            <div className='space-y-3'>
              <FormInputField
                id='new-password'
                label='New Password'
                type='password'
                onChange={handlePasswordChange}
              />
              <FormInputField
                id='confirm-new-password'
                label='Re-enter New Password'
                type='password'
                onChange={handleRePasswordChange}
                error={passwordError}
              />
            </div>
            <div className='mt-5'></div>
            <Button
              onClick={handleSubmit}
              type='button'
              text='Reset Password'
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
