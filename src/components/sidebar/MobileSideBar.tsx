import { twMerge } from "tailwind-merge";
import LogoBox from "../LogoBox";
import ToggleTheme from "../ToggleTheme";
import SideBarContainer from "./SidebarContainer";
import { HiOutlineChevronDoubleLeft } from "react-icons/hi";
import { MdChevronLeft } from "react-icons/md";

export default function MobileSideBar({
  onBackClick,
  style,
}: {
  onBackClick: () => void;
  style: string;
}) {
  return (
    <div
      className={twMerge(
        "fixed h-svh w-60 bg-background  z-20 left-[-300px] transition-300 block top-0 shadow-left",
        style
      )}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="relative mt-5">
          <div
            onClick={() => onBackClick()}
            className="absolute top-4 right-3 w-8 h-8 z-20 "
          >
            <HiOutlineChevronDoubleLeft className="text-backgroundOpposite w-6 h-6 transition-200 hover:text-theme" />
          </div>
          <div className="h-[80px] w-full mt-2 ms-2">
            <LogoBox />
          </div>

          <div className="w-full px-2 py-3">
            <SideBarContainer />
          </div>
        </div>
        <div className="flex justify-center mb-10">
          <ToggleTheme />
        </div>
      </div>
    </div>
  );
}
