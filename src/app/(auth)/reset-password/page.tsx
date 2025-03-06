"use client";

import resetPassword from "@/assets/images/reset-password.png";
import Button from "@/components/buttons/Button";
import InputField from "@/components/inputfields/InputField";
import Image from "next/image";
import { RxCross1 } from "react-icons/rx";
import { useRouter } from "next/navigation";

const ResetPasswordPage = () => {
  const router = useRouter();
  return (
    <div className='flex justify-center items-start sm:items-center w-full min-h-screen  bg-theme'>
      <div className='w-[90%] sm:w-[500px] h-auto flex flex-col items-center bg-secondaryBackground p-6 sm:p-9 mt-10 sm:mt-0 rounded-xl shadow-2xl'>
        <div className='w-full flex justify-between'>
          <h2 className='text-font font-bold text-2xl'>Reset Password</h2>
          <button className='text-theme text-3xl'>
            <RxCross1 />
          </button>
        </div>
        <Image
          src={resetPassword}
          alt='OTP Verification Illustration'
          className='h-[140px] w-auto object-contain my-6'
        />
        <div className='flex flex-col w-full '>
          <div className='space-y-3'>
            <InputField id='email' label='New Password' type='email' />
            <InputField id='email' label='Re-enter New Password' type='email' />
          </div>
          <div className='mt-5'></div>
          <Button type='button' text='Reset Password' />
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
