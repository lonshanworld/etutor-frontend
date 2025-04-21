"use client";
import PageTitle from "@/components/PageTitle";
import CustomMessageTable from "../CustomMessageTable";

export default function MessagePage({
  searchParams,
  isSmallScreen = false,
}: {
  isSmallScreen? :boolean,
  searchParams?: 
  { 
    page?: number,
    search? : string,
    duration? : string,
    type? : string,
  };

}) {
  const params =  searchParams;
  const page = Number(params?.page) || 1;
  const search = params?.search;
  const duration = (params?.duration === '7d' || params?.duration === "28d") ? params?.duration : "";
  const type = (params?.type?.toLowerCase() === "student" || params?.type?.toLowerCase() === "tutor") ? params?.type.toLowerCase() : "";

  console.log("get params", params);

  return (
          <div
          className="w-full h-full px-4">
              <PageTitle title="Message Report" isSmallScreen={isSmallScreen}/>
              <CustomMessageTable numpage={page} search={search} duration={duration} type={type} isSmallScreen={isSmallScreen} />
          </div>
      );
}