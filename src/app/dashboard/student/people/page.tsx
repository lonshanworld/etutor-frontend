import FilterBox from "@/components/filterbox/FilterBox";
import SearchBar from "@/components/searchbar/SearchBar";
import TableDemo from "@/components/table/Table";
import { BiFilterAlt } from "react-icons/bi";
import { User, userFromJson, UserRole } from "@/model/user";
import { getStudentsTutors } from "@/api/services/students";
import { AppRouter } from "@/router";

export default async function PeoplePage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: number;
    search?: string;
    filter?: string;
  }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = params.search || "";
  const filter = params.filter || "";
  let userData: User[] = [];
  let pageCount: number = 1;
  try {
    const response = await getStudentsTutors(page, search, filter);
    console.log("students tutors", response);
    userData = response?.users?.map(userFromJson);
    pageCount = response?.meta?.last_page;
  } catch (error) {
    console.error("Failed to fetch staffs:", error);
  }
  return (
    <div className="w-full max-h-full overflow-auto custom-scrollbar sm:px-5 py-5 pb-24 !border-0 !border-transparent">
      <div className="flex flex-wrap gap-x-3 sm:gap-x-8 gap-y-3 max-sm:mx-3">
        <SearchBar placeholder="Search Users" url={AppRouter.studentPeople} />
        <div className="flex items-center w-[200px]">
          <BiFilterAlt className="text-cusGray ms-2 -me-6 z-10" />
          <FilterBox
            placeholder="Filter Users"
            url={AppRouter.studentPeople}
            className="ps-8 w-[200px]"
            selectedValue={filter}
          />
        </div>
      </div>
      <div className="mt-5">
        <TableDemo
          users={userData}
          currentPage={page}
          pageCount={pageCount}
          role={UserRole.student}
        />
      </div>
    </div>
  );
}
