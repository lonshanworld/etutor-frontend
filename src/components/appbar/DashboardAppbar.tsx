import ToggleTheme from "../ToggleTheme";
import ProfileImageBox from "../ProfileImageBox";
import LogoBox from "../LogoBox";

export default function DashboardAppbar() {
  return (
    <div className="flex flex-row justify-between h-[50px] items-center max-w-screen">
      <LogoBox />
      <div className="flex flex-row items-center gap-5">
        <ToggleTheme />
        <ProfileImageBox />
      </div>
    </div>
  );
}
