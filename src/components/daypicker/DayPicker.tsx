"use client";

import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { format, parseISO, subYears } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { CiCalendarDate } from "react-icons/ci";
import { twMerge } from "tailwind-merge";

export const DayPicker = ({
  input,
  register,
  watch,
  setValue,
  error,
  value,
  onChange,
}: any) => {
  const [date, setDate] = useState<Date | null>(null);
  const [currentDate, setCurrentDate] = useState(value);
  const maxDate = subYears(new Date(), 18);

  const dobValue = watch(input) || ""; // Ensure it's a string
  const parsedDate = dobValue ? parseISO(dobValue) : null; // Convert to Date

  useEffect(() => {
    if (value) {
      setCurrentDate(value);
    }
  }, [value]);

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
          "px-8 border-[1px] w-full min-w-[150px] h-[45px] bg-transparent rounded-md flex items-center focus:outline-none focus:ring-1"
        )}
        selected={parsedDate} // Watch the dob value from react-hook-form
        value={currentDate}
        onChange={(date: Date | null) => {
          setDate(date);
          setCurrentDate(date);
          if (date) {
            setValue(input, format(date, "yyyy-MM-dd"));
          }
        }}
      />
      <input
        type="hidden"
        name="dob"
        value={currentDate || date || ""}
        onChange={onChange}
        {...register}
      />
    </div>
  );
};
