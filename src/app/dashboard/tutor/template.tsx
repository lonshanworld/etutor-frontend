"use client";

import Cookies from "js-cookie";
import { UserRole } from "@/model/user";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
import { AppRouter } from "@/router";
import DraggableButton from "@/components/DraggableBox";

export default function StaffDashboardTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, setViewUser, setReadOnly } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    const viewUser = Cookies.get("viewUser");
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
