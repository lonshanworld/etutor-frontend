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
            "px-5 md:px-8 py-2 md:py-3 md:text-[18px]  cursor-pointer",
            selectedTab === "tutor" ? "bg-theme text-white" : "bg-transparent"
          )}
          onClick={() => {
            router.push(AppRouter.staffAllocateTutor);
          }}
        >
          Tutor
        </div>
        <div
          className={twMerge(
            "px-5 md:px-8 py-2 md:py-3 md:text-[18px] cursor-pointer",
            selectedTab === "student" ? "bg-theme text-white" : "bg-transparent"
          )}
          onClick={() => {
            router.push(AppRouter.staffAllocateStudent);
          }}
        >
          Student
        </div>
      </div>
    </div>
  );
};

export default Tab;
