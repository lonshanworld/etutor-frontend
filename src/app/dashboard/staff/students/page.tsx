"use client";

import FilterBox from "@/components/filterbox/FilterBox";
import SearchBar from "@/components/searchbar/SearchBar";
import TableDemo from "@/components/table/Table";
import Form from "@/components/form/Form";
import CreateFormButton from "@/components/form/CreateFormButton";
import { BiFilterAlt } from "react-icons/bi";
import { User, UserRole } from "@/model/user";

const students: User[] = [
  {
    id: 1,
    firstName: "Aung",
    middleName: "Kaung",
    lastName: "Myat",
    email: "akm@gmail.com",
    activityStatus: "Active",
    phoneNo: "123-456-7890",
  },
  {
    id: 2,
    firstName: "Aung",
    middleName: "Kaung",
    lastName: "Myat",
    email: "akm@gmail.com",
    activityStatus: "Active",
    phoneNo: "123-456-7890",
  },
  {
    id: 3,
    firstName: "Aung",
    middleName: "Kaung",
    lastName: "Myat",
    email: "akm@gmail.com",
    activityStatus: "Active",
    phoneNo: "123-456-7890",
  },
  {
    id: 4,
    firstName: "Aung",
    middleName: "Kaung",
    lastName: "Myat",
    activityStatus: "Active 2 days ago",
    phoneNo: "123-456-7890",
    email: "akm@gmail.com",
  },
  {
    id: 5,
    firstName: "Aung",
    middleName: "Kaung",
    lastName: "Myat",
    email: "akm@gmail.com",
    activityStatus: "Active",
    phoneNo: "123-456-7890",
  },
  {
    id: 6,
    firstName: "Aung",
    middleName: "Kaung",
    lastName: "Myat",
    email: "akm@gmail.com",
    activityStatus: "Active",
    phoneNo: "123-456-7890",
  },
  {
    id: 7,
    firstName: "Aung",
    middleName: "Kaung",
    lastName: "Myat",
    email: "akm@gmail.com",
    activityStatus: "Active",
    phoneNo: "123-456-7890",
  },
];

export default function StudentListPage() {
  return (
    <div className="w-full sm:w-[97%] mx-auto min-h-screen">
      <div className="flex flex-wrap gap-x-5 gap-y-3 max-sm:ms-3">
        <SearchBar placeholder="Search Students" />
        <div className="flex items-center w-[200px]">
          <BiFilterAlt className="text-cusGray ms-2 -me-6 z-10" />
          <FilterBox
            placeholder="Filter Users"
            options={["Name", "Email"]}
            className="ps-8 w-[200px]"
          />
        </div>
      </div>
      <div className="mt-5">
        <TableDemo users={students} />
      </div>

      <div className="mt-5 flex justify-end">
        <CreateFormButton role={UserRole.student} />
      </div>
      <Form />
    </div>
  );
}
