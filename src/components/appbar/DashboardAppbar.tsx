import ToggleTheme from "../ToggleTheme";
import ProfileImageBox from "../ProfileImageBox";
import LogoBox from "../LogoBox";

export default function DashboardAppbar() {
  return (
    <div className="flex flex-row justify-between items-center">
      <LogoBox />
      <div className="flex flex-row gap-5 items-center">
        <ToggleTheme />
        <ProfileImageBox />
      </div>
    </div>
  );
}
