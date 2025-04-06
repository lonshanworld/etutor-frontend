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
  url: string;
}

export default function SearchBar({ placeholder, url }: Props) {
  const { data, searchData } = useSearchStore();
  const [value, setValue] = useState("");
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchData(value);
    window.location.href = `${url}?name=${value}`;
  };

  return (
    <div>
      <form action="" onSubmit={handleSearch}>
        <div className="flex items-center max-sm:w-full">
          <input
            id="searchbar"
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value)
            }
            className={`w-full sm:min-w-[250px] px-5 py-2 sm:py-2.5 border bg-inputBackground border[1px] border-inputBorder border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 max-sm:text-sm `}
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
