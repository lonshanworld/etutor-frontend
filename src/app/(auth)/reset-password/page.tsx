"use client";

import { resetPassword } from "@/api/services/authService";
import resetPasswordImg from "@/assets/images/reset-password.png";
import Button from "@/components/buttons/Button";
import InputFieldType1 from "@/components/inputfields/InputFieldType1";
import ForgetLayout from "@/components/resetpassword/ForgetLayout";
import { AppRouter } from "@/router";
import { errorStore } from "@/stores/errorStore";
import { useToast } from "@/stores/useToast";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const otp = searchParams.get("otp") || "";
  const [formData, setFormData] = useState({
    password: "",
    repassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const { setError } = errorStore();
  const { showToast } = useToast();
  const router = useRouter();

  // Handle input changes dynamically
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setPasswordError("");
  }

  // Validate password inputs
  const validatePasswords = () => {
    const { password, repassword } = formData;
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!password) return "Password is required.";
    if (!strongPasswordRegex.test(password)) {
      return "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.";
    }
    if (password !== repassword) return "Passwords do not match.";
    return "";
  };

  const handleSubmit = async () => {
    const validationError = validatePasswords();
    if (validationError) {
      setPasswordError(validationError);
      return;
    }

    try {
      setSubmitting(true);
      await resetPassword(email, formData.password, formData.repassword, otp);

      router.push(AppRouter.loginPage);
      return;
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
      type='2'
      backUrl='/login'
      mainHeader='Reset Password'
      img={resetPasswordImg}
      imgAlt='Reset Password Illustration'
    >
      <div className='space-y-3'>
        <InputFieldType1
          id='password'
          label='New Password'
          type='password'
          ariaLabel='Enter your new password'
          onChange={handleInputChange}
        />
        <InputFieldType1
          id='repassword'
          label='Re-enter New Password'
          type='password'
          ariaLabel='Re enter your new password again'
          onChange={handleInputChange}
          error={passwordError}
        />
      </div>
      <div className='mt-5'></div>
      <Button
        disabled={isSubmitting}
        onClick={handleSubmit}
        type='button'
        text='Reset Password'
        ariaLabel='Reset password button'
      />
    </ForgetLayout>
  );
};

export default function ResetPwPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordPage />
    </Suspense>
  );
}
