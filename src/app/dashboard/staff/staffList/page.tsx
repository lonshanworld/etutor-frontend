import { Button } from "@/components/ui/button";
import FilterBox from "@/components/filterbox/FilterBox";
import SearchBar from "@/components/searchbar/SearchBar";
import TableDemo from "@/components/table/Table";
import Form from "@/components/form/Form";
import CreateFormButton from "@/components/form/CreateFormButton";
import { BiFilterAlt } from "react-icons/bi";
import UserHomePage from "@/components/userhomepage/UserHomePage";
import { UserRole } from "@/model/user";

const staffs = [
  {
    id: 1,
    firstName: "Aung",
    middleName: "Kaung",
    lastName: "Myat",
    email: "akm@gmail.com",
    profileImagePath: "/assets/images/Profile.png",
    phoneNo: "09756042421",
    activityStatus: "active",
    role: UserRole.staff,
  },
  // {
  //   id: 2,
  //   firstName: "Aung",
  //   middleName: "Min",
  //   lastName: "Myat",
  //   email: "akm@gmail.com",
  //   phoneNo: "09756042422",
  //   profileImagePath: "",
  //   activityStatus: "active",
  //   role: UserRole.staff,
  // },
  // {
  //   id: 3,
  //   firstName: "Aung",
  //   middleName: "Kaung",
  //   lastName: "Myat",
  //   email: "akm@gmail.com",
  //   phoneNo: "09756042421",
  //   profileImagePath: "/assets/images/Profile.png",
  //   activityStatus: "active",
  //   role: UserRole.staff,
  // },
  // {
  //   id: 4,
  //   firstName: "Aung",
  //   middleName: "Kaung",
  //   lastName: "Myat",
  //   email: "akm@gmail.com",
  //   phoneNo: "09756042421",
  //   profileImagePath: "",
  //   activityStatus: "active",
  //   role: UserRole.staff,
  // },
  // {
  //   id: 5,
  //   firstName: "Aung",
  //   middleName: "Kaung",
  //   lastName: "Myat",
  //   email: "akm@gmail.com",
  //   phoneNo: "09756042421",
  //   profileImagePath: "",
  //   activityStatus: "active",
  //   role: UserRole.staff,
  // },
];

export default function StaffListPage() {
  return (
    <div className="w-[97%] mx-auto">
      <div className="flex gap-5">
        <SearchBar placeholder="Search Staffs" />
        <div className="flex items-center w-[200px]">
          <BiFilterAlt className="-me-6 z-10" />
          <FilterBox
            placeholder="Filter Users"
            options={["Name", "Email"]}
            className="ps-8"
          />
        </div>
      </div>
      <div className="mt-5">
        <TableDemo users={staffs} />
      </div>

      <div>
        <div className="float-end mt-5">
          <CreateFormButton role={UserRole.staff} />
        </div>
        <Form />
      </div>
    </div>
  );
}
