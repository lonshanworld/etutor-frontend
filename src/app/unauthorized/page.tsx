"use client";

import { AppRouter } from "@/router";
import { useRouter } from "next/navigation";

export default function UnAuthorizedPage() {
  const router = useRouter();

  return (
    <div className="w-svw h-svh flex flex-col justify-center items-center gap-4">
      <span className="text-2xl font-bold text-font capitalize">
        you are not authenticated to view this page.
      </span>
      <button
        onClick={() => router.replace(AppRouter.loginPage)}
        className="text-lg capitalize text-theme"
      >
        Go to Login Page
      </button>
    </div>
  );
}
