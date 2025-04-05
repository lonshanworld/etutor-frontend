"use client";
import { Tabs, useAllocate } from "@/stores/useAllocate";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import { AppRouter } from "@/router";

const Tab = ({ selectedTab }: { selectedTab: string }) => {
  const { tab, setTab } = useAllocate();
  const router = useRouter();
  return (
    <div className="flex">
      <div className="bg-tabBg flex rounded-md overflow-hidden">
        <div
          className={twMerge(
            " px-8 py-3 text-[18px] cursor-pointer",
            selectedTab === "tutor" ? "bg-theme text-white" : "bg-transparent"
          )}
          onClick={() => {
            router.push(AppRouter.staffDashboardAllocateTutor);
          }}
        >
          Tutor
        </div>
        <div
          className={twMerge(
            " px-8 py-3 text-[18px] cursor-pointer",
            selectedTab === "student" ? "bg-theme text-white" : "bg-transparent"
          )}
          onClick={() => {
            router.push(AppRouter.staffDashboardAllocateStudent);
          }}
        >
          Student
        </div>
      </div>
    </div>
  );
};

export default Tab;
