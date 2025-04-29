import MessagePage from "@/components/report/pages/MessagePage";


export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<
  { 
    page?: number,
    search? : string,
   }

  >;

}) {
  const params = await searchParams;
 
    return (
        <MessagePage isSmallScreen={false} searchParams={params}/> 
    );
}

