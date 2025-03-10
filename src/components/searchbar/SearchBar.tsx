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
}

export default function SearchBar({ placeholder }: Props) {
  const { data, searchData } = useSearchStore();
  const [value, setValue] = useState("");
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchData(value);
  };

  useEffect(() => {
    console.log("data", data);
  }, [data]);
  return (
    <div>
      <form action="" onSubmit={handleSearch}>
        <div className="ms-4 flex items-center">
          <div className="-me-10 z-10">
            <IoIosSearch className="text-2xl text-cusGray" />
          </div>
          <input
            id="searchbar"
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value)
            }
            className={`w-full px-12 py-2.5 border bg-inputBackground border[1px] border-inputBorder border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-md `}
            placeholder={placeholder}
          />
        </div>
      </form>
    </div>
  );
}
