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
  // console.log("selected date", value);

  return (
    <div>
      <div className="flex items-center">
        <span className="-me-6 ms-2 relative z-10">
          <CiCalendarDate />
        </span>

        <DatePicker
          className={twMerge(
            error.name === input && !date
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-inputBorder focus:!border-theme focus:ring-theme",
            "peer px-8 border-[1px] w-full min-w-[150px] h-[45px] bg-transparent rounded-md flex items-center focus:outline-none focus:ring-1"
          )}
          placeholderText="Select Date"
          selected={parsedDate} // Watch the dob value from react-hook-form
          value={currentDate || ""}
          onChange={(date: Date | null) => {
            console.log("date", date);
            setDate(date);
            setCurrentDate(date);
            if (date) {
              setValue(input, date ? format(date, "yyyy-MM-dd") : "");
            }
          }}
          onBlur={() => {
            if (!watch(input)) {
              setValue(input, ""); // Ensure error validation runs
            }
          }}
          isClearable
        />
        <input
          type="hidden"
          name={input}
          value={currentDate || date || ""}
          {...register}
        />
      </div>

      {error && !date && (
        <p className="text-red-500 text-sm">{error.message}</p>
      )}
    </div>
  );
};
