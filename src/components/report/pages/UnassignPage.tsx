import PageTitle from "@/components/PageTitle";
import CustomUnassignTable from "../CustomUnassignedStudents";

export default async function UnassignPage({
  searchParams,
  isSmallScreen = false,
}: {
  isSmallScreen? :boolean,
  searchParams?: Promise<
  { page?: number,
    search? : string,
    type? : string,
   }>;

}) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const search = params?.search;
  const type = (params?.type?.toLowerCase() === "unassign" ) ? params?.type.toLowerCase() : "";

  return (
          <div
          className="w-full h-full px-4">
              <PageTitle title="Students" isSmallScreen={isSmallScreen}/>
              <CustomUnassignTable search={search} type={type} numpage={page} isSmallScreen={isSmallScreen} />
          </div>
      );
}