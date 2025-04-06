import { getTutors } from "@/api/services/tutors";
import Tab from "@/components/allocate/Tab";
import AllocateSearchBar from "@/components/searchbar/AllocateSearchBar";
import TutorTable from "@/components/table/allocation/TutorTable";
import { User, userFromJson } from "@/model/user";
import { AppRouter } from "@/router";

export default async function AllocateTutorPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: number; name?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const name = params.name || "";

  let tutorData: User[] = [];
  let pageCount = 1;

  try {
    const response = await getTutors(page, name);
    tutorData = response?.data.map(userFromJson);
    pageCount = response.meta.last_page;
  } catch (error) {
    console.error("Failed to fetch tutors:", error);
  }
  return (
    <div>
      <div className="ms-[2.5%]">
        <Tab selectedTab="tutor" />
      </div>
      <div className="search flex justify-end mb-3 px-[4%]">
        <AllocateSearchBar
          placeholder="Search Tutors"
          url={AppRouter.staffDashboardAllocateTutor}
        />
      </div>
      <div className="w-full sm:w-[95%] mx-auto">
        <TutorTable data={tutorData} pageCount={pageCount} currentPage={page} />
      </div>
    </div>
  );
}
