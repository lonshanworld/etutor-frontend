"use client";
import { useSearchStore } from "@/stores/useSearchStore";
import InputField from "../inputfields/InputField";
import { IoIosSearch } from "react-icons/io";
import {
  ChangeEvent,
  FormEvent,
  ReactEventHandler,
  useEffect,
  useState,
} from "react";
interface Props {
  placeholder: string;
  className?: string;
  setSearchData?: any;
  handleSearch?: any;
}

export default function PopupSearchBar({
  placeholder,
  className,
  setSearchData,
  handleSearch,
}: Props) {
  const search = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log("search data", e.target.value);
    setSearchData(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center max-sm:w-full">
          <input
            id="searchbar"
            type="text"
            onChange={search}
            className={`w-full sm:min-w-[250px] px-5 py-2 sm:py-2.5 border-b-[3px] bg-inputBackground border-inputBorder border-theme focus:outline-none  max-sm:text-sm ${className}`}
            placeholder={placeholder}
          />
          <div className="-ms-10 z-10 cursor-pointer" onClick={handleSearch}>
            <IoIosSearch className="text-lg sm:text-2xl text-cusGray" />
          </div>
        </div>
      </form>
    </div>
  );
}
