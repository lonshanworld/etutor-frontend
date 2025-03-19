"use client";

import { checkEmailExists } from "@/api/services/authService";
import forgetPassword from "@/assets/images/forget-password.png";
import Button from "@/components/buttons/Button";
import InputFieldType1 from "@/components/inputfields/InputFieldType1";
import { AppRouter } from "@/router";
import { errorStore } from "@/stores/errorStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ForgetLayout from "@/components/resetpassword/ForgetLayout";

const ForgetPasswordPage = () => {
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const { setError } = errorStore();

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    setEmailError("");
  }

  function isValidEmail(email: string) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

  const handleSendOtp = async () => {
    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    try {
      setSubmitting(true);
      const response = await checkEmailExists(email);
      console.log("OTP", response?.otp);
      router.push(`${AppRouter.confirmOtp}?email=${encodeURIComponent(email)}`);
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
      backUrl='/login'
      mainHeader='OTP verification'
      img={forgetPassword}
      imgAlt='OTP Verification Illustration'
      header='Enter Your Email Address'
      txt='We will send you a confirmation code'
    >
      <InputFieldType1
        id='email'
        type='email'
        placeholder='user@example.com'
        ariaLabel='Enter your email address'
        onChange={handleEmailChange}
        error={emailError}
      />
      <div className='mt-5'></div>
      <Button
        disabled={isSubmitting}
        onClick={handleSendOtp}
        type='button'
        text='Send OTP'
        ariaLabel='Send OTP button'
      />
    </ForgetLayout>
  );
};

export default ForgetPasswordPage;
