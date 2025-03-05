"use client";

import Image from "next/image";

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
  return (
    <button
      onClick={() => onClick()}
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
