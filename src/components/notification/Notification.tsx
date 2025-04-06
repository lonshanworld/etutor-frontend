import NotiLight from "@/assets/svgs/notifications/notiLight.svg";
import NotiDark from "@/assets/svgs/noti.svg";
import { useState } from "react";
import NotiList from "./NotiList";

import Welcome from "@/assets/svgs/notifications/welcome.svg";
import LastLogin from "@/assets/svgs/notifications/lastLogin.svg";
import InactiveAlert from "@/assets/svgs/notifications/inactiveAlert.svg";
import Assign from "@/assets/svgs/notifications/assigned.svg";
import { useThemeStore } from "@/stores/useThemeStore";

const Notification = () => {
  const [isNotiOpen, setNotiOpen] = useState(false);
  const { theme } = useThemeStore();

  const openNoti = () => {
    setNotiOpen(!isNotiOpen);
  };
  return (
    <div className="relative">
      <img
        src={theme === "light" ? NotiLight.src : NotiDark.src}
        className="cursor-pointer"
        alt=""
        onClick={openNoti}
      />
      {isNotiOpen && (
        <div className="absolute top-10 left-[-300px] rounded-lg z-20 bg-notiBg border border-gray-200 shadow-lg h-[500px] w-[350px] p-3 overflow-auto custom-scrollbar">
          <NotiList
            title="Hello & Welcome"
            body="Explore you dashboard to get started"
            icon={Welcome}
          />

          <NotiList
            title="Hello & Welcome"
            body="Explore you dashboard to get started"
            icon={LastLogin}
          />

          <NotiList
            title="Hello & Welcome"
            body="Explore you dashboard to get started"
            icon={InactiveAlert}
          />

          <NotiList
            title="Hello & Welcome"
            body="Explore you dashboard to get started"
            icon={Assign}
          />
          <NotiList
            title="Hello & Welcome"
            body="Explore you dashboard to get started"
            icon={Assign}
          />
          <NotiList
            title="Hello & Welcome"
            body="Explore you dashboard to get started"
            icon={Assign}
          />
          <NotiList
            title="Hello & Welcome"
            body="Explore you dashboard to get started"
            icon={Assign}
          />
        </div>
      )}
    </div>
  );
};

export default Notification;
