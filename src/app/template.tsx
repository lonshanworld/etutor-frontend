"use client";

import { getProfile } from "@/api/services/getProfile";
import LoadingSpinner from "@/components/loadingspinner/LoadingSpinner";
import { getTokenCookies } from "@/lib/tokenCookies";
import { ConvexClientProvider } from "@/provider/ConvexClientProvider";
import { AppRouter } from "@/router";
import useLoading from "@/stores/useLoading";
import { useUserStore } from "@/stores/useUserStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MainTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { setError } = errorStore();
  const {setUser} = useUserStore();
  const {showLoading,hideLoading} = useLoading();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    async function getUser() {
      console.log("get");
      const {sessionToken, role} = await getTokenCookies();
      console.log("got token", sessionToken, role);
      if(sessionToken && role){
        showLoading();
        const user = await getProfile();
        setUser(user);
        console.log("profile", user);
        hideLoading();
        if(role === "staff" && !pathName.includes("staff")){
          router.push(AppRouter.staffDashboard);
        }else if(role === "student" && !pathName.includes("student")){
          router.push(AppRouter.studentDashboard);
        }else if(role === "tutor" && !pathName.includes("tutor")){
          router.push(AppRouter.tutorDashboard);
        }
      }else{
        if(!pathName.includes(AppRouter.loginPage)){
          setTimeout(()=>{
            router.push(AppRouter.loginPage);
          },3000);
        }
      }
    }
    getUser();
  }, []);
  return (
    <ConvexClientProvider>
      <LoadingSpinner />

      
        {
          children
        }
    
      </ConvexClientProvider>
  );
}
