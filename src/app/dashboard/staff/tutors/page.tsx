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
    name?: string;
  }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const name = params.name || "";

  let tutorData: User[] = [];
  let pageCount = 1;

  try {
    const response = await getTutors(page, name);
    console.log("tutors", response.data);
    tutorData = response?.data.map(userFromJson);
    pageCount = response.meta.last_page;
  } catch (error) {
    console.error("Failed to fetch tutors:", error);
  }

  return (
    <div className="w-full sm:w-[95%] mx-auto">
      <div className="flex flex-wrap gap-x-3 sm:gap-x-8 gap-y-3 max-sm:mx-3">
        <SearchBar
          placeholder="Search Tutors"
          url={AppRouter.staffTutors}
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
          role={UserRole.tutor}
        />
      </div>
    </div>
  );
}
