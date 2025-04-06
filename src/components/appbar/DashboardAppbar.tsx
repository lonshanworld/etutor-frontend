import ToggleTheme from "../ToggleTheme";
import ProfileImageBox from "../ProfileImageBox";
import LogoBox from "../LogoBox";
import Notification from "../notification/Notification";

export default function DashboardAppbar() {
  return (
    <div className="flex flex-row justify-between items-center">
      <LogoBox />
      <div className="flex flex-row gap-5 items-center">
        <Notification />
        <ToggleTheme />
        <ProfileImageBox />
      </div>
    </div>
  );
}
