import React, { ChangeEvent } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  id: string;
  label?: string;
  type: string;
  placeholder?: string;
  ariaLabel?: string;
  register?: UseFormRegisterReturn;
  error?: any;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInputField({
  id,
  label,
  type,
  placeholder,
  ariaLabel,
  register,
  error,
  onChange,
}: Props) {
  return (
    <div className='w-full'>
      {label && (
        <label
          htmlFor={id}
          className='block text-sm font-medium text-font'
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className='mt-2 h-10 w-full px-4 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-md'
        placeholder={placeholder}
        aria-label={ariaLabel}
        onChange={onChange}
        {...register}
      />
      {error && <p className='text-red-500 text-sm pt-1'>{error}</p>}
    </div>
  );
}
