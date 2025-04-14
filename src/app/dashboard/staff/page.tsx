
import { AppRouter } from "@/router";
import ClickMore from "@/components/report/ClickMore";
import ViewedBrowsersPage from "@/components/report/pages/ViewedBrowserPage";
import ActiveUsersPage from "@/components/report/pages/ActiveUserPage";
import ViewedPages from "@/components/report/pages/ViewPagesPage";

export default function StaffMainPage() {

  return <div
  className="w-full h-full relative">
    <div
    className="absolute top-0 left-4 right-4 -bottom-20 flex flex-col gap-3 overflow-x-hidden overflow-y-auto custom-scrollbar" >
      <div
      className="h-fit lg:h-1/2 w-full flex flex-col lg:flex-row gap-3">
        <div
        className="w-full lg:w-1/2 h-full flex flex-col border rounded-md border-theme border-opacity-20">
          <div
          className="w-full h-[95%] sm:h-[90%]">
            <ViewedBrowsersPage isSmallScreen={true} />
          </div>
          <ClickMore routeString={AppRouter.staffBrowsers} />
        </div>
        <div
        className="w-full lg:w-1/2 h-full border rounded-md border-theme border-opacity-20">
          <div
          className="w-full h-[90%]">
            <ActiveUsersPage isSmallScreen={true} />
          </div>
          <ClickMore routeString={AppRouter.staffActiveUsers} />
        </div>
      </div>
      <div
      className="h-[500px] lg:h-1/2 w-full border rounded-md border-theme border-opacity-20">
        <div
        className="w-full md:w-1/2 h-[90%] mx-auto">
          <ViewedPages isSmallScreen={true} />
        </div>
        <ClickMore routeString={AppRouter.staffPages} />
      </div>
    </div>
  </div>;
}
