import { getStudents } from "@/api/services/students";
import Tab from "@/components/allocate/Tab";
import AllocateSearchBar from "@/components/searchbar/AllocateSearchBar";
import StudentTable from "@/components/table/allocation/StudentTable";
import { User, userFromJson } from "@/model/user";
import { AppRouter } from "@/router";

export default async function AllocateStudentPage({
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
    <div>
      <div className="ms-[2.5%]">
        <Tab selectedTab="student" />
      </div>
      <div className="search flex justify-end mb-3 px-[4%]">
        <AllocateSearchBar
          placeholder="Search Students"
          url={AppRouter.staffDashboardAllocateStudent}
        />
      </div>
      <div className="w-full sm:w-[95%] mx-auto">
        <StudentTable
          data={studentData}
          pageCount={pageCount}
          currentPage={page}
        />
      </div>
    </div>
  );
}
