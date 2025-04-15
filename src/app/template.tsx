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
          showToast("Please login again", "warning");
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
