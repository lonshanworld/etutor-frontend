import ActiveUsersPage from "@/components/report/pages/ActiveUserPage";




export default function Page(
  {
    searchParams,
  } : {
    searchParams?: any
  }
){
    return (
        <ActiveUsersPage isSmallScreen={false} searchParams={searchParams}/> 
    );
}

