"use client";
import { getProfile } from "@/api/services/getProfile";
import LoadingSpinner from "@/components/loadingspinner/LoadingSpinner";
import { deleteTokensInCookie, getTokenCookies } from "@/lib/tokenCookies";
import { ConvexClientProvider } from "@/provider/ConvexClientProvider";
import { AppRouter } from "@/router";
import useLoading from "@/stores/useLoading";
import { useUserStore } from "@/stores/useUserStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useToast } from "@/stores/useToast";
import Toast from "@/components/customtoast/CustomToast";
import {detect} from "detect-browser";
import { visitBrowser, visitPage } from "@/api/services/events";


export default function MainTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { setError } = errorStore();
  const { setUser } = useUserStore();
  const { showLoading, hideLoading } = useLoading();
  const router = useRouter();
  const pathName = usePathname();
  const { toast, showToast } = useToast();
  const browser = detect();
  
  useEffect(() => {
    
    const sendPath = async()=>{
     
      if (pathName){
        console.log("send path event", pathName);
        await visitPage(pathName);
      };
    }

    sendPath();
  }, [pathName]);

  // useEffect(()=>{
  //   const sendEvent = async()=>{
  //     console.log('send browser event', browser?.name);
  //     await visitBrowser(browser?.name ?? "unidentified");
  //   }

  //   sendEvent();
  // },[])

  useEffect(() => {
    const sendEvent = async () => {
      const hasSent = sessionStorage.getItem("hasSentBrowserEvent");
  
      if (!hasSent) {
        console.log("send browser event", browser?.name);
        await visitBrowser(browser?.name ?? "unidentified");
        sessionStorage.setItem("hasSentBrowserEvent", "true");
      }
    };
  
    sendEvent();
  }, []);
  

  useEffect(() => {
    async function getUser() {
      try {
        const { sessionToken, role } = await getTokenCookies();
        // console.log("got token", sessionToken, role);
        if (sessionToken && role) {
          showLoading();
          const user = await getProfile();
          if (!user) {
            throw new Error("User not found");
          }
          setUser(user); // store in global state

          // auto redirect ig
          if (role === "staff" && !pathName.includes("staff")) {
            router.push(pathName);
          } else if (role === "student" && !pathName.includes("student")) {
            router.push(AppRouter.studentDashboard);
          } else if (role === "tutor" && !pathName.includes("tutor")) {
            router.push(AppRouter.tutorDashboard);
          }
        }
        // dont think we need that part since middleware is handling
        // else {
        //   if (
        //     pathName !== AppRouter.introPage &&
        //     pathName !== AppRouter.loginPage
        //   ) {
        //     router.push(AppRouter.loginPage);
        //   }
        // }
      } catch (error) {
        console.log("cookie cannot be used", error);
        deleteTokensInCookie();
        if (
          pathName !== AppRouter.introPage &&
          pathName !== AppRouter.loginPage
        ) {
          showToast("Please login again", "Warning");
          router.push(AppRouter.loginPage);
        }
      } finally {
        hideLoading();
      }
    }
    getUser();
  }, []);
  return (
    <ConvexClientProvider>
      <LoadingSpinner />
      {toast && (
        <Toast
          message={toast?.message}
          type={toast?.type}
        />
      )}

      {children}
    </ConvexClientProvider>
  );
}
