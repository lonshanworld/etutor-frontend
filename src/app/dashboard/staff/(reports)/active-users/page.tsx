// "use client";

import PageTitle from "@/components/PageTitle";
import CustomTable from "@/components/report/CustomTable";
// import dynamic from "next/dynamic";

// const CustomTable = dynamic(() => import('@/components/report/CustomTable'), {
//     ssr: false, // Disable server-side rendering
//     loading: () => <p>Loading...</p>
//   });

export default async  function ActiveUsersPage({
  searchParams,
}: {
  searchParams?: Promise<
  { page?: number }>;
}) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;

  return (
          <div
          className="w-full h-full px-4">
              <PageTitle title="User Visited" />
              <CustomTable numpage={1} />
          </div>
      );
}