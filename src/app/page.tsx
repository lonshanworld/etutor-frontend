"use client";

import Image from "next/image";
import IntroLogo from "@/assets/svgs/introLogo.svg";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AppRouter } from "@/router";

export default function Home() {
  // const { isError } = errorStore();
  const router = useRouter();
  const [seconds, setSeconds] = useState(3);

  useEffect(() => {
    if (seconds === 0) {
      router.push(AppRouter.loginPage);
      return;
    }

    const countdown = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(countdown);
  }, [seconds, router]);

  const skipRedirect = () => {
    router.push(AppRouter.loginPage);
  };

  return (
    <div className='w-full h-full relative flex flex-col items-center justify-center gap-1'>
      {/* {isError && <ErrorPopup />} */}
      <Image
        src={IntroLogo}
        width={200}
        height={200}
        alt='Proton University'
      />
      <span className='text-lg capitalize text-theme'>Proton University</span>
      <span className='text-3xl capitalize text-font pt-5 font-bold'>
        Ready to Learn ?
      </span>

      <div className='mt-6 text-center text-font'>
        <p className='text-sm'>
          Redirecting to login page in{" "}
          <strong className='text-theme'>{seconds}</strong> seconds...
        </p>
        <button
          onClick={skipRedirect}
          className='mt-2 px-4 py-1.5 bg-theme text-white rounded-xl text-sm hover:bg-theme-dark transition-all'
        >
          Skip
        </button>
      </div>
    </div>
  );
}
