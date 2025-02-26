import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  error?: string;
  register: UseFormRegisterReturn;
}

export default function InputField({
  id,
  label,
  type,
  placeholder,
  error,
  register,
}: Props) {
  return (
    <div className='mt-3.5'>
      <label htmlFor={id} className='block text-sm font-medium text-font mb-1'>
        {label}
      </label>
      <input
        id={id}
        type={type}
        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-md'
        placeholder={placeholder}
        {...register}
      />
      {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
    </div>
  );
}
