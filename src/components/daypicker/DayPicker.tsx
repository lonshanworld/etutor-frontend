"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { format, subYears } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { CiCalendarDate } from "react-icons/ci";
import { twMerge } from "tailwind-merge";

export const DayPicker = ({ register, watch, setValue, error }: any) => {
  const [date, setDate] = useState<Date | null>(new Date());
  const maxDate = subYears(new Date(), 18);
  return (
    <div className="flex items-center">
      <span className="-me-6 ms-2 relative z-10">
        <CiCalendarDate />
      </span>
      <DatePicker
        className={twMerge(
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : "border-inputBorder focus:!border-theme focus:ring-theme",
          "px-8 border-[1px] w-full min-w-[150px] h-[45px] rounded-md flex items-center focus:outline-none focus:ring-1"
        )}
        selected={watch("dob")} // Watch the dob value from react-hook-form
        onChange={(date: Date | null) => {
          setDate(date);
          if (date) {
            setValue("dob", format(date, "yyyy-MM-dd"));
          }
        }}
        maxDate={maxDate} // Disable dates after 18 years ago
        minDate={subYears(new Date(), 100)}
      />
      <input type="hidden" {...register} />
      {/* Hidden input to register dob */}
    </div>
  );
};
