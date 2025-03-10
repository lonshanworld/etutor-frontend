"use client";

import desktopImage from "@/assets/images/desktop-login-icon.png";
import mobileImage from "@/assets/images/mobile-login-icon.png";
import Button from "@/components/buttons/Button";
import ErrorPopup from "@/components/ErrorPopup";
import InputField from "@/components/inputfields/InputField";
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

  // Test API
  async function testLogin(
    email: string,
    password: string
  ): Promise<{ email: string; name: string } | null> {
    return new Promise((resolve, reject) => {
      const testUser = {
        email: "test@gmail.com",
        password: "123456",
        name: "John Doe",
      };

      if (email === testUser.email && password === testUser.password) {
        resolve({ email: testUser.email, name: testUser.name });
      } else {
        reject(new Error("Incorrect email or password"));
      }
    });
  }

  async function handleLogin(data: LoginFormData) {
    try {
      const user = await testLogin(data.email, data.password);
      if (!user) {
        throw new Error("Incorrect email or password");
      }
      console.log("Login successful", user);
      router.push(AppRouter.introPage);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message || "Login failed. Please try again.");
      } else {
        setError("An unknown error occurred. Please try again.");
      }
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
                <InputField
                  id='email'
                  label='Email'
                  type='email'
                  placeholder='Enter Your Email'
                  register={register("email")}
                  error={errors.email?.message}
                />

                <InputField
                  id='password'
                  label='Password'
                  type='password'
                  placeholder='Enter Your Password'
                  register={register("password")}
                  error={errors.password?.message}
                />
              </div>

              <div className='flex justify-center mt-4'>
                <Button text='Sign In' type='submit' fullWidth={true} />
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
