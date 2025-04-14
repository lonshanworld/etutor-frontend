import PageTitle from "@/components/PageTitle";
import CustomTable from "@/components/report/CustomTable";

export default async function ActiveUsersPage({
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
              <PageTitle title="User Visited" isSmallScreen={isSmallScreen}/>
              <CustomTable numpage={page} isSmallScreen={isSmallScreen} />
          </div>
      );
}