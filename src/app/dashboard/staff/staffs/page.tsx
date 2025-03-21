import { Button } from "@/components/ui/button";
import FilterBox from "@/components/filterbox/FilterBox";
import SearchBar from "@/components/searchbar/SearchBar";
import TableDemo from "@/components/table/Table";
import Form from "@/components/form/Form";
import CreateFormButton from "@/components/form/CreateFormButton";
import { BiFilterAlt } from "react-icons/bi";
import UserHomePage from "@/components/userhomepage/UserHomePage";
import { User, userFromJson, UserRole } from "@/model/user";
import { getStaffs } from "@/api/services/staffs";
import { AppRouter } from "@/router";

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
  {
    id: 2,
    firstName: "Aung",
    middleName: "Min",
    lastName: "Myat",
    email: "akm@gmail.com",
    phoneNo: "09756042422",
    profileImagePath: "",
    activityStatus: "active",
    role: UserRole.staff,
  },
  {
    id: 3,
    firstName: "Aung",
    middleName: "Kaung",
    lastName: "Myat",
    email: "akm@gmail.com",
    phoneNo: "09756042421",
    profileImagePath: "/assets/images/Profile.png",
    activityStatus: "active",
    role: UserRole.staff,
  },
  {
    id: 4,
    firstName: "Aung",
    middleName: "Kaung",
    lastName: "Myat",
    email: "akm@gmail.com",
    phoneNo: "09756042421",
    profileImagePath: "",
    activityStatus: "active",
    role: UserRole.staff,
  },
  {
    id: 5,
    firstName: "Aung",
    middleName: "Kaung",
    lastName: "Myat",
    email: "akm@gmail.com",
    phoneNo: "09756042421",
    profileImagePath: "",
    activityStatus: "active",
    role: UserRole.staff,
  },
];

export default async function StaffListPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: number;
    name?: string;
  }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const name = params.name || "";

  const response = await getStaffs(page, name);

  const staffData: User[] = response?.data.map(userFromJson);
  const pageCount = response.meta.last_page;

  return (
    <div className="w-full sm:w-[97%] mx-auto min-h-svh">
      <div className="flex flex-wrap gap-x-5 gap-y-3 max-sm:ms-3">
        <SearchBar
          placeholder="Search Staffs"
          url={AppRouter.staffDashboardStaff}
        />
        <div className="flex items-center w-[200px]">
          <BiFilterAlt className="text-cusGray ms-2 -me-6 z-10" />
          <FilterBox
            placeholder="Filter Users"
            options={["Name", "Email"]}
            className="ps-8"
          />
        </div>
      </div>
      <div className="mt-5">
        <TableDemo
          users={staffData}
          currentPage={page}
          pageCount={pageCount}
          role={2}
        />
      </div>

      <div className="mt-5 flex justify-end">
        <CreateFormButton role={UserRole.staff} />
      </div>
      <Form />
    </div>
  );
}
