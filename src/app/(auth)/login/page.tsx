"use client";

import { getProfile } from "@/api/services/getProfile";
import { login } from "@/api/services/authService";
import desktopImage from "@/assets/images/desktop-login-icon.png";
import mobileImage from "@/assets/images/mobile-login-icon.png";
import Button from "@/components/buttons/Button";
import ErrorPopup from "@/components/ErrorPopup";
import FormInputField from "@/components/inputfields/FormInputField";
import LogoBox from "@/components/LogoBox";
import { AppRouter } from "@/router";
import { errorStore } from "@/stores/errorStore";
import { loginSchema } from "@/utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { isError, setError } = errorStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(data: LoginFormData) {
    try {
      const response = await login(data.email, data.password);

      const { message, token, errorMessage } = response;

      if (message === "success" && token) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7);

        sessionStorage.setItem(
          "authToken",
          JSON.stringify({ token, expiration: expirationDate.getTime() }) // Store expiration as timestamp
        );

        // console.log("Token", token);

        // Check role
        const user = await getProfile(token);
        // console.log("User", user);

        if (user?.role === "admin") {
          router.push(AppRouter.staffDashboard);
        } else if (user?.role === "staff") {
          router.push(AppRouter.staffDashboard);
        } else if (user?.role === "student") {
          router.push(AppRouter.studentDashboard);
        } else if (user?.role === "tutor") {
          router.push(AppRouter.tutorDashboard);
        }
        return;
      }

      if (errorMessage) {
        setError(errorMessage);
        return;
      }

      throw new Error("An unknown error occurred. Please try again.");
    } catch (error) {
      const errorMsg =
        error instanceof Error
          ? error.message
          : "An unknown error occurred. Please try again.";
      setError(errorMsg);
    }
  }

  return (
    <>
      {isError && <ErrorPopup />}
      <div className='h-screen flex items-center justify-center bg-login sm:px-4'>
        <div className='flex flex-col sm:flex-row justify-between bg-theme sm:bg-secondaryBackground sm:shadow-lg sm:rounded-3xl h-screen w-screen sm:w-full sm:max-w-[800px] sm:h-[583px] relative'>
          {/* Top Section */}
          <div className='flex flex-col items-center justify-center w-full sm:w-1/2 bg-theme sm:rounded-l-3xl sm:p-6 sm:rounded-tr-[100px]'>
            {/* Mobile Image */}
            <Image
              src={mobileImage}
              alt='Login Illustration'
              loading='lazy'
              className='object-contain sm:hidden'
            />

            {/* Desktop Image */}
            <Image
              src={desktopImage}
              alt='Login Illustration'
              loading='lazy'
              className='w-[80%] object-contain hidden sm:block'
            />
          </div>

          {/* Middle Section */}
          <div className='flex flex-col justify-center items-start sm:w-1/2 bg-secondaryBackground px-5 py-6 mx-5 sm:shadow-none shadow-lg rounded-lg'>
            <h2 className='text-3xl font-semibold text-font text-left'>
              Login
            </h2>
            <form
              onSubmit={handleSubmit(handleLogin)}
              className='w-full mt-1 flex flex-col'
            >
              <div className='mt-3.5 space-y-2'>
                <FormInputField
                  id='email'
                  label='Email'
                  type='email'
                  placeholder='Enter Your Email'
                  register={register("email")}
                  error={errors.email?.message}
                />

                <FormInputField
                  id='password'
                  label='Password'
                  type='password'
                  placeholder='Enter Your Password'
                  register={register("password")}
                  error={errors.password?.message}
                />
              </div>
              <div className='flex justify-center mt-4'>
                <Button
                  text='Sign In'
                  type='submit'
                  fullWidth={true}
                />
              </div>
              <Link
                href='/forget-password'
                className='pt-2 text-xs text-center text-theme cursor-pointer hover:underline'
              >
                Forgot password?
              </Link>
            </form>
          </div>

          {/* Bottom Section */}
          <div className='flex justify-end items-center w-full sm:w-auto p-6 sm:p-4 sm:absolute sm:top-0 sm:left:0'>
            <LogoBox />
          </div>
        </div>
      </div>
    </>
  );
}
