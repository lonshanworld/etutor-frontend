import FilterBox from "@/components/filterbox/FilterBox";
import SearchBar from "@/components/searchbar/SearchBar";
import TableDemo from "@/components/table/Table";
import Form from "@/components/form/Form";
import CreateFormButton from "../form/CreateFormButton";
import { BiFilterAlt } from "react-icons/bi";
import { User, userFromJson, UserRole } from "@/model/user";
import { AppRouter } from "@/router";
import { getStudents } from "@/api/services/students";

type Props = {
  id: number;
  name: string;
  email: string;
  activityStatus: string;
};
export default async function UserHomePage({
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

  let studentData: User[] = [];
  let pageCount = 1;

  try {
    const response = await getStudents(page, name);
    studentData = response?.data.map(userFromJson);
    pageCount = response.meta.last_page;
  } catch (error) {
    console.error("Failed to fetch students:", error);
  }

  return (
    <div className="w-full sm:w-[97%] mx-auto min-h-svh">
      <div className="flex flex-wrap gap-x-5 gap-y-3 max-sm:ms-3">
        <SearchBar
          placeholder="Search Students"
          url={AppRouter.staffDashboardStudents}
        />
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
        <TableDemo
          users={studentData}
          currentPage={page}
          pageCount={pageCount}
          role={0}
        />
      </div>

      <div className="mt-5 flex justify-end">
        <CreateFormButton role={UserRole.student} />
      </div>
      <Form />
    </div>
  );
}
