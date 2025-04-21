import UnassignPage from "@/components/report/pages/UnassignPage";




export default function Page(
  {
    searchParams,
  } : {
    searchParams?: any
  }
){
    return (
        <UnassignPage isSmallScreen={false} searchParams={searchParams}/> 
    );
}

