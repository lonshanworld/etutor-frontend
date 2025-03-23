"use client";

import ErrorPopup from "@/components/ErrorPopup";
import ToggleTheme from "@/components/ToggleTheme";
import { errorStore } from "@/stores/errorStore";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import Image, { StaticImageData } from "next/image";

interface Props {
  type: string;
  backUrl: string;
  mainHeader: string;
  img: StaticImageData;
  imgAlt: string;
  header?: string;
  txt?: string;
  txtCenter?: boolean;
  children: React.ReactNode;
}

export default function ForgetLayout({
  type,
  backUrl,
  mainHeader,
  img,
  imgAlt,
  header,
  txt,
  txtCenter = false,
  children,
}: Props) {
  const { isError } = errorStore();
  return (
    <>
      {isError && <ErrorPopup />}
      <div className='flex justify-center items-center w-full h-svh bg-theme'>
        <div className='absolute top-6 right-8'>
          <ToggleTheme />
        </div>
        <div className='w-[90%] sm:w-[500px] h-auto flex flex-col items-center bg-secondaryBackground p-6 sm:py-9 sm:mt-0 rounded-xl shadow-cusShadow'>
          {type === "1" ? (
            <div className='w-full flex gap-3 items-center'>
              <Link
                className='text-theme text-3xl'
                href={backUrl}
              >
                <IoMdArrowBack />
              </Link>
              <h2 className='text-font font-bold text-2xl'>{mainHeader}</h2>
            </div>
          ) : (
            <div className='w-full flex justify-between'>
              <h2 className='text-font font-bold text-2xl'>{mainHeader}</h2>
              <Link
                href={backUrl}
                className='text-theme text-3xl'
              >
                <RxCross1 />
              </Link>
            </div>
          )}
          <Image
            src={img}
            alt={imgAlt}
            className={`w-auto object-contain my-6 ${
              type === "1" ? "h-[180px]" : "h-[140px]"
            }`}
          />
          <div className='flex flex-col w-full'>
            {header && (
              <h2 className='font-bold text-lg sm:text-xl text-font'>
                {header}
              </h2>
            )}
            {txt && (
              <p className={`text-sm text-font ${txtCenter && "text-center"}`}>
                {txt}
              </p>
            )}

            {children}
          </div>
        </div>
      </div>
    </>
  );
}
