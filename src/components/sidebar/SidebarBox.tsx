"use client";

import { AppRouter } from "@/router";
import { useFormStore } from "@/stores/useFormStore";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function SideBarBox({
  icon,
  selectedIcon,
  label,
  isSelected,
  onClick,
}: {
  icon: any;
  selectedIcon: any;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  const { resetFormData } = useFormStore();
  const pathName = usePathname();

  const handleOnClick = () => {
    onClick();
    if (pathName.includes(AppRouter.staffDashboard)) {
      resetFormData();
    }
  };
  return (
    <button
      onClick={handleOnClick}
      className={`rounded-lg ${
        isSelected
          ? "bg-secondaryBackground text-theme"
          : "text-cusGray hover:bg-secondaryBackground"
      } flex flex-row gap-3 justify-start items-center w-full h-min py-2 px-6 transition-300`}
    >
      <Image
        src={isSelected ? selectedIcon : icon}
        width={22}
        height={22}
        alt="Icon"
      />
      <span className="text-lg font-bold">{label}</span>
    </button>
  );
}
