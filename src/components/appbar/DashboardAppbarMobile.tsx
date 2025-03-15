"use client";

import { MdMenuOpen } from "react-icons/md";
import ProfileImageBox from "../ProfileImageBox";

export default function DashboardAppbarMobile({
  onClickMenu,
}: {
  onClickMenu: () => void;
}) {
  return (
    <div className="flex flex-row justify-between items-center w-full bg-background h-10">
      <MdMenuOpen
        onClick={() => onClickMenu()}
        className="text-theme w-10 h-10 active:text-backgroundOpposite cursor-pointer"
      />
      <ProfileImageBox />
    </div>
  );
}
