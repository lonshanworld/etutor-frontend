import React, { ChangeEvent } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import "./style.css";
import { twMerge } from "tailwind-merge";

interface Props {
  id: string;
  label?: string | null;
  type: string;
  className?: string | null;
  register?: UseFormRegisterReturn;
  error?: any;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function InputField({
  id,
  label = null,
  type,
  className = null,
  register,
  error,
  placeholder,
  onChange,
}: Props) {
  return (
    <div className="relative grid grid-cols-1">
      <input
        id={id}
        type={type}
        {...register}
        className={twMerge(
          error?.name === id
            ? "placeholder-shown:border-red-500 border-red-500 focus:ring-red-500"
            : "placeholder-shown:border-inputBorder border-theme focus:border-teal-500 focus:ring-teal-500",
          className,
          "peer block w-full h-[45px] px-4 py-2.5 border bg-transparent rounded-lg focus:outline-none focus:ring-1 text-base"
        )}
        placeholder=" "
      />
      <label
        htmlFor={id}
        className={twMerge(
          error?.name === id
            ? "peer-focus:text-red-500 text-red-500"
            : "peer-focus:text-theme text-theme",
          "absolute px-2 left-2 -top-3 peer-placeholder-shown:text-label peer-placeholder-shown:top-3 peer-focus:-top-2.5 text-sm transition-300 bg-formBackground"
        )}
      >
        {label}
      </label>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
