import { ChangeEvent } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import "./style.css";

interface Props {
  id: string;
  label?: string;
  type: string;
  placeholder?: string;
  value?: string | null;
  ariaLabel?: string;
  register?: UseFormRegisterReturn;
  error?: any;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
}

export default function MeetingInputField({
  id,
  label,
  type,
  placeholder,
  ariaLabel,
  register,
  error,
  className,
  disabled = false,
}: Props) {
  return (
    <div className='w-full relative'>
      {label && (
        <label
          htmlFor={id}
          className={twMerge(
            error?.name === id && "text-red-500",
            disabled && "opacity-25",
            className,
            "text-sm text-primaryText"
          )}
        >
          {label}
        </label>
      )}

      <input
        id={id}
        name={id}
        type={type}
        aria-label={ariaLabel ?? "input box"}
        disabled={disabled}
        {...register}
        className={twMerge(
          error?.name === id ?
            "placeholder-shown:border-red-500 border-red-500 focus:ring-red-500"
          : "placeholder-shown:border-inputBorder border-theme focus:border-teal-500 focus:ring-teal-500",
          disabled && "opacity-25",
          className,
          "peer block w-full h-[45px] px-4 py-2.5 border bg-transparent rounded-lg focus:outline-none focus:ring-1 text-base"
        )}
        placeholder={placeholder ?? " "}
      />

      {error && <p className='text-red-500 text-sm pt-1'>{error.message}</p>}
    </div>
  );
}
