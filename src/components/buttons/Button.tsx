"use client";

import Spinner from "../Spinner";

interface Props {
  text: string;
  type: "submit" | "button";
  ariaLabel?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: (event: React.FormEvent) => void;
}

export default function CustomButton({
  text,
  type,
  ariaLabel,
  fullWidth = false,
  disabled,
  onClick,
}: Props) {
  return (
    <button
      type={type}
      aria-label={ariaLabel}
      onClick={onClick}
      className={`${fullWidth ? "w-full" : "w-auto"} ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-theme w-auto hover:bg-teal-700"
      }  text-white text-lg py-1.5 px-4 rounded-lg  transition text-center`}
      disabled={disabled}
    >
      {text}
      {disabled && (
        <span className='pl-1.5'>
          <Spinner />
        </span>
      )}
    </button>
  );
}
