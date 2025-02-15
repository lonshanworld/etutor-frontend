"use client";

import Button from "@/app/components/Button";
import InputField from "@/app/components/InputField";

export default function LoginPage() {
  return (
    <div className='h-screen flex items-center justify-center bg-[#363333] sm:px-4'>
      <div className='flex flex-col sm:flex-row justify-between bg-[#099797] sm:bg-gray-100 sm:shadow-lg sm:rounded-3xl h-screen w-screen sm:w-full sm:max-w-[800px] sm:h-[583px] relative'>
        {/* Top Section */}
        <div className='flex flex-col items-center justify-center w-full sm:w-1/2 bg-[#099797] sm:rounded-l-3xl sm:p-6 sm:rounded-tr-[100px]'>
          {/* Mobile Image */}
          <img
            src='/assets/images/mobile-login-icon.png'
            alt='Login Illustration'
            className='object-contain sm:hidden'
          />

          {/* Desktop Image */}
          <img
            src='/assets/images/desktop-login-icon.png'
            alt='Login Illustration'
            className='w-[80%] object-contain hidden sm:block'
          />
        </div>

        {/* Middle Section */}
        <div className='flex flex-col justify-center items-start sm:w-1/2 bg-gray-100 px-10 py-6 mx-5 sm:shadow-none shadow-lg rounded-lg'>
          <h2 className='text-3xl font-semibold text-gray-900 text-left'>
            Login
          </h2>
          <form className='w-full mt-4 flex flex-col gap-2'>
            <InputField
              id='email'
              label='Email'
              type='email'
              placeholder='Enter Your Email'
            />
            <InputField
              id='password'
              label='Password'
              type='password'
              placeholder='Enter Your Password'
            />
            <div className='flex justify-center'>
              <Button text='Sign In' type='submit' fullWidth={true} />
            </div>
            <p className='text-xs text-center text-[#099797] cursor-pointer hover:underline'>
              Forgot password?
            </p>
          </form>
        </div>

        {/* Bottom Section */}
        <div className='flex justify-end items-center w-full sm:w-auto  p-6 sm:p-4 sm:absolute sm:top-0 sm:left:0'>
          <img
            src='/assets/images/logo.png'
            alt='logo'
            className='w-28 object-contain'
          />
        </div>
      </div>
    </div>
  );
}
