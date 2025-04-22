import FilterBox from "@/components/filterbox/FilterBox";
import SearchBar from "@/components/searchbar/SearchBar";
import TableDemo from "@/components/table/Table";
import { BiFilterAlt } from "react-icons/bi";
import { User, userFromJson, UserRole } from "@/model/user";
import { getStudents } from "@/api/services/students";
import { AppRouter } from "@/router";

export default async function StudentListPage({
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

  let studentData: User[] = [];
  let pageCount = 1;

  try {
    const response = await getStudents(page, search, filter);
    studentData = response?.data.map(userFromJson);
    pageCount = response.meta.last_page;
  } catch (error) {
    console.error("Failed to fetch students:", error);
  }

  return (
    <div className="w-full sm:w-[95%] mx-auto">
      <div className="flex flex-wrap gap-x-3 sm:gap-x-8 gap-y-3 max-sm:mx-3">
        <SearchBar
          placeholder="Search with name, email"
          url={AppRouter.staffStudents}
        />
        <div className="flex items-center w-[200px]">
          <BiFilterAlt className="text-cusGray ms-2 -me-6 z-10" />
          <FilterBox
            placeholder="Filter Students"
            url={AppRouter.staffStudents}
            className="ps-8 w-[200px]"
            selectedValue={filter}
          />
        </div>
      </div>
      <div className="mt-5">
        <TableDemo
          users={studentData}
          currentPage={page}
          pageCount={pageCount}
          role={UserRole.student}
        />
      </div>
    </div>
  );
}
