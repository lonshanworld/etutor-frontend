"use client";
import { getProfile } from "@/api/services/getProfile";
import { useUserStore } from "@/stores/useUserStore";
import ProfilePopup from "@/components/userProfile/ProfilePopup";
import UserDetail from "@/components/userProfile/UserProfile";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {
    user,
    setUser,
    setShowDetail,
    setProfilePopup,
    profilePopup,
    profileDetailPopup,
  } = useUserStore();

  useEffect(() => {
    async function getUser() {
      const user = await getProfile();
      setUser(user);
      console.log("profile", user);
    }
    getUser();
  }, []);

  return (
    <div className="w-svh h-svh bg-background flex flex-col overflow-clip">
      {profilePopup && <ProfilePopup setProfilePopup={setProfilePopup} />}

      {profilePopup && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setProfilePopup(false)}
        ></div>
      )}
      {profileDetailPopup && (
        <UserDetail user={user} setShowDetail={setShowDetail} />
      )}
      {children}
    </div>
  );
}
