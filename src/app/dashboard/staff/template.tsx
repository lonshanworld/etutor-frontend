"use client";
import Cookies from "js-cookie";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { UserRole } from "@/model/user";
import { AppRouter } from "@/router";
import DraggableButton from "@/components/DraggableBox";

export default function StaffDashboardTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {
    user,
    viewUser: viewUserfromStore,
    setViewUser,
    setReadOnly,
  } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    const viewUser = Cookies.get("viewUser");
    if (viewUser) {
      setViewUser(JSON.parse(viewUser));
      setReadOnly(true);
    } else {
      setReadOnly(false);
    }
  }, []);
  return (
    <>
      {viewUserfromStore && <DraggableButton />}
      <div className="h-full max-h-svh overflow-y-auto custom-scrollbar pt-8 pb-24 border-t-2 border-secondaryBackground">
        {children}
      </div>
    </>
  );
}
