import React, { ChangeEvent } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import "./style.css";
import { twMerge } from "tailwind-merge";
import { useFormStore } from "@/stores/useFormStore";

interface Props {
  id: string;
  label?: string;
  type: string;
  placeholder?: string;
  value?: string | null;
  ariaLabel?: string;
  register?: any;
  error?: { name: string | null; message: string | undefined };
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function FormInputField({
  id,
  label,
  type,
  placeholder,
  ariaLabel,
  register,
  error,
  value,
  onChange,
  className,
}: Props) {
  return (
    <div className="w-full relative">
      <input
        id={id}
        name={id}
        type={type}
        aria-label={ariaLabel}
        {...register}
        className={twMerge(
          error?.name === id
            ? "placeholder-shown:border-red-500 border-red-500 focus:ring-red-500"
            : "placeholder-shown:border-inputBorder border-theme focus:border-teal-500 focus:ring-teal-500",
          className,
          "peer block w-full h-[45px] px-4 py-2.5 border bg-transparent rounded-lg focus:outline-none focus:ring-1 text-base"
        )}
        placeholder={placeholder ?? " "}
        value={value ?? undefined}
        onChange={onChange}
      />
      {label && (
        <label
          htmlFor={id}
          className={twMerge(
            error?.name === id
              ? "peer-focus:text-red-500"
              : "peer-focus:text-theme",
            className,
            " text-theme absolute px-2 left-2 -top-3 peer-placeholder-shown:text-label peer-placeholder-shown:top-3 peer-focus:-top-3 text-sm transition-300 bg-formBackground"
          )}
        >
          {label}
        </label>
      )}
      {error && <p className="text-red-500 text-sm pt-1">{error.message}</p>}
    </div>
  );
}
