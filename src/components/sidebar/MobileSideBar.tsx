import LogoBox from "../LogoBox";
import ToggleTheme from "../ToggleTheme";
import SideBarContainer from "./SidebarContainer";
import { RiArrowLeftSLine } from "react-icons/ri";

export default function MobileSideBar(
    {
        onBackClick,
    } : {   
        onBackClick : ()=>void;
    }
){
    return (
        <div
            className="fixed h-svh w-40 bg-background z-10 md:hidden block left-0 top-0 shadow-left">
              <div
              onClick={()=>onBackClick()}
              className="fixed top-10 left-36 w-8 h-8 z-20  bg-backgroundOpposite rounded-full shadow-md active:rounded-sm">
                <RiArrowLeftSLine 
                className="text-background w-8 h-8"/>
              </div>
              <LogoBox/>
              <div
              className="w-full px-4 py-4">
                <SideBarContainer />
              </div>
              <div
              className="fixed bottom-10 left-5">
                <ToggleTheme />
              </div>
        </div>
    );
}