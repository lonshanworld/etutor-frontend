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
  className?: string;
}

export default function AllocateSearchBar({
  placeholder,
  url,
  className,
}: Props) {
  const { data, searchData } = useSearchStore();
  const [value, setValue] = useState("");
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchData(value);
    window.location.href = `${url}?name=${value}`;
  };

  useEffect(() => {
    console.log("data", data);
  }, [data]);
  return (
    <div>
      <form action="" onSubmit={handleSearch}>
        <div className="relative flex items-center max-sm:w-full mt-3">
          <input
            id="searchbar"
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value)
            }
            className={`w-full sm:min-w-[250px] px-5 py-2 sm:py-2.5 border-b-[3px] bg-inputBackground border-inputBorder border-theme focus:outline-none  max-sm:text-sm ${className}`}
            placeholder={placeholder}
          />
          <div
            className="absolute top-3 right-3 z-10 cursor-pointer"
            onClick={handleSearch}
          >
            <IoIosSearch className="text-lg sm:text-2xl text-cusGray" />
          </div>
        </div>
      </form>
    </div>
  );
}
