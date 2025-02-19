
import ToggleTheme from "../ToggleTheme";
import ProfileImageBox from "../ProfileImageBox";
import LogoBox from "../LogoBox";

export default function DashboardAppbar(){
    return (
        <div
        className="flex flex-row justify-between">
            <LogoBox />
            <div
            className="flex flex-row gap-5">
                <ToggleTheme />
                <ProfileImageBox />
            </div>
        </div>
    );
}