"use client";

import DraggableButton from "@/components/DraggableBox";
import { UserRole } from "@/model/user";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { AppRouter } from "@/router";

export default function StaffDashboardTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, setViewUser, setReadOnly } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    const viewUser = Cookies.get("viewUser");
    console.log("view User", viewUser);
    if (viewUser) {
      setViewUser(JSON.parse(viewUser));
      setReadOnly(true);
    } else {
      setReadOnly(false);
    }

    if (user?.role === UserRole.staff && !viewUser) {
      router.push(AppRouter.staffDashboard);
    }
  }, []);

  return (
    <>
      {user?.role === UserRole.staff && <DraggableButton />}
      {children}
    </>
  );
}
