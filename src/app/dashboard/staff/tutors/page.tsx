import { Button } from "@/components/ui/button";
import FilterBox from "@/components/filterbox/FilterBox";
import SearchBar from "@/components/searchbar/SearchBar";
import TableDemo from "@/components/table/Table";
import Form from "@/components/form/Form";
import CreateFormButton from "@/components/form/CreateFormButton";
import { BiFilterAlt } from "react-icons/bi";
import { UserRole } from "@/model/user";

const tutors = [
  {
    id: 1,
    firstName: "Aung",
    middleName: "Kaung",
    lastName: "Myat",
    email: "akm123@gmail.com",
    activityStatus: "Active",
    phoneNo: "09756042421",
  },
  {
    id: 2,
    firstName: "Aung",
    middleName: "Kaung",
    lastName: "Myat",
    email: "akm@gmail.com",
    activityStatus: "Active",
    phoneNo: "09756042421",
  },
  {
    id: 3,
    firstName: "Aung",
    middleName: "Kaung",
    lastName: "Myat",
    email: "akm@gmail.com",
    activityStatus: "Active",
    phoneNo: "09756042421",
  },
  {
    id: 4,
    firstName: "Aung",
    middleName: "Kaung",
    lastName: "Myat",
    email: "akm@gmail.com",
    activityStatus: "Active 2 days ago",
    phoneNo: "09756042421",
  },
  {
    id: 5,
    firstName: "Aung",
    middleName: "Kaung",
    lastName: "Myat",
    email: "akm@gmail.com",
    activityStatus: "Active",
    phoneNo: "09756042421",
  },
  {
    id: 6,
    firstName: "Aung",
    middleName: "Kaung",
    lastName: "Myat",
    email: "akm@gmail.com",
    activityStatus: "Active",
    phoneNo: "09756042421",
  },
  {
    id: 7,
    firstName: "Aung",
    middleName: "Kaung",
    lastName: "Myat",
    email: "akm@gmail.com",
    activityStatus: "Active",
    phoneNo: "09756042421",
  },
];

export default function TutorListPage() {
  return (
    <div className="w-full sm:w-[97%] mx-auto min-h-screen">
      <div className="flex flex-wrap gap-x-5 gap-y-3 max-sm:ms-3">
        <SearchBar placeholder="Search Tutors" />
        <div className="flex items-center w-[200px]">
          <BiFilterAlt className="text-cusGray -me-6 ms-2 z-10" />
          <FilterBox
            placeholder="Filter Users"
            options={["Name", "Email"]}
            className="ps-8 w-[200px]"
          />
        </div>
      </div>
      <div className="mt-5">
        <TableDemo users={tutors} />
      </div>

      <div>
        <div className="mt-5 flex justify-end">
          <CreateFormButton role={UserRole.tutor} />
        </div>
        <Form />
      </div>
    </div>
  );
}
