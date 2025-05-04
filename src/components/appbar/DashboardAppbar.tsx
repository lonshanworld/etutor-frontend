import ToggleTheme from "../ToggleTheme";
import ProfileImageBox from "../ProfileImageBox";
import LogoBox from "../LogoBox";
import Notification from "../notification/Notification";
import NotiIcon from "../notification/NotiIcon";

export default function DashboardAppbar() {
  return (
    <div className="flex flex-row justify-between items-center">
      <LogoBox />
      <div className="flex flex-row gap-5 items-center">
        <NotiIcon />
        <ToggleTheme />
        <ProfileImageBox />
      </div>
    </div>
  );
}
