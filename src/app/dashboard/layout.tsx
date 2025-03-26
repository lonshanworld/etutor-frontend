"use client";
import { useUserStore } from "@/stores/useUserStore";
import ProfilePopup from "@/components/userProfile/ProfilePopup";
import UserDetail from "@/components/userProfile/UserProfile";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {
    user,
    setShowDetail,
    setProfilePopup,
    profilePopup,
    profileDetailPopup,
  } = useUserStore();

  return (
    <div className="w-svw h-svh bg-background flex flex-col overflow-clip">
      {profilePopup && <ProfilePopup setProfilePopup={setProfilePopup} />}

      {profilePopup && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setProfilePopup(false)}
        ></div>
      )}
      {profileDetailPopup && (
        <UserDetail profileData={user} setShowDetail={setShowDetail} />
      )}
      {children}
    </div>
  );
}
