import { Button } from "@/components/ui/button";
import FilterBox from "@/components/filterbox/FilterBox";
import SearchBar from "@/components/searchbar/SearchBar";
import TableDemo from "@/components/table/Table";
import Form from "@/components/form/Form";
import CreateFormButton from "@/components/form/CreateFormButton";
import { BiFilterAlt } from "react-icons/bi";
import { User, userFromJson, UserRole } from "@/model/user";
import { useEffect } from "react";
import { useLoading } from "@/stores/useLoading";
import LoadingSpinner from "@/components/loadingspinner/LoadingSpinner";
import { getTutors } from "@/api/services/tutors";
import { AppRouter } from "@/router";

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

export default async function TutorListPage({
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

  const response = await getTutors(page, name);

  const tutorData: User[] = response?.data.map(userFromJson);
  const pageCount = response.meta.last_page;
  return (
    <div className="w-full sm:w-[97%] mx-auto min-h-screen">
      <div className="flex flex-wrap gap-x-5 gap-y-3 max-sm:ms-3">
        <SearchBar
          placeholder="Search Tutors"
          url={AppRouter.staffDashboardTutors}
        />
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
        <TableDemo
          users={tutorData}
          currentPage={page}
          pageCount={pageCount}
          role={1}
        />
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
