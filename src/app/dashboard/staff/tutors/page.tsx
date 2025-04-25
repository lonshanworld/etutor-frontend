import FilterBox from "@/components/filterbox/FilterBox";
import SearchBar from "@/components/searchbar/SearchBar";
import TableDemo from "@/components/table/Table";
import Form from "@/components/form/Form";
import CreateFormButton from "@/components/form/CreateFormButton";
import { BiFilterAlt } from "react-icons/bi";
import { User, userFromJson, UserRole } from "@/model/user";

import { getTutors } from "@/api/services/tutors";
import { AppRouter } from "@/router";

export default async function TutorListPage({
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

  let tutorData: User[] = [];
  let pageCount = 1;

  try {
    const response = await getTutors(page, search, filter);
    tutorData = response?.data.map(userFromJson);
    pageCount = response.meta.last_page;
  } catch (error) {
    console.error("Failed to fetch tutors:", error);
  }

  return (
    <div className="w-full sm:w-[95%] mx-auto">
      <div className="flex flex-wrap gap-x-3 sm:gap-x-8 gap-y-3 max-sm:mx-3">
        <SearchBar
          placeholder="Search with name, email"
          url={AppRouter.staffTutors}
        />
        <div className="flex items-center w-[200px]">
          <BiFilterAlt className="text-cusGray -me-6 ms-2 z-10" />
          <FilterBox
            placeholder="Filter Tutors"
            url={AppRouter.staffTutors}
            className="ps-8 w-[200px]"
            selectedValue={filter}
          />
        </div>
      </div>
      <div className="mt-5">
        <TableDemo
          users={tutorData}
          currentPage={page}
          pageCount={pageCount}
          role={UserRole.tutor}
        />
      </div>
    </div>
  );
}
