import PageTitle from "@/components/PageTitle";
import CustomUnassignTable from "../CustomUnassignedStudents";

export default async function UnassignPage({
  searchParams,
  isSmallScreen = false,
}: {
  isSmallScreen? :boolean,
  searchParams?: Promise<
  { page?: number }>;

}) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;

  return (
          <div
          className="w-full h-full px-4">
              <PageTitle title="Student Assign Status Page" isSmallScreen={isSmallScreen}/>
              <CustomUnassignTable numpage={page} isSmallScreen={isSmallScreen} />
          </div>
      );
}