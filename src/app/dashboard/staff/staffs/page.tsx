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
  let staffData: User[] = [];
  let pageCount: number = 1;
  try {
    const response = await getStaffs(page, name);
    staffData = response?.data.map(userFromJson);
    pageCount = response.meta.last_page;
    console.log("staff data", staffData);
  } catch (error) {
    console.error("Failed to fetch staffs:", error);
  }

  return (
    <div className="w-full sm:w-[95%] mx-auto">
      <div className="flex flex-wrap gap-x-3 sm:gap-x-8 gap-y-3 max-sm:mx-3">
        <SearchBar
          placeholder="Search Staffs"
          url={AppRouter.staffDashboardStaff}
        />
        <div className="flex items-center sm:w-[200px]">
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
          role={UserRole.staff}
        />
      </div>

      <div className="mt-5 flex justify-end">
        <CreateFormButton role={UserRole.staff} />
      </div>
      <Form />
    </div>
  );
}
