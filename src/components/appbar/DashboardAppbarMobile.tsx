"use client";

import { MdMenuOpen } from "react-icons/md";
import ProfileImageBox from "../ProfileImageBox";
import Notification from "../notification/Notification";
import NotiIcon from "../notification/NotiIcon";

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
      <div className="flex items-center gap-5">
        <NotiIcon />
        <ProfileImageBox />
      </div>
    </div>
  );
}
